import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import {
    NavigationContainer,
    useNavigation,
    useRoute,
} from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import BellIcon from '../../../assets/svg/bell_icon.svg'
import PodcastCard from '../../components/podcastCard/PodcastCard'
import TopTab from '../../components/tab/Tab'
import Context from '../../context/Context'
import { getNewestEpisode, getTrendingEpisode } from '../../firebase/firestore'
import styles from './styles'

const Tab = createMaterialTopTabNavigator()

const Trending = () => {
    const [listEpisodes, setListEpisodes] = useState([])
    const navigation = useNavigation()
    const { setTrack } = React.useContext(Context)

    useEffect(() => {
        const handle = async () => {
            const res = await getTrendingEpisode()
            setListEpisodes(res)
        }

        const timerId = setInterval(() => {
            handle()
        }, 5000)

        return () => clearInterval(timerId)
    }, [])

    return (
        <ScrollView>
            {listEpisodes.map((item) => (
                <PodcastCard
                    key={item.episodeID}
                    item={item}
                    onPress={() => {
                        setTrack(item)
                        navigation.navigate('Playing', {
                            ...item,
                        })
                    }}
                />
            ))}
        </ScrollView>
    )
}

const Newest = () => {
    const [listEpisodes, setListEpisodes] = useState([])
    const { setTrack } = React.useContext(Context)
    const navigation = useNavigation()

    useEffect(() => {
        const handle = async () => {
            const res = await getNewestEpisode()
            setListEpisodes(res)
        }

        const timerId = setInterval(() => {
            handle()
        }, 5000)

        return () => clearInterval(timerId)
    }, [])

    return (
        <ScrollView>
            {listEpisodes.map((item) => (
                <PodcastCard
                    key={item.episodeID}
                    item={item}
                    onPress={() => {
                        setTrack(item)
                        navigation.navigate('Playing', {
                            ...item,
                        })
                    }}
                />
            ))}
        </ScrollView>
    )
}

const Filter = () => {
    return (
        <View>
            <Text>Filter</Text>
        </View>
    )
}

const HomeScreen = () => {
    return (
        <>
            <View style={styles.appBar}>
                <BellIcon
                    style={{ position: 'absolute', bottom: 5, right: 25 }}
                />
                <Text style={styles.screenTitle}>Home</Text>
            </View>
            <View style={{ height: 100 }}></View>

            <Tab.Navigator tabBar={(props) => <TopTab {...props} />}>
                <Tab.Screen name='Trending' component={Trending} />
                <Tab.Screen name='Newest' component={Newest} />
                <Tab.Screen name='Filter' component={Filter} />
            </Tab.Navigator>
        </>
    )
}

export default HomeScreen
