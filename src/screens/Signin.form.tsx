import React, { ReactPropTypes, useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';

interface ISignInForm {
    title:string;
    placeholder:Array<string>;
    buttonText:string;

    options?:object;
}

const SignInForm = ({title,placeholder,buttonText,options}:ISignInForm) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    //* Function to handle form submission
    const handleSignIn = () => {
      //? SignIn EndPoint called here.
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder={placeholder[0]}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder={placeholder[1]}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleSignIn}>
              <Text style={styles.buttonText}>{buttonText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      width: '80%',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign:'center',
      marginBottom: 20,
    },
    form: {
      backgroundColor: '#FFF',
      borderRadius: 10,
      padding: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: '#DDD',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
    button: {
      backgroundColor: '#007AFF',
      borderRadius: 5,
      padding: 15,
      alignItems: 'center',
    },
    buttonText: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
export default SignInForm;  