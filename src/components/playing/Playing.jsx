import { IconButton } from '@react-native-material/core'
import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import Pause from '../../../assets/svg/pause.svg'
import Play from '../../../assets/svg/play2.svg'
import Context from '../../context/Context'
import { getThumbnailUrl } from '../../firebase/storage'
import styles from './styles'

export default Playing = ({ title }) => {
    const { track, handleAudio } = React.useContext(Context)
    const [isPlay, setIsPlay] = useState(true)
    const [thumbnail, setThumbnail] = React.useState('')
    const navigation = useNavigation()

    React.useEffect(() => {
        const handle = async () => {
            if (track) setThumbnail(await getThumbnailUrl(track))
        }
        handle()
    }, [track])

    return (
        <>
            {track && (
                <Pressable
                    style={styles.playingContainer}
                    onPress={() => navigation.navigate('Playing', track)}
                >
                    <View style={styles.playingEpisode}>
                        <Image
                            source={
                                thumbnail
                                    ? {
                                          uri: thumbnail,
                                      }
                                    : require('../../../assets/thumbnail.png')
                            }
                            style={styles.playingLogo}
                        />
                        <Text style={styles.playingTitle} numberOfLines={1}>
                            {track ? track.title : 'Unknown'}
                        </Text>
                    </View>
                    <IconButton
                        icon={
                            !isPlay ? (
                                <Pause height='40' width='40' />
                            ) : (
                                <Play height='40' width='40' />
                            )
                        }
                        onPress={() => {
                            setIsPlay(!isPlay)
                            handleAudio()
                        }}
                    />
                </Pressable>
            )}
        </>
    )
}
