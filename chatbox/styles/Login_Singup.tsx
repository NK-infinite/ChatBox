import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
     backgroundColor: '#f2f6fc',
    // backgroundColor optional, screen-specific set kar sakte ho
  },
  scrollContainer: {
    flex: 1,
    padding: 20,
     backgroundColor: '#f2f6fc',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom:5,
    // color optional, screen-specific
  },
  subtitle: {
    fontSize: 16,
    // color optional
  },
  form: {
     marginBottom: 40,
    // backgroundColor: '#fff',
    // borderRadius: 20,
     padding: 20,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 6 },
    // shadowOpacity: 0.1,
    // shadowRadius: 10,
    // elevation: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
   // backgroundColor: '#f3f3f3',
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 7,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    padding: 4,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },
  
  loginButton: {
    backgroundColor: '#6C63FF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 7,
  },

  loginButtonDisabled: {
    backgroundColor: '#ccc',
  },

  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  signupButton: {
    backgroundColor: '#6C63FF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 7,
  },
  signupButtonDisabled: {
    backgroundColor: '#ccc',
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginText: {
    color: '#666',
    fontSize: 14,
  },

  loginLink: {
    color: '#6C63FF',
    fontSize: 14,
    fontWeight: 'bold',
  },

  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  signupText: {
    color: '#666',
    fontSize: 14,
  },
  signupLink: {
    color: '#6C63FF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  termsText: {
   // fontSize: 12,
    textAlign: 'center',
   // flex: 1,
  
  },
  termsLink: {
    color: '#007AFF',
  //  fontWeight: '500',
  textDecorationLine: 'underline',
  },
  
   termsButton: {
//         justifyContent: 'center',
       alignItems: 'center',


// textAlign:'center',
//         paddingVertical: 12,
     },
     socialContainer:{
      //flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
     },
socialText: {
      color: '#666',
      fontSize: 14,
      fontWeight: '500',
},
     socialButtons: {
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
     },
   socialButton: {
    width: 60,
    height: 60,
    marginHorizontal: 10,
     borderWidth: 1,
     borderColor: '#ddd',
     borderRadius: 50,
     justifyContent: 'center',
     alignItems: 'center',
   }
});

export default styles;
