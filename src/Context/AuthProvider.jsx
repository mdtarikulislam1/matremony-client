import React, { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import { auth } from '../Authentication/Firebase/firebase.init'

const googleProvider = new GoogleAuthProvider()

export default function AuthProvider({children}) {
    
const [user,setUser]=useState(null)
const [loading,setLoading]=useState(true)

const createUser=(email,password)=>{
setLoading(true)
return createUserWithEmailAndPassword(auth,email,password)
}

const SignInUser =(email,password)=>{
setLoading(true)    
return signInWithEmailAndPassword(auth,email,password)
}
const logOut=()=>{
    setLoading(true)
    return signOut(auth)
}

const signInWithGoogle=()=>{
    setLoading(true)
    return signInWithPopup(auth,googleProvider)
}
useEffect(()=>{
    const unSubcribe=onAuthStateChanged(auth,currentUser=>{
        setUser(currentUser)
        setLoading(false)
    })

    return()=>{
    unSubcribe()
    }

},[])

const authInfo ={
createUser,
SignInUser,
user,
loading,
logOut,
signInWithGoogle
}

  return (
   <AuthContext value={authInfo}>
  {children}
   </AuthContext>
  )
}
