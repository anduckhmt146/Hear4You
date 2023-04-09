import { Dimensions, StyleSheet } from 'react-native'
var maxWidth = Dimensions.get('window').width
var maxHeight = Dimensions.get('window').height
const styles = StyleSheet.create({
    yourlistContainer: {
        // flex: 1,
    },
    yourlistTitle: {
        height: 100,
        width: maxWidth,
        alignItems: 'center',
        justifyContent: 'center',
    },
    appBar: {
        height: 100,
        marginBottom: 45,
        paddingBottom: 5,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    screenTitle: {
        fontWeight: 600,
        fontSize: 25,
    },
})

export default styles
