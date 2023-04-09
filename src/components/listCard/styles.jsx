import { Dimensions, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        width: '90%',
        backgroundColor: '#6A5ACB',
        paddingHorizontal: 20,
        paddingVertical: 25,
        borderRadius: 20,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        fontSize: 22,
        color: 'white',
        fontWeight: 'bold',
    },
})

export default styles
