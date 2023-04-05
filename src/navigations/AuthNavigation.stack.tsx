import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import Stack from "../utils/Stack.utils";
import SignInForm from "../screens/Signin.form";
import { StackScreenNameProvider } from "../utils/StackScreenNameProvider.utils";

interface IAuthNavigationProps {

};

const AuthNavigationStack = () => {
    return (
        <Stack.Navigator initialRouteName={StackScreenNameProvider.SignIn} screenOptions={({ navigation, route }) => ({ headerShown: false })}>
            <Stack.Screen name={StackScreenNameProvider.SignIn} children={
                () => <SignInForm
                    title="Sign In"
                    placeholder={["Email", "Password"]}
                    buttonText="Sign In" 
                    options={{screenIdentifier:StackScreenNameProvider.SignIn}}
                    />
            } />
            <Stack.Screen name={StackScreenNameProvider.SignUp} children={
                () => <SignInForm
                    title="Sign Up"
                    placeholder={["Email", "Password"]}
                    buttonText="Sign Up" 
                    options={{screenIdentifier:StackScreenNameProvider.SignUp}}
                    />
            } />
        </Stack.Navigator>
    )
};

export default AuthNavigationStack;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})