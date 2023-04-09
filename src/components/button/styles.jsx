import { Dimensions, StyleSheet } from 'react-native'
const maxWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    btn: {
        width: maxWidth * 0.8,
        backgroundColor: '#6A5ACB',
        borderRadius: 30,
        paddingVertical: maxWidth * 0.01,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pressed: {
        backgroundColor: '#574AA7',
    },
    content: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
})

export default styles
