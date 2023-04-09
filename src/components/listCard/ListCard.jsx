import { Text, View } from 'react-native'
import ExploreIcon from '../../../assets/svg/explore.svg'
import styles from './styles'

const ListCard = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Your list</Text>
            <ExploreIcon width={30} height={30} />
        </View>
    )
}

export default ListCard
