import React from 'react';
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { FirebaseError } from 'firebase/app'

const SignOut: React.FC = () => {
    const handleSignOut = async () => {
        try {
            await signOut(auth)
            console.log('User signed out successfully')
            // Additional logic after successful sign out (e.g., redirecting the user)
        } catch (error: unknown) {
            // Check if the error is an instance of FirebaseError
            if (error instanceof FirebaseError) {
                console.error('Error signing out:', error.message)
            } else {
                // Handle non-Firebase errors
                console.error('An unknown error occurred')
            }
        }
    }

    return (
        <button onClick={handleSignOut}>Sign Out</button>
    )
}

export default SignOut;
