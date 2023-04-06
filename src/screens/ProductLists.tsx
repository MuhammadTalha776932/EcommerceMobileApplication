import React from 'react';
import { StyleSheet, FlatList, ScrollView, Text } from 'react-native';
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

  return (
    <Box style={styles.container}>
      <ScrollView style={styles.list}>
        {
          products.map((productItems: Product, index: number) => {
            return <React.Fragment key={productItems.id}>
              {renderItem({ item: productItems })}
            </React.Fragment>;
          })
        }
      </ScrollView>

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
