import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Box, NativeBaseProvider } from 'native-base';
import { Product, products } from '../assets/apis/Product.data';
import { ProductsList } from './ProductLists';
import ProductDetails from './ProductDetails';


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

const MainScreen = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  console.log("MainScreen");
  const handlePressProduct = (productId: string) => {
    const product = products.find((p) => p.id.toString() === productId);
    setSelectedProduct(product || null);
  };

  return (
    <NativeBaseProvider>
      <Box style={styles.container}>
        {selectedProduct ? (
          <ProductDetails product={selectedProduct} />
        ) : (
          <ProductsList products={products} onPressProduct={handlePressProduct} />
        )}
      </Box>
    </NativeBaseProvider>
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