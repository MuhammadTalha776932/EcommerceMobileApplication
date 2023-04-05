import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Box, Image, Text, VStack } from 'native-base';
import { Product } from '../assets/apis/Product.data';
interface ProductDetailsProps {
  product: Product;
  onBack: () => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onBack }) => {
  const url = "https://api.retailync.com/public/"
  return (
    <Box style={styles.container}>
      <Image source={{ uri: url + product.product_image }} alt={product.product_name} style={styles.image} />
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
