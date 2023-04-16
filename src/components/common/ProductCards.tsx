import React from 'react';
import { StyleSheet, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { Box, Image, Text } from 'native-base';
import Animated, { Layout } from 'react-native-reanimated';

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
  let { width, height } = useWindowDimensions();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 16,
      margin: 8,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: width * 5 / 12,
      maxHeight: height * 5 / 12,
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
    <View>
      <TouchableOpacity style={styles.container} onPress={onPress} disabled={disableTouchableOpacity ? true : false}>
        <Box
        // style={styles.container}
        >
          <Image source={{ uri: image?.toString() }} alt={""} style={styles.image} />
          <Text style={styles.name}>{name}</Text>
        </Box>
      </TouchableOpacity>
    </View>

  );
};



export default ProductCard;