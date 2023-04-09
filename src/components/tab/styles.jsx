import { Dimensions, StyleSheet } from 'react-native'
const maxWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    element: {
        width: '33%',
        paddingVertical: 10,
        justifyContent: 'center',
    },
    elementNonFocus: {
        backgroundColor: 'white',
    },
    elementFocus: {
        backgroundColor: '#6A5ACB',
    },
    text: {
        fontSize: 18,
        fontWeight: 500,
        textAlign: 'center',
        color: '#A2A9B8',
    },
    textFocus: {
        fontSize: 18,
        fontWeight: 500,
        textAlign: 'center',
        color: 'white',
    },
})

export default styles
