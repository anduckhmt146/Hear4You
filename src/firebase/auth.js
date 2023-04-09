import
    {
        createUserWithEmailAndPassword,
        onAuthStateChanged,
        signInWithEmailAndPassword,
        signOut,
    } from 'firebase/auth'
import { useContext } from 'react'
import Context from '../context/Context'
import { auth } from './config'
import { getUserData } from './firestore'

export const signup = async (payload) => {
    userCredential = await createUserWithEmailAndPassword(
        auth,
        payload.email,
        payload.password
    )
}

export const signin = async (payload) => {
    try {
        userCredential = await signInWithEmailAndPassword(
            auth,
            payload.email,
            payload.password
        )
        return await getUserData(userCredential.user.uid)
    } catch (error) {
        return null
    }
}

export const logout = async () => {
    await signOut(auth)
}

export const checkAuth = (setLogin, ctx) => {
    return onAuthStateChanged(auth, async (user) => {
        if (user) {
            const res = await getUserData(user.uid)
            ctx.setName(res.name)
            ctx.setRole(res.role)
            ctx.setUid(res.userID)
            setLogin(true)
        } else {
            setLogin(false)
        }
    })
}
