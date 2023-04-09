import { Dimensions, StyleSheet } from 'react-native'
var maxWidth = Dimensions.get('window').width
var maxHeight = Dimensions.get('window').height
const styles = StyleSheet.create({
    container: {
        paddingVertical: 50,
        paddingHorizontal: 40,
        justifyContent: 'flex-start',
        alignItems: "stretch",
    },
    info: {
        // aspectRatio: 287 / 441,
        resizeMode: 'contain',
    },
    logo: {
        marginTop: 20,
    },
    inputContainer: {
        marginTop: 50,
    },
})

export default styles
