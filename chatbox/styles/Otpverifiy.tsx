import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f6fc', // soft light background for modern look
        padding: 20,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    iconContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#d0e8ff', // subtle blue shade
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: 'green',
        shadowOffset: { width: 1, height: 4 },
        shadowOpacity: 0.26,
        shadowRadius: 8,
        elevation: 8,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#222',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 15,
        color: '#555',
        textAlign: 'center',
        marginBottom: 4,
    },
    email: {
        fontSize: 16,
        color: '#007AFF',
        fontWeight: '600',
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 40,
        paddingHorizontal: 10,
    },
    otpInput: {
        width: 50,
        height: 60,
        borderWidth: 2,
        borderColor: '#cfd8e3',
        borderRadius: 12,
        textAlign: 'center',
        fontSize: 22,
        fontWeight: '600',
        color: '#222',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.26,
        shadowRadius: 3,
        elevation: 7,
    },
    verifyButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 16,
        borderRadius: 14,
        alignItems: 'center',
        marginBottom: 30,
        shadowColor: '#222',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 3,
        elevation: 6,
    },
    verifyButtonDisabled: {
        backgroundColor: '#aac4ff',
    },
    verifyButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    resendContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
    },
    resendText: {
        color: '#555',
        fontSize: 15,
    },
    resendLink: {
        color: '#007AFF',
        fontWeight: '600',
        marginLeft: 5,
        textDecorationLine: 'underline',
    },
    timerText: {
        color: '#555',
        fontWeight: '500',
        marginLeft: 5,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    backIcon: {
        marginRight: 8,
    },
    backText: {
        color: '#007AFF',
        fontSize: 16,
        fontWeight: '500',
    },
});


export default styles;