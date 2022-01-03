// domain.com/new-meetup
import { useRouter } from 'next/router'
import NewMeetUpForm from '../../components/meetups/NewMeetupForm'
import Head from 'next/head'

function NewMeetupPage(){
    const router = useRouter()
    async function addMeetupHandler(meetup){
        const response = await fetch('/api/create-meetup',{
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(meetup)
        })
        const data = await response.json()
        console.log(data)
        router.push('/')
    }
    return (
        <>
        <Head>
            <title>New Meetup</title>
            <meta name='description' content='Add your meetup here'/>
        </Head>
        <NewMeetUpForm onAddMeetup={addMeetupHandler} />
        </>
    )
}


export default NewMeetupPage