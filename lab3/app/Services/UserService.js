import {signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';
import {doc, getDoc, setDoc, collection, query, where, getDocs} from 'firebase/firestore';
import { auth, firestore } from './init';
import { useState, useEffect } from 'react';

const provider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    return user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData?.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.error('Błąd logowania Google:', errorMessage);
    throw error;
  }
};

export const loginWithUsernamePassword = async (username, password) => {
  try {
    const usernameRef = doc(firestore, 'usernames', username);
    const usernameSnap = await getDoc(usernameRef);

    if (!usernameSnap.exists()) {
      throw new Error('Username not found');
    }

    const { email } = usernameSnap.data();

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (!user.displayName || user.displayName !== username) {
      await updateProfile(user, { displayName: username });
    }

    return user;
  } catch (error) {
    console.error('Błąd nazwy użytkownika:', error.message);
    throw error;
  }
};

import { updateProfile } from 'firebase/auth';

export const registerUserWithUsername = async (username, email, password) => {
  try {
    const usernameRef = doc(firestore, 'usernames', username);
    const existing = await getDoc(usernameRef);

    if (existing.exists()) {
      throw new Error('Użytkownik o takiej nazwie już istnieje');
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, { displayName: username });

    await setDoc(usernameRef, {
      uid: user.uid,
      email: user.email
    });

    return user;
  } catch (error) {
    console.error('Błąd rejestracji:', error.message);
    throw error;
  }
};


export const useUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        let displayName = firebaseUser.displayName;
        if (!displayName) {
          const q = query(collection(firestore, 'usernames'), where('email', '==', firebaseUser.email));
          const snap = await getDocs(q);
          if (!snap.empty) {
            displayName = snap.docs[0].id;
          } else {
            displayName = firebaseUser.email;
          }
        }
        setUser({ ...firebaseUser, displayName });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return { user };
};
