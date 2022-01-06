import React, { useEffect, useState } from 'react'
import CreateIcon from '@mui/icons-material/Create'
import PhotoIcon from '@mui/icons-material/Photo'
import SubscriptionsIcon from '@mui/icons-material/Subscriptions'
import EventNoteIcon from '@mui/icons-material/EventNote'
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay'
import './Feed.css'
import InputOption from './InputOption';
import Post from './Post';
import { db } from './firebase';
import { collection, onSnapshot, addDoc, query, serverTimestamp, orderBy } from 'firebase/firestore'
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import FlipMove from 'react-flip-move'

function Feed() {
    const [input, setInput] = useState('');
    const [posts, setPosts] = useState([]);
    const user = useSelector(selectUser);

    useEffect(() => {
        onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), (snapshot) => {
            setPosts(snapshot.docs.map(doc => (
                {
                    id: doc.id,
                    data: doc.data()
                }
                // console.log(doc.data)
            )))
        })
    }, [db])

    const sendPost = (e) => {
        e.preventDefault();

        addDoc(collection(db, 'posts'), {
            name: user.displayName,
            description: user.email,
            message: input,
            photoUrl: user.photoUrl || '',
            timestamp: serverTimestamp(),
        });
        setInput('');
    }

    return (
        <div>
            <div className='feed'>
                <div className='feed__inputContainer'>
                    <div className='feed__input'>
                        <CreateIcon />
                        <form>
                            <input value={input} onChange={e => setInput(e.target.value)} type='text' placeholder='Start a post' />
                            <button onClick={sendPost} type='submit'>Send</button>
                        </form>
                    </div>
                    <div className='feed__inputOptions'>
                        <InputOption Icon={PhotoIcon} title='Photo' color='#70b5f9' />
                        <InputOption Icon={SubscriptionsIcon} title='Video' color='#e7a33e' />
                        <InputOption Icon={EventNoteIcon} title='Event' color='#c0cbcd' />
                        <InputOption Icon={CalendarViewDayIcon} title='Write Article' color='#7fc15e' />
                    </div>
                </div>

                {/* Posts */}
                <FlipMove>
                    {posts.map(({id, data: {name, description, message, photoUrl}}) => (
                        <Post
                            key={id}
                            name={name}
                            description={description}
                            message={message}
                            photoUrl={photoUrl}
                        />
                        // console.log(name)
                    ))}
                </FlipMove>

            </div>
        </div>
    )
}

export default Feed
