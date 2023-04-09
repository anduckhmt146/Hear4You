import { IconButton } from '@react-native-material/core'
import { useNavigation } from '@react-navigation/core'
import * as React from 'react'
import { Dimensions, Pressable, ScrollView, Text, View } from 'react-native'
import BackIcon from '../../../assets/svg/back_icon.svg'
import Question from '../../components/question/Question'
import Context from '../../context/Context'
import {
    getQuestionByPodcastID,
    getQuestionByUserID,
} from '../../firebase/firestore'
import styles from './styles'

const YourListScreen = () => {
    const maxHeight = Dimensions.get('window').height
    const navigation = useNavigation()
    const { uid, role } = React.useContext(Context)
    const [questions, setQuestions] = React.useState([])

    React.useEffect(() => {
        const handle = async () => {
            const res =
                role === 'viewer'
                    ? await getQuestionByUserID(uid)
                    : await getQuestionByPodcastID(uid)
            setQuestions(res)
        }

        handle()
    }, [])

    return (
        <View style={styles.yourlistContainer}>
            <View style={styles.appBar}>
                <Pressable
                    style={{ position: 'absolute', bottom: 0, left: 25 }}
                    onPress={() => navigation.goBack()}
                >
                    <BackIcon />
                </Pressable>
                <Text style={styles.screenTitle}>Playing</Text>
            </View>
            <ScrollView
                contentContainerStyle={{
                    height: maxHeight,
                    paddingHorizontal: 20,
                }}
            >
                {questions.map((item, index) => (
                    <Question
                        key={item.questionID}
                        title={`Question #${index + 1}`}
                        description={item.description}
                        role={role}
                    />
                ))}
            </ScrollView>
        </View>
    )
}

export default YourListScreen
