import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Box, Image, Text } from 'native-base';

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  onPress: () => void;
  disableTouchableOpacity: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  image,
  onPress,
  disableTouchableOpacity,
}) => {
  const url = "https://api.retailync.com/public/"
  return (
    <TouchableOpacity onPress={onPress} disabled={disableTouchableOpacity ? true : false}>
      <Box style={styles.container}>
        <Image source={{ uri: url + image.toString() }} alt={""} style={styles.image} />
        <Text style={styles.name}>{name}</Text>
      </Box>
    </TouchableOpacity>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
    maxHeight: 200,
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    width: '100%',
    maxHeight: 150,
  },
  name: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProductCard;