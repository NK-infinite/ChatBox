import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#F4F4FF",
        marginBottom:35,
    },
    header: {
        backgroundColor: "#6C63FF",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        color: "#fff",
        letterSpacing: 1,
    },
    listContent: {
        paddingHorizontal: 15,
        paddingBottom: 90,
        paddingTop: 10,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 18,
        marginVertical: 8,
        shadowColor: "#6C63FF",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 5,
    },
    cardContent: {
        backgroundColor: "#fff",
        borderRadius: 18,
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: "#6C63FF",
    },
    textContainer: {
        flex: 1,
        marginLeft: 12,
    },
    name: {
        fontSize: 18,
        fontWeight: "600",
        color: "#222",
    },
    email: {
        color: "#555",
        fontSize: 14,
    },
    phone: {
        color: "#777",
        fontSize: 13,
    },
    chatButton: {
        backgroundColor: "#6C63FF",
        padding: 10,
        borderRadius: 25,
    },
    fab: {
        position: "absolute",
        bottom: 25,
        right: 25,
        backgroundColor: "#6C63FF",
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#6C63FF",
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 8,
    },

    //only Connect Screen
    button: {
        alignItems: 'center',
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 15
    },
    input: {
        borderWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginVertical: 5,
        borderRadius: 20,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    container: {
        marginVertical: 15,
        marginHorizontal: 20,
    },
     requestName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    requestPhone: {
        fontSize: 13,
        color: '#666',
    },
    searchButton: {
       // backgroundColor: '#6C63FF',
        borderRadius: 5,
        padding: 10,
        marginLeft: 10,
    },
    
   
});


export default styles