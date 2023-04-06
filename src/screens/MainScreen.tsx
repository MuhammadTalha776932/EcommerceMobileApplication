import React, { useState } from 'react';
import { StyleSheet, Text, Alert } from 'react-native';
import { Box, Spinner, View } from 'native-base';
import { Product } from '../assets/apis/Product.data';
import { ProductsList } from './ProductLists';
import ProductDetails from './ProductDetails';
import {
  useQuery,
  useQueryClient
} from "@tanstack/react-query";

import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


// TODO: https://api.retailync.com/api/product/list called this API.

const MainScreen = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const getProductList = async () => {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get("https://api.retailync.com/api/product/list", {
      headers: {
        "Content-Type": "application/json",
        "Accept": "*/*",
        Authorization: `Bearer ${token}`
      }
    })
    console.log(response.data);
    return response.data.product_list;
  }



  const { isError, isLoading, data, isSuccess, isFetched, error } = useQuery({ queryKey: ['product'], queryFn: getProductList })


  const handlePressProduct = (productId: string) => {
    const product = data.find((p: Product) => p.id.toString() === productId);
    setSelectedProduct(product || null);
  };

  console.log(error);

  const handleBackToList = () => {
    setSelectedProduct(null);
  };

  if (isLoading) return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Spinner color='blue' size={20} />
  </View>)

  if (isError) return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Error</Text>
    </View>
  )

  return (
    <Box style={styles.container}>
      {
        isSuccess && <>
          {
            selectedProduct ? (
              <ProductDetails product={selectedProduct} onBack={handleBackToList} />
            ) : (
              <ProductsList products={data} onPressProduct={handlePressProduct} />
            )}
        </>

      }

    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //   backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',

  },
});

export default MainScreen;