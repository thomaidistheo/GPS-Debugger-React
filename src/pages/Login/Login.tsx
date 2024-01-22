import React, { useState } from 'react';
import { auth, db } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const signUp = async (email: string, password: string) => {
        try {
          // Create the user with email and password
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
    
          // Create a user document in Firestore
          await setDoc(doc(db, 'users', user.uid), {
            email: email,
            // You can add more user info here if needed
          });
    
          console.log('User created with email:', email);
          // Additional logic after successful sign up (e.g., redirecting the user)
        } catch (error: unknown) {
            if (error instanceof FirebaseError) {
                setError(error.message)
                console.error('Error signing up:', error);
            }

          console.error('Error signing up:', error.message);
        }
      };

    const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        signUp(email, password);
      };

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
            .then(async (result) => {
                const user = result.user
                const userDocRef = doc(db, 'users', user.uid)
                const userDocSnapshot = await getDoc(userDocRef)

                if(!userDocSnapshot.exists()) {
                    await setDoc(userDocRef, {
                        email: user.email,
                        name: user.displayName,
                    })
                    console.log('New user document created')
                } else {
                    console.log('Existing user logged in')
                }
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

            <form onSubmit={handleSignUp}>
            <div>
                <label>Email</label>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </div>
            <div>
                <label>Password</label>
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </div>
            <button type="submit">Sign Up</button>
            {error && <p>{error}</p>}
            </form>
        </div>
    );
};
export default Login;
