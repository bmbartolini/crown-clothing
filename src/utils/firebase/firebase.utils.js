import { initializeApp} from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider} 
  from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  setIndexConfiguration
} from "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyCKmzNY25wHUGzRAHKz_-zHJercDEddwG8",
    authDomain: "crwn-clothing-db-e82c2.firebaseapp.com",
    projectId: "crwn-clothing-db-e82c2",
    storageBucket: "crwn-clothing-db-e82c2.appspot.com",
    messagingSenderId: "1094258198173",
    appId: "1:1094258198173:web:6c69abf11d3b08ec657674"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
    prompt: "select_account"
  })

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)

  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async(userAuth, additionalInformation = {}) => {
    if(!userAuth) return;
    const userDocRef = doc(db, "users", userAuth.uid);
    console.log(userDocRef);
  
    const userSnapShot = await getDoc(userDocRef);
    console.log(userSnapShot);

    console.log(userSnapShot.exists())

    if(!userSnapShot.exists()){
      const {displayName, email} = userAuth;
      const createdAt = new Date();
    
      try {
        await setDoc(userDocRef, {displayName, email, createdAt, ...additionalInformation});

      }catch(error){
        if(error.code === "auth/email-already-in-use"){
          alert("cannot create user, email in use")
        } else{
          console.log("error created the user", error.message);
        }
    
      }
    
      return userDocRef;
    }
    
    //if user data does not exits
    //create set document with data from userAuth in collection

    //if user date exists-
    //create set document with data from userAuth in collection

    }
    
  

  
  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)
  }

