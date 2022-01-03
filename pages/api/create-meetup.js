import {MongoClient} from 'mongodb'

async function createMeetup(req, res) {
    if (req.method === 'POST') {
        const client = await MongoClient.connect('mongodb+srv://riyaz:7dtLNfrjFON2hk0x@cluster0.j9vpm.mongodb.net/meetups?retryWrites=true&w=majority')
        const db = client.db()
        const meetupCollection = db.collection('meetups')
        const meetups = await meetupCollection.insertOne(req.body)
        console.log(meetups)
        client.close()
        res.json({ message: "Meetup created successfully" })
    }
}

export default createMeetup