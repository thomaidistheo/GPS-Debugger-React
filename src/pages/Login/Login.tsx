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
                console.log('userCredential: ', _userCredential)
            })
            .catch((error) => {
                console.log('login error: ', error);
            });
    };

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((_result) => {
                console.log('result: ', _result)
            })
            .catch((error) => {
                console.log('error: ', error)
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
