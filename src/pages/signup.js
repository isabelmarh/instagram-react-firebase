import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from './../constants/routes';
import FirebaseContext from '../context/firebase';
import { doesUsernameExists } from '../services/firebase';

export default function SignUp() {
    const { firebase } = useContext(FirebaseContext);

    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const isInvalid = username === '' || fullName === '' || password === '' || emailAddress === '';

    const handleSignUp = async (event) => {
        event.preventDefault();

        const usernameExists = await doesUsernameExists(username);
        if (!usernameExists.length) {
            try {
                const createUserResult = await firebase.auth().createUserWithEmailAndPassword(emailAddress, password);

                await createUserResult.user.updateProfile({
                    displayName: username
                });

                await firebase.firestore().collection('users').add({
                    userId: createUserResult.user.uid,
                    username: username.toLowerCase(),
                    fullName,
                    emailAddress: emailAddress.toLowerCase,
                    following: [],
                    followers: [],
                    dateCreated: Date.now()
                });

            } catch (error) {
                setFullName('');
                setError(error.message);
            }
        } else {
            setFullName('');
            setUsername('');
            setEmailAddress('');
            setPassword('');
            setError('That username already exists, please try again');
        }
    };

    useEffect(() => {
        document.title = 'Sign-Up - Instagram';
    }, []);

    return (
        <div className="container flex mx-auto max-w-xs items-center h-screen">
            <div className="flex flex-col">
                <div className="flex flex-col items-center bg-white p-4 border mb-4">
                    <h1 className="flex justify-center w-full">
                        <img src="/images/logo.png" alt="Instagram logo" className="mt-2 w-6/12 mb-4" />
                    </h1>
                    {error && <p className="mb-4 text-xs text-red-500 text-center">{error}</p>}
                    <form onSubmit={handleSignUp} method="POST">
                        <input
                            aria-label="Enter your username"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={({ target }) => setUsername(target.value.toLowerCase())}
                            className="text-sm-gray w-full mr-3 py-5 px-4 h-2 border bg-gray-background rounded mb-2" />
                        <input
                            aria-label="Enter your full name"
                            type="text"
                            placeholder="Full name"
                            value={fullName}
                            onChange={({ target }) => setFullName(target.value)}
                            className="text-sm-gray w-full mr-3 py-5 px-4 h-2 border bg-gray-background rounded mb-2" />
                        <input
                            aria-label="Enter your email address"
                            type="text"
                            placeholder="Email address"
                            value={emailAddress}
                            onChange={({ target }) => setEmailAddress(target.value.toLowerCase())}
                            className="text-sm-gray w-full mr-3 py-5 px-4 h-2 border bg-gray-background rounded mb-2" />
                        <input
                            aria-label="Enter your password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                            className="text-sm-gray w-full mr-3 py-5 px-4 h-2 border bg-gray-background rounded mb-2" />
                        <button
                            disable={isInvalid}
                            type="submit" className={`bg-blue-500 text-white w-full rounded h-8 font bold ${isInvalid && 'cursor-not-allowed opacity-50'}`}>
                            Sign Up
                        </button>
                    </form>
                </div>
                <div>
                    <p className="text-sm">
                        Have an account?{` `}
                        <Link to={ROUTES.LOGIN} className="font-bold text-blue">
                            Login
                     </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}