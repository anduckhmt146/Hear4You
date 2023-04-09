import { Audio } from 'expo-av'
import React, { useState } from 'react'

const Context = React.createContext({})

export const Provider = ({ children }) => {
    const [name, setName] = React.useState('')
    const [role, setRole] = React.useState('')
    const [uid, setUid] = useState('')
    const [sound, setSound] = React.useState(null)
    const [soundStatus, setSoundStatus] = React.useState({
        status: null,
        icon: 'pause',
    })
    const [trackUrl, setTrackUrl] = React.useState('')
    const [track, setTrack] = React.useState(null)
    const [playingFullScreen, setPlayingFullScreen] = React.useState(false)

    async function handleAudio() {
        //playing audio for the first time
        if (soundStatus.status === null) {
            console.log('Loading Sound')
            const { sound, status } = await Audio.Sound.createAsync(
                {
                    uri: trackUrl,
                },
                { shouldPlay: true },
                (status) => handleProgress(status)
            )
            setSound(sound)
            setSoundStatus({ status: status, icon: 'play' })
        }
        //pause audio
        if (soundStatus.status) {
            if (soundStatus.status.isLoaded && soundStatus.status.isPlaying) {
                const status = await sound.pauseAsync()
                console.log('pausing audio')
                setSoundStatus({ status: status, icon: 'pause' })
            }
            //resuming audio
            if (soundStatus.status.isLoaded && !soundStatus.status.isPlaying) {
                const status = await sound.playAsync()
                console.log('resuming audio')
                setSoundStatus({ status: status, icon: 'play' })
            }
        }
    }

    const handleProgress = (status) => {
        setSoundStatus({ status: status })
    }

    return (
        <Context.Provider
            value={{
                name,
                setName,
                role,
                setRole,
                uid,
                setUid,
                sound,
                setSound,
                soundStatus,
                setSoundStatus,
                handleAudio,
                track,
                trackUrl,
                setTrack,
                setTrackUrl,
                setPlayingFullScreen,
                playingFullScreen,
            }}
        >
            {children}
        </Context.Provider>
    )
}

export default Context
