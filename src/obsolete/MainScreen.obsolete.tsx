import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions
} from 'react-native';

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  stock: number;
  description: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Product 1',
    image: 'https://placeimg.com/200/200/tech',
    price: 10,
    stock: 20,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  {
    id: 2,
    name: 'Product 2',
    image: 'https://placeimg.com/200/200/nature',
    price: 20,
    stock: 10,
    description: 'Pellentesque euismod enim eu purus ullamcorper blandit.'
  },
  {
    id: 3,
    name: 'Product 3',
    image: 'https://placeimg.com/200/200/animals',
    price: 30,
    stock: 5,
    description: 'Vestibulum quis sapien in libero lobortis euismod sit amet at lacus.'
  }
];


const MainScreenObsolete: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const {width,height} = useWindowDimensions();

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleBackToList = () => {
    setSelectedProduct(null);
  };

  const styles = StyleSheet.create({
    container: {
      height:height,
      backgroundColor: '#fff'
    },
    itemContainer: {
      flexDirection: 'row',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc'
    },
    itemImage: {
      width: 50,
      height: 50,
      marginRight: 10
    },
    itemDetails: {
      flex: 1,
      justifyContent: 'center'
    },
    itemName: {
      fontSize: 16,
      fontWeight: 'bold'
    },
    itemPrice: {
      fontSize: 14
    },
    detailsContainer: {
      height:"100%",
    },
    detailsImage: {
      width: '100%',
      height: 200,
      resizeMode: 'cover'
    },
    details: {
      padding: 10
    },
    detailsName: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10
    },
    detailsPrice: {
      fontSize: 16,
      marginBottom: 10
    },
    detailsStock: {
      fontSize: 16,
      marginBottom: 10
    },
    detailsDescription: {
      fontSize: 16,
      marginBottom: 10
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
    }
  });

  
const ProductList: React.FC<{ products: Product[], onSelectProduct: (product: Product) => void }> = ({ products, onSelectProduct }) => (
    <View style={styles.detailsContainer}>
      {products.map((product) => (
        <TouchableOpacity key={product.id} onPress={() => onSelectProduct(product)}>
          <View style={styles.itemContainer}>
            <Image source={{ uri: product.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{product.name}</Text>
              <Text style={styles.itemPrice}>{`$${product.price}`}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
  
  const ProductDetails: React.FC<{ product: Product, onBack: () => void }> = ({ product, onBack }) => (
    <ScrollView style={styles.detailsContainer} >
      <Image source={{ uri: product.image }} style={styles.detailsImage} />
      <View style={styles.details}>
        <Text style={styles.detailsName}>{product.name}</Text>
        <Text style={styles.detailsPrice}>{`$${product.price}`}</Text>
        <Text style={styles.detailsStock}>{`Stock: ${product.stock}`}</Text>
        <Text style={styles.detailsDescription}>{product.description}</Text>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>Back to List</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      {selectedProduct ? (
        <ProductDetails product={selectedProduct} onBack={handleBackToList} />
      ) : (
        <ProductList products={products} onSelectProduct={handleSelectProduct} />
      )}
    </SafeAreaView>
  );
};

export default MainScreenObsolete;
