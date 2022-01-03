import { MongoClient, ObjectId } from 'mongodb'
import Head from 'next/head'
import MeetupDetails from '../../components/meetups/MeetupDetails'

function MeetupDetailsPage(props) {
    return (
        <>
            <Head>
                <title>{props.title}</title>
                <meta name="description" content={props.description} />
            </Head>
            <MeetupDetails
                title={props.title}
                image={props.image}
                address={props.address}
                description={props.description}
            />
        </>
    )
}

export async function getStaticPaths() {
    const client = await MongoClient.connect('mongodb+srv://riyaz:7dtLNfrjFON2hk0x@cluster0.j9vpm.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db()
    const meetupCollection = db.collection('meetups')
    const meetups = await meetupCollection.find().toArray()
    const paths = meetups.map(meetup => ({
        params: {
            meetupId: meetup._id.toString()
        }
    }))
    return {
        fallback: 'blocking',
        paths
    }
}

export async function getStaticProps(context) {
    const _id = context.params.meetupId
    const client = await MongoClient.connect('mongodb+srv://riyaz:7dtLNfrjFON2hk0x@cluster0.j9vpm.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db()
    const meetupCollection = db.collection('meetups')
    const meetup = await meetupCollection.findOne({ _id: ObjectId(_id) })
    delete meetup._id;
    client.close()
    return {
        props: {
            ...meetup
        }
    }
}

export default MeetupDetailsPage