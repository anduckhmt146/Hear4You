import { Image, Pressable, Text, View } from 'react-native'
import InactivePlayIcon from '../../../assets/svg/play_inactive.svg'

import { useEffect, useState } from 'react'
import { getThumbnailUrl } from '../../firebase/storage'
import styles from './styles'

const PodcastCard = ({ item, onPress }) => {
    const [url, setUrl] = useState(null)

    useEffect(() => {
        getThumbnailUrl(item).then((res) => {
            setUrl(res)
            console.log(res)
        })
    }, [])

    return (
        <Pressable style={styles.container} onPress={() => onPress()}>
            <View style={styles.header}>
                <View style={styles.infoContainer}>
                    <Image
                        style={styles.image}
                        source={
                            url
                                ? {
                                      uri: url,
                                  }
                                : require('../../../assets/thumbnail.jpg')
                        }
                    />
                    <Text numberOfLines={2} style={styles.title}>
                        {item.title}
                    </Text>
                </View>
                <View>
                    <InactivePlayIcon width={50} height={50} />
                </View>
            </View>
            <Text numberOfLines={3} style={styles.description}>
                {item.description}
            </Text>
            <View style={styles.bar}></View>
        </Pressable>
    )
}

export default PodcastCard
