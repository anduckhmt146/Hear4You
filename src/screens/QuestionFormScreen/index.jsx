import { useNavigation } from '@react-navigation/core'
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native'
import BackIcon from '../../../assets/svg/back_icon.svg'
import Button from '../../components/button/Button'
import styles from './styles'
import Input from '../../components/input/Input'
import { Picker } from '@react-native-picker/picker'
import { useContext, useEffect, useState } from 'react'
import { addNewQuestion, getAllPodcast } from '../../firebase/firestore'
import Context from '../../context/Context'

export default function QuestionForm() {
    const navigation = useNavigation()
    const { uid } = useContext(Context)
    const [podcasts, setPodcasts] = useState([{ name: 'Choose Podcast name', podcastID: null }])
    const [chosen, setChosen] = useState(null)
    const [description, setDescription] = useState('')

    useEffect(() => {
        const handle = async () => {
            console.log(await getAllPodcast())
            setPodcasts(podcasts.concat(await getAllPodcast()))
        }

        handle()
    }, [])

    return (
        <ScrollView style={styles.container}>
            <View style={styles.appBar}>
                <Pressable
                    style={{ position: 'absolute', bottom: 0, left: -10 }}
                    onPress={() => navigation.navigate('Home')}
                >
                    <BackIcon />
                </Pressable>
                <Text style={styles.screenTitle}>Ask question</Text>
            </View>

            <View style={{
                borderWidth: 2,
                borderColor: "#A2A9B8",
                paddingHorizontal: 17,
                textAlignVertical: "top",
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                marginBottom: 40,
                fontSize: 16,
            }}>
                <Picker selectedValue={chosen} onValueChange={(e) => setChosen(e)}>
                    {podcasts.map((topic) => <Picker.Item key={topic} label={topic.name} value={topic.podcastID} />)}
                </Picker>
            </View>
            <Input
                placeholder='Ask question'
                multiline={true}
                numberOfLines={10}
                value={description}
                onChangeText={(e) => setDescription(e)}
            />
            <Button content='Post question' style={styles.button} onPress={() => {
                addNewQuestion({
                    userID: uid,
                    description: description,
                    podcastID: chosen
                })
            }} />
        </ScrollView>
    )
}
