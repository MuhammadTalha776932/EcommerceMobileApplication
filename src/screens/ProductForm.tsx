import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Center, Box, Select, CheckIcon } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { StackScreenNameProvider } from '../utils/StackScreenNameProvider.utils';


interface ProductForm { product_name: string, category_name: string, sub_category_name: string, category_idFk: number, sub_category_idFk: number };

const ProductDetailForm = () => {

  const navigation = useNavigation();

  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [subcategoryOpen, setSubCategoryOpen] = useState(false);

  const [store, setStore] = useState({
    categoryList: [],
    subCategoryList: []
  })

  const onCategoryOpen = () => {
    setSubCategoryOpen(false);
  }

  const onSubCategoryOpenOpen = () => {
    setCategoryOpen(false);
  }

  React.useEffect(() => {

    console.log("mounted the product screen");

    const getData = async () => {
      let token = await AsyncStorage.getItem("token");
      await axios.get("/category/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then(categoriesItems => {
          console.log("category", categoriesItems.data);
          setStore(prevState => ({
            ...prevState,
            categoryList: categoriesItems.data?.categories_list
          }))
        })
        .catch((error) => { return error })

      await axios.get("/subcategory/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then(subCategoriesItems => {
          console.log("category", subCategoriesItems.data);
          setStore(prevState => ({
            ...prevState,
            subCategoryList: subCategoriesItems.data?.sub_categories_list
          }))
        })
        .catch((error) => { return error })
    }
    getData()

    return () => console.log("unmounted the product screen");

  }, [])


  const { mutate, isLoading, isError, error } = useMutation(async (data: ProductForm) => {
    const token = await AsyncStorage.getItem("token");
    return await axios.post('https://api.retailync.com/api/product/store', {
      ...data
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        Alert.alert("Message", JSON.stringify(response.data), [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate(StackScreenNameProvider.Home as never);
            }
          }
        ]);
        return response
      })
      .catch((error) => {
        let statusMessage = error.response.data;
        console.log("error", statusMessage)
        Alert.alert("Message", JSON.stringify(statusMessage))
        return statusMessage;
      })
  })


  const handleSubmit = () => {
    let getCategoryID = store.categoryList.filter(categoryFilter => categoryFilter?.category_name === category)[0]?.id;
    let getSubCategoryID = store.subCategoryList.filter(categoryFilter => categoryFilter?.sub_category_name === subCategory)[0]?.id;

    console.log("Here we print the select category", getCategoryID, getSubCategoryID)

    let productForm: ProductForm = {
      product_name: productName,
      category_name: category,
      sub_category_name: subCategory,
      category_idFk: getCategoryID,
      sub_category_idFk: getSubCategoryID
    }

    mutate(productForm);

    console.log(subCategory, category, productName);

  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Product Name</Text>
      <TextInput
        style={styles.input}
        value={productName}
        onChangeText={setProductName}
      />
      <Text style={styles.label}>Category</Text>
      <Center>
        <Box>
          <Select selectedValue={category} minWidth="100%" accessibilityLabel="Category" placeholder="Category" _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />
          }} mt={1} onValueChange={itemValue => { setCategory(itemValue); console.log("selected Category", itemValue) }}>
            {
              store.categoryList.map((categoriesItems, index: number) => (
                <Select.Item key={index} label={categoriesItems?.category_name} value={categoriesItems?.category_name} />
              ))
            }
          </Select>
        </Box>
      </Center>
      <Text style={styles.label}>Sub Category</Text>
      <Center>
        <Box >
          <Select selectedValue={subCategory} minWidth="100%" mb={10} accessibilityLabel="SubCategory" placeholder="SubCategory" _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />
          }} mt={1} onValueChange={itemValue => setSubCategory(itemValue)}>
            {
              store.subCategoryList.map((subCategoriesItems, index: number) => (
                <Select.Item key={index} label={subCategoriesItems?.sub_category_name} value={subCategoriesItems?.sub_category_name} />
              ))
            }
          </Select>
        </Box>
      </Center>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default ProductDetailForm;
