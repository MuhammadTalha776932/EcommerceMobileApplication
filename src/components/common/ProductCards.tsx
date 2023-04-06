import React from 'react';
import { StyleSheet, TouchableOpacity, View, useWindowDimensions } from 'react-native';
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
  const url = "https://api.retailync.com/public/";
  let {width,height} = useWindowDimensions();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 16,
      margin: 8,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: width * 5/12,
      maxHeight: height * 5/12,
    },
    image: {
      flex: 1,
      resizeMode: 'contain',
      width: width,
      maxHeight: 150,
    },
    name: {
      marginTop: 8,
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} disabled={disableTouchableOpacity ? true : false}>
      <Box
      // style={styles.container}
      >
        <Image source={{ uri: url + image.toString() }} alt={""} style={styles.image} />
        <Text style={styles.name}>{name}</Text>
      </Box>
    </TouchableOpacity>

  );
};



export default ProductCard;