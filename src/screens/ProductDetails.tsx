import React from 'react';
import { StyleSheet } from 'react-native';
import { Box, Image, Text, VStack } from 'native-base';
import { Product } from '../assets/apis/Product.data';
interface ProductDetailsProps {
    product: Product;
  }
  
  export const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
    return (
      <Box style={styles.container}>
        <Image source={{ uri: product.image }} alt={product.name} style={styles.image} />
        <Box style={styles.details}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.description}>{product.description}</Text>
          <Text style={styles.price}>{product.price} USD</Text>
        </Box>
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
      padding:6,
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    description: {
      marginTop: 8,
      fontSize: 18,
      padding:6,
      textAlign: 'center',
    },
    price: {
      marginTop: 24,
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      padding:6,
    },
  });
  

export default ProductDetails;
