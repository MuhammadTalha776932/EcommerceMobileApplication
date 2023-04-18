import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from '@tanstack/react-query';
import * as React from 'react';
import { SafeAreaView } from 'react-native';
import AuthNavigationStack from '../navigations/AuthNavigation.stack';
import MainScreen from '../screens/MainScreen';
import Stack from '../utils/Stack.utils';
import { StackScreenNameProvider } from '../utils/StackScreenNameProvider.utils';
import { View, Spinner } from 'native-base';
import ProductFormScreen from '../screens/ProductForm';

export interface AppProps {
}

export function RootContaienr(props: AppProps) {
    const { data:token, isLoading, isError, isSuccess } = useQuery({
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
                // initialRouteName={data ? StackScreenNameProvider.Home : StackScreenNameProvider.Auth}
                screenOptions={({ navigation, route }) => ({ headerShown: false })}

            >
                {
                    token ? (
                        <React.Fragment>
                            <Stack.Screen name={StackScreenNameProvider.Home} component={MainScreen} />
                            <Stack.Screen name={StackScreenNameProvider.ProductForm} component={ProductFormScreen} />
                        </React.Fragment>
                    ) : null
                }
                {
                    !token ? (
                        <Stack.Group>
                            <Stack.Screen name={StackScreenNameProvider.Auth} component={AuthNavigationStack} />
                            <Stack.Screen name={StackScreenNameProvider.Home} component={MainScreen} />
                            <Stack.Screen name={StackScreenNameProvider.ProductForm} component={ProductFormScreen} />
                        </Stack.Group>
                    ) : null
                }
            </Stack.Navigator>
        </SafeAreaView>
    );
}


export default RootContaienr