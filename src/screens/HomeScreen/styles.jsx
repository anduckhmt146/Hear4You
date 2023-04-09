import { Dimensions, StyleSheet } from 'react-native'
const maxWidth = Dimensions.get('window').width
var maxHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
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
    bodyContainer: {
        flex: 1,
    },
    headerText: {
        width: '100%',
        fontSize: 14,
        textAlign: 'center',
    },
})

export default styles
