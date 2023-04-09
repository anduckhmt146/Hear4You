import { Dimensions, StyleSheet } from "react-native";
const maxWidth = Dimensions.get('window').width

export default StyleSheet.create({
    container: {
        borderRadius: 30,
        paddingHorizontal: 29,
        paddingVertical: 22,
        display: "flex",
        // elevation: 1,
        borderWidth: 2,
        borderColor: "#eee",
        marginBottom: 20
    },
    title: {
        fontWeight: 600,
        fontSize: 20,
    },
    description: {
        color: "#A2A9B8",
        minHeight: 100,
        fontSize: 18,
    },
    btn: {
        width: maxWidth * 0.5,
        backgroundColor: '#6A5ACB',
        borderRadius: 30,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pressed: {
        backgroundColor: '#574AA7',
    },
    content: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
});