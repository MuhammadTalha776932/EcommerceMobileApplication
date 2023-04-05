import React from 'react';
import { StyleSheet, FlatList, ScrollView, VirtualizedList } from 'react-native';
import { Box } from 'native-base';

import ProductCard from '../components/common/ProductCards';
import { Product } from '../assets/apis/Product.data';


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



  const handleScrollBeginDrag = () => {
    setDisableTouchableOpacity(true);
  };

  const handleScrollEndDrag = () => {
    setDisableTouchableOpacity(false);
  };

  return (
    <Box style={styles.container}>
      <FlatList
        showsHorizontalScrollIndicator={true}
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={1}
        contentContainerStyle={styles.list}
        onScrollBeginDrag={handleScrollBeginDrag}
        onScrollEndDrag={handleScrollEndDrag}
      />
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
});
