//domain.com/
import { MongoClient } from 'mongodb'
import MeetupList from '../components/meetups/MeetupList'
import Head from 'next/head'

const HomePage = props => {
    return (
        <>
            <Head>
                <title>Meetups</title>
                <meta name="description"
                    content='Browse huge list of highly active meetups'
                />
            </Head>
            <MeetupList meetups={props.meetups} />
        </>
    )
}
// export async function getServerSideProps(context) {
//     console.log(context)
//     return {
//         props: {
//             meetups: DUMMY_MEETUP
//         }
//     }
// }

export async function getStaticProps() {
    const client = await MongoClient.connect('mongodb+srv://riyaz:7dtLNfrjFON2hk0x@cluster0.j9vpm.mongodb.net/meetups?retryWrites=true&w=majority')
    const db = client.db()
    const meetupCollection = db.collection('meetups')
    const meetups = await meetupCollection.find().toArray()
    client.close()
    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
            }))
        },
        revalidate: 1
    }
}

export default HomePage