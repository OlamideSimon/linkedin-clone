import React, { useState } from 'react'
import './Login.css'
import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import { loginAction,  } from './features/userSlice'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const dispatch = useDispatch();

    const register = () => {
        if(!name) {
           return alert('Please enter full name');
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                updateProfile(auth.currentUser,{
                    displayName: name,
                    photoURL: profilePic
                })
                .then(() => {
                    dispatch(loginAction({
                        email: userCredential.user.email,
                        userId: userCredential.user.uid,
                        displayName: name,
                        photoUrl: profilePic
                    }))
                }).catch(err => alert(err.message))
            }).catch(err => alert(err.message))
    }

    const loginToApp = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userAuth) => {
            dispatch(loginAction({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: userAuth.user.displayName,
                photoUrl: userAuth.user.photoURL,
            }))
        })
        .catch(err => alert(err.message))
    }

    return (
        <div className='login'>
            <img 
                src='https://news.hitb.org/sites/default/files/styles/large/public/field/image/500px-LinkedIn_Logo.svg__1.png?itok=q_lR0Vks' 
                alt='' 
            />

            <form>
                <input 
                    type='text' 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder='Full Name(Required if Registering)'
                />

                <input
                    value={profilePic}
                    onChange={e => setProfilePic(e.target.value)}
                    placeholder='Profile pic URL(optional)' 
                    type='text' 
                />

                <input 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder='Email' 
                    type='email' 
                />

                <input 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder='Password' 
                    type='password' 
                />

                <button type='submit' onClick={loginToApp}>Sign In</button>
            </form>

            <p>
                Not a member? {" "}
                <span className='login__register' onClick={register}>Register Now</span>
            </p>
        </div>
    )
}

export default Login;
