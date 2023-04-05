import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Box } from 'native-base';
import { Product} from '../assets/apis/Product.data';
import { ProductsList } from './ProductLists';
import ProductDetails from './ProductDetails';
import {
  useQuery,
  useQueryClient
} from "@tanstack/react-query";

import axios from "axios";
import { token } from '../constants/token';

// TODO: https://api.retailync.com/api/product/list called this API.

// const products: Product[] = [
//   {
//     id: '1',
//     name: 'Product 1',
//     imageUrl: 'https://picsum.photos/200/300',
//     description: 'This is product 1',
//     price: 10,
//   },
//   {
//     id: '2',
//     name: 'Product 2',
//     imageUrl: 'https://picsum.photos/200/300',
//     description: 'This is product 2',
//     price: 20,
//   },
//   {
//     id: '3',
//     name: 'Product 3',
//     imageUrl: 'https://picsum.photos/200/300',
//     description: 'This is product 3',
//     price: 30,
//   },
//   {
//     id: '4',
//     name: 'Product 4',
//     imageUrl: 'https://picsum.photos/200/300',
//     description: 'This is product 4',
//     price: 40,
//   },
// ];


axios.defaults.baseURL = "https://api.retailync.com/api"

const MainScreen = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const getProductList = async () => {
    const response = await axios.get("https://api.retailync.com/api/product/list", {
      headers: {
        "Content-Type": "application/json",
        "Accept": "*/*",
        Authorization: `Bearer ${token}`
      }
    })
    return response.data.product_list;
  }



  const { isError, isLoading, data, isSuccess } = useQuery({ queryKey: ['product'], queryFn: getProductList })


  const handlePressProduct = (productId: string) => {
    const product = data.find((p:Product) => p.id.toString() === productId);
    setSelectedProduct(product || null);
  };

  const handleBackToList = () => {
    setSelectedProduct(null);
  };

  if (isLoading) <Text>Loading...</Text>;

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