// TODO: firestore helper functions
// @ts-check

import { collection, doc, getDoc, getDocs, limit, orderBy, query, setDoc, where } from "firebase/firestore";
import * as Crypto from 'expo-crypto';
import { firestore } from './config';

// Users

export const getUserData = async (uid) => {
    const docSnap = await getDoc(doc(firestore, "users", uid))
    if (docSnap.exists())
        return docSnap.data()
    else
        return null
}

export const addNewUser = async (payload) => {
    await setDoc(doc(firestore, "users", payload.uid), {
        name: payload.name,
        favoritePodcast: [],
        role: payload.role
    })
}

// Podcast

export const getPodcastByUser = async (uid) => {
    const q = query(collection(firestore, "podcasts"), where("ownerID", "==", uid))
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs[0].data();
}

export const getPodcastData = async (pid) => {
    const docSnap = await getDoc(doc(firestore, "podcasts", pid))
    if (docSnap.exists())
        return docSnap.data()
    else
        return null
}

export const getAllPodcast = async () => {
    const q = query(collection(firestore, "podcasts"))
    const querySnapshot = await getDocs(q);
    const listPodcasts = []
    querySnapshot.forEach((doc) => {
        listPodcasts.push(doc.data())
    })
    return listPodcasts
}

// Episodes

export const getEpisodeData = async (eid) => {
    const docSnap = await getDoc(doc(firestore, "episodes", eid))
    if (docSnap.exists())
        return docSnap.data()
    else
        return null
}

export const getNewestEpisode = async () => {
    const q = query(collection(firestore, "episodes"), orderBy("createdAt", "desc"), limit(10))
    const querySnapshot = await getDocs(q)
    const listEpisodes = []
    querySnapshot.forEach((doc) => {
        listEpisodes.push(doc.data())
    })
    return listEpisodes
}

export const getTrendingEpisode = async () => {
    const q = query(collection(firestore, "episodes"), orderBy("view"), limit(10))
    const querySnapshot = await getDocs(q)
    const listEpisodes = []
    querySnapshot.forEach((doc) => {
        listEpisodes.push(doc.data())
    })
    return listEpisodes
}

export const getEpisodeByTopic = async (topic) => {
    const q = query(collection(firestore, "episodes"), where("topic", "==", topic), limit(10))
    const querySnapshot = await getDocs(q)
    const listEpisodes = []
    querySnapshot.forEach((doc) => {
        listEpisodes.push(doc.data())
    })
    return listEpisodes
}

export const addNewEpisode = async (payload) => {
    await setDoc(doc(firestore, "episodes", payload.episodeID), {
        episodeID: payload.episodeID,
        title: payload.title,
        description: payload.description,
        view: 0,
        topic: payload.topic,
        podcastID: payload.podcastID,
        podcastName: payload.podcastName,
        createdAt: new Date(),
        questionsID: [],
        advertiseID: null
    })
}

// Advertises

export const getAdvertise = async (aid) => {
    const docSnap = await getDoc(doc(firestore, "advertises", aid))
    if (docSnap.exists())
        return docSnap.data()
    else
        return null
}

export const addNewAdvertise = async (payload) => {
    const adsID = Crypto.randomUUID()
    await setDoc(doc(firestore, "advertises", adsID), {
        advertiseID: adsID,
        title: payload.title,
        company: payload.company,
        url: payload.url
    })
}

// Questions

export const getQuestion = async (qid) => {
    const docSnap = await getDoc(doc(firestore, "questions", qid))
    if (docSnap.exists())
        return docSnap.data()
    else
        return null
}

export const getQuestionByUserID = async (uid) => {
    const q = query(collection(firestore, "questions"), where("userID", "==", uid), limit(10))
    const querySnapshot = await getDocs(q)
    const listEpisodes = []
    querySnapshot.forEach((doc) => {
        listEpisodes.push(doc.data())
    })
    return listEpisodes
}

export const getQuestionByPodcastID = async (uid) => {
    const qq = query(collection(firestore, "podcasts"), where("ownerID", "==", uid))
    const querySnapshott = await getDocs(qq)
    const abc = []
    querySnapshott.forEach((doc) => {
        abc.push(doc.data())
    })

    const q = query(collection(firestore, "questions"), where("podcastID", "==", abc[0].podcastID), limit(10))
    const querySnapshot = await getDocs(q)
    const listEpisodes = []
    querySnapshot.forEach((doc) => {
        listEpisodes.push(doc.data())
    })
    return listEpisodes
}

export const addNewQuestion = async (payload) => {
    const quesID = Crypto.randomUUID()
    await setDoc(doc(firestore, "questions", quesID), {
        userID: payload.userID,
        questionID: quesID,
        description: payload.description,
        podcastID: payload.podcastID,
        episodeID: null
    })
}

export const getUnansweredQuestions = async (pid) => {
    const q = query(collection(firestore, "questions"), where("episodeID", "==", null), where("podcastID", "==", pid))
    const querySnapshot = await getDocs(q)
    const listQuestions = []
    querySnapshot.forEach((doc) => {
        listQuestions.push(doc.data())
    })
    return listQuestions
}