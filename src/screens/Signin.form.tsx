import React, { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackScreenNameProvider } from '../utils/StackScreenNameProvider.utils';
import { SignUpPostConfig } from '../constants/SignUp.constants';
import { Logger } from '../constants/Logger.constants';
import { UserEmailAndPasswordContext } from '../utils/UserEmailAndPasswordContext';

interface ISignInForm {
  title: string;
  placeholder: Array<string>;
  buttonText: string;

  options: {
    screenIdentifier: string,
  };
}

interface ISignUpData {
  email: string;
  password: string;
}

type handleReturnType = {
  data: any;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
} | undefined

const SignInForm = ({ title, placeholder, buttonText, options }: ISignInForm) => {
  const [email, setEmail] = useState('testinglive@gmail.com');
  const [password, setPassword] = useState('12345678');

  const { contextEmail, contextPassword, setContextEmail, setContextPassword } = React.useContext(UserEmailAndPasswordContext);

  const navigation = useNavigation();

  let { screenIdentifier } = options;

  // * handle the Sign Up functionality
  const handleTheSignUpMethod = async (email: string, password: string) => {
    // * Checked Email and Password are exists or not 
    if (email.length !== 0 && password.length !== 0) {
      let PostData = {
        email: email,
        password: password,
      }
      let response = await axios.post("/user/store", PostData, SignUpPostConfig)
      return response.data;
    } else {
      Alert.alert("Plz Enter Email and Password", "Plz nnter your email and password kindly.");
    }
  }
  //* handle the Sign In functionality
  const handleTheSignInMethod = async (email: string, password: string) => {

    // * Checked Email and Password are exists or not 
    if (email.length !== 0 && password.length !== 0) {
      let PostData = {
        email: email,
        password: password,
      }

      return await axios.post("/user/login", { ...PostData }, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then(({ data, status, statusText }) => {
          return data;
        })
        .catch((error) => {
          if (error.response.data?.error?.includes("Unauthorized")) {
            let statusMessage: string = error.response.data?.error;
            Alert.alert("Message", statusMessage)
          }
          console.log(error.response?.data?.statusCode);
        });

    } else {
      Alert.alert("Plz Enter Email and Password", "Plz enter your email and password kindly.");
    }
  }
  Logger("Context Store Email", contextEmail);

  const InsertIntoLocalStorage = async (email: string, password: string) => {
    try {

      const localEmail = await AsyncStorage.getItem('email');
      const localPassword = await AsyncStorage.getItem('password');

      if (localEmail !== null && localPassword !== null) {
        await AsyncStorage.multiRemove(["email,password"]);
        await AsyncStorage.setItem("email", email);
        await AsyncStorage.setItem("password", password);
      }
      else {

        await AsyncStorage.setItem("email", email);
        await AsyncStorage.setItem("password", password);
      }

    } catch (error) {
      console.error(error);
    }
  }



  //* Function to handle form submission
  const handleSignIn = async ({ email, password }: ISignUpData) => {

    //? SignIn EndPoint called here.
    if (screenIdentifier.includes(StackScreenNameProvider.SignIn)) {
      await handleTheSignInMethod(email, password).then(user => {

        let token: string = user?.token || "";

        if (token) {
          (token?.length !== 0 && AsyncStorage.setItem("token", token))

          token?.length !== 0 && navigation.navigate(StackScreenNameProvider.Home as never);

          Logger("Here is Sign in response", JSON.stringify(token));
          token?.length !== 0 && setContextEmail !== null && setContextEmail(email);
          token?.length !== 0 && setContextPassword !== null && setContextPassword(password);
          token?.length !== 0 && InsertIntoLocalStorage(email, password);
        } else {
          console.warn("Token does'nt exist")
        }
      })

    };
    // if (screenIdentifier.includes(StackScreenNameProvider.SignUp)) handleTheSignUpMethod(email, password);

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
          <TouchableOpacity style={styles.button} onPress={() => handleSignIn({ email, password })}>
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
    textAlign: 'center',
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