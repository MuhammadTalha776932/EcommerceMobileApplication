import React from 'react';
import RNRestart from 'react-native-restart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Box, Image, Text, VStack } from 'native-base';
import { Product } from '../assets/apis/Product.data';
import { Logger } from '../constants/Logger.constants';
interface ProductDetailsProps {
  product: Product;
  onBack: () => void;
}



export const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onBack }) => {
  const url = "https://api.retailync.com/public/"
  const handleSetLocalStorage = async () => {

    const token = await AsyncStorage.getItem('token');
    const email = await AsyncStorage.getItem('email');
    const password = await AsyncStorage.getItem('password');

    Logger("token", token)
    Logger("email", email)
    Logger("password", password)

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
      <Image source={{ uri: product.product_image }} alt={product.product_name} style={styles.image} />
      <Box style={styles.details}>
        <Text style={styles.price}>{product.category_name} </Text>
        <Text style={styles.name}>{product.product_name}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.price}>Selling_Price: {product.selling_price} USD</Text>
        <Text style={styles.price}>Cost_Price: {product.cost_price} USD</Text>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>Back to List</Text>
        </TouchableOpacity>
      </Box>
      <TouchableOpacity style={styles.backButton} onPress={handleSetLocalStorage}>
        <Text style={styles.backButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
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
  image: {
    flex: 1,
    resizeMode: 'contain',
    width: '100%',
    maxHeight: 300,
  },
  details: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    marginTop: 16,
    padding: 6,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    marginTop: 8,
    fontSize: 18,
    padding: 6,
    textAlign: 'center',
  },
  price: {
    marginTop: 24,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 6,
  },
});


export default ProductDetails;
