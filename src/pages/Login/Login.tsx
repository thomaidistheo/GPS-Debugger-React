import React, { useState } from 'react';
import { auth, db } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import styles from './Login.module.scss';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [form, setForm] = useState('login');
    

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

                if (!userDocSnapshot.exists()) {
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

        <div className={styles.loginPage}>
            <>
                {form == 'login'
                    ? (
                        <div className={styles.loginFormCont}>
                            <img className={styles.logo} src="https://kentall-tech.com/static/media/laptop.5a84027a.png" alt="" />
                            <div className={styles.loginForm}>
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
                                <button className={styles.googleLogin} onClick={signInWithGoogle}>Login with Google</button>
                                <div className={styles.formTypePrompt}>
                                    <p>Don't have an account? <button onClick={()=>setForm('singup')}className={styles.signUpPromptBtn}>Sign Up</button></p>
                                </div>
                            </div>
                            {error && <p>{error}</p>}
                        </div>
                    ) : (
                        <div className={styles.signupFormCont}>
                            <img className={styles.logo} src="https://kentall-tech.com/static/media/laptop.5a84027a.png" alt="" />
                            <form className={styles.signupForm} onSubmit={handleSignUp}>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email"
                                        required
                                    />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                        required
                                    />
                                <button type="submit">Sign Up</button>
                                <button className={styles.googleLogin} onClick={signInWithGoogle}>Sign up with Google</button>
                                <div className={styles.formTypePrompt}>
                                    <p>Already have an account? <button onClick={()=>setForm('login')}className={styles.signUpPromptBtn}>Login</button></p>
                                </div>
                                {error && <p>{error}</p>}
                            </form>
                        </div>
                    )
                }
            </>

            
        </div>
    );
};
export default Login;
