import React from 'react';
import { StyleSheet, FlatList, ScrollView, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Box } from 'native-base';

import ProductCard from '../components/common/ProductCards';
import { Product } from '../assets/apis/Product.data';
import { Scrollable } from '../components/common/Scrollable.common';
import RNRestart from 'react-native-restart';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';



interface ProductsListProps {
  products: Product[];
  onPressProduct: (productId: string) => void;
}

export const ProductsList: React.FC<ProductsListProps> = ({
  products,
  onPressProduct,
}) => {

  const [disableTouchableOpacity, setDisableTouchableOpacity] = React.useState<boolean>(false);

  const renderItem = ({ item }: { item: Product }) => (
    <ProductCard
      id={item?.id.toString()}
      name={item?.product_name}
      image={item?.product_image}
      disableTouchableOpacity={disableTouchableOpacity}
      onPress={() => onPressProduct(item?.id.toString())}
    />
  );

  const handleSetLocalStorage = async () => {

    const token = await AsyncStorage.getItem('token');
    const email = await AsyncStorage.getItem('email');
    const password = await AsyncStorage.getItem('password');

    // Logger("token", token)
    // Logger("email", email)
    // Logger("password", password)

    if (email?.length !== 0 && password?.length !== 0 && token?.length !== 0) {
      await axios.post("/user/logout", { email: email, password: password }, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*",
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        Alert.alert("Message", `${response.data?.message}`, [{ text: "OK", onPress: () => RNRestart.restart() }]);
        AsyncStorage.removeItem("token");
        console.info("token removed successfully");
      })
        .catch((error) => {
          if (error.response.data?.error?.includes("Unauthorized")) {
            let statusMessage: string = error.response.data?.error;
            Alert.alert("Message", statusMessage)
          }
          console.warn(error.response.data?.error);
        })
    } else {
      console.warn("email, password, and token doesn't exist at localstorage");
    }

  }

  return (
    <Box style={styles.container}>
      {
        products.length !== 0 ? (
          <ScrollView style={styles.list}>
            {
              products.map((productItems: Product, index: number) => {
                return <React.Fragment key={productItems.id}>
                  {renderItem({ item: productItems })}
                </React.Fragment>
              })
            }
          </ScrollView>) : (
          <View style={{ flex: 1, justifyContent: "center", alignSelf: "center", alignItems: "center" }}>
            <Text>Nothing to show</Text>
            <TouchableOpacity style={styles.backButton} onPress={handleSetLocalStorage}>
              <Text style={styles.backButtonText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        )
      }

    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 8,
  },
  list: {
    flexGrow: 1,
    // justifyContent: 'space-between',
  },
  backButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5
  },
  backButtonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center'
  },
});
