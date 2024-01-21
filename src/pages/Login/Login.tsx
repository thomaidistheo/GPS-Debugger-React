import React, { useState } from 'react';
import { auth } from '../../firebase'; // Adjust the path to your firebase instance
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signInWithEmail = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((_userCredential) => {
                console.log('login success');
            })
            .catch((error) => {
                console.log('login error: ', error);
            });
    };

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((_result) => {
                // Handle successful login
            })
            .catch((error) => {
                // Handle errors
            });
    };

    return (
        <div>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button onClick={signInWithEmail}>Login</button>
            <button onClick={signInWithGoogle}>Login with Google</button>
        </div>
    );
};
export default Login;
