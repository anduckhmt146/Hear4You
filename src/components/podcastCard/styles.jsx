import { Dimensions, StyleSheet } from 'react-native'
const maxWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: '100%',
        paddingHorizontal: maxWidth * 0.07,
        paddingTop: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 20,
        flex: 1
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        flex: 1
    },
    description: {
        marginTop: 15,
        fontSize: 15,
        color: '#8F8B8B',
        textAlign: 'justify',
        lineHeight: 20,
    },
    bar: {
        marginTop: 20,
        height: 2,
        backgroundColor: '#F1EEEE',
    },
})

export default styles
