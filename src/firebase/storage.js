// TODO: storage helper functions
// @ts-check

import { getDownloadURL, ref, updateMetadata, uploadBytes } from "firebase/storage";
import { storage } from "./config";

/**
 *
 * @param {app.Episode} episode
 * @param {File} file
 */
export async function uploadEpisode(episode, file) {
    const storageRef = ref(storage, `episodes/${episode.episodeID}.mp3`);
    const snapshot = await uploadBytes(storageRef, file);
    await updateMetadata(storageRef, { contentType: "audio/mpeg" })
    return await getDownloadURL(snapshot.ref);
}

/**
 *
 * @param {app.Episode} episode
 */
export async function getEpisodeUrl(episode) {
    const storageRef = ref(storage, `episodes/${episode.episodeID}.mp3`)
    return await getDownloadURL(storageRef)
}

/**
 *
 * @param {app.Podcast} podcast
 * @param {File} file
 */
export async function uploadThumbnail(podcast, file) {
    const storageRef = ref(storage, `thumbnails/${podcast.podcastID}`)
    return await uploadBytes(storageRef, file)
}

/**
 *
 * @param {app.Podcast} podcast
 * @returns
 */
export async function getThumbnailUrl(podcast) {
    const storageRef = ref(storage, `thumbnails/${podcast.podcastID}.jpg`)
    return await getDownloadURL(storageRef)
}
