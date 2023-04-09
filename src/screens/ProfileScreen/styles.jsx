import { Dimensions, StyleSheet } from 'react-native'
const maxWidth = Dimensions.get('window').width
var maxHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
    profileContainer: {
        // flex: 1,
        height: maxHeight,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    profileTitle: {
        height: 100,
        width: maxWidth,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn: {
        width: maxWidth * 0.8,
        backgroundColor: '#6A5ACB',
        borderRadius: 30,
        paddingVertical: maxWidth * 0.05,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: maxWidth * 0.1,
        paddingHorizontal: 30,
        marginTop: 20,
    },
    pressed: {
        backgroundColor: '#574AA7',
    },
    content: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 22,
    },
    appBar: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 80,
        marginBottom: 45,
        paddingBottom: 5,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        zIndex: 1000,
    },
    screenTitle: {
        fontWeight: 600,
        fontSize: 25,
    },
})

export default styles
