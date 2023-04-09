import { StyleSheet } from 'react-native'

const style = StyleSheet.create({
    background: {
        width: '100%',
        paddingVertical: 8,

        display: 'flex',
        flexDirection: 'row',
    },
    element: {
        flexBasis: '20%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default style
