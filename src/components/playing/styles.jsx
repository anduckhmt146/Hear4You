import { Dimensions, StyleSheet } from 'react-native'
const maxWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    playingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#E070C8',
        height: 70,
        width: maxWidth,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 30,
    },
    playingEpisode: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    playingLogo: {
        height: 40,
        width: 40,
    },
    playingTitle: {
        width: '70%',
        color: 'white',
        fontWeight: 'bold',
        marginStart: 20,
    },
})

export default styles
