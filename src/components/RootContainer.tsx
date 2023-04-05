import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from '@tanstack/react-query';
import * as React from 'react';
import { SafeAreaView } from 'react-native';
import AuthNavigationStack from '../navigations/AuthNavigation.stack';
import MainScreen from '../screens/MainScreen';
import Stack from '../utils/Stack.utils';
import { StackScreenNameProvider } from '../utils/StackScreenNameProvider.utils';
import { View, Spinner } from 'native-base';

export interface AppProps {
}

export function RootContaienr(props: AppProps) {
    const { data, isLoading, isError, isSuccess } = useQuery({
        queryKey: ["token"], queryFn: async () => {
            const token = await AsyncStorage.getItem("token");
            return token?.length! == 0 || token !== null ? true : false;
        }
    })

    if (isLoading) return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Spinner color='blue' size={20} />
    </View>)
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Stack.Navigator
                initialRouteName={data ? StackScreenNameProvider.Home : StackScreenNameProvider.Auth}
                screenOptions={({ navigation, route }) => ({ headerShown: false })}

            >
                <Stack.Screen name={StackScreenNameProvider.Home} children={
                    () => <MainScreen />
                } />
                <Stack.Screen name={StackScreenNameProvider.Auth} children={
                    () => <AuthNavigationStack />
                } />
            </Stack.Navigator>
        </SafeAreaView>
    );
}


export default RootContaienr