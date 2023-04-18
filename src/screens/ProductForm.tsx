import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Box, Button, Center, CheckIcon, Select } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { StackScreenNameProvider } from '../utils/StackScreenNameProvider.utils';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import * as
  ImagePicker from 'react-native-image-picker';
import DropDownList from '../components/common/DropDownList.common';

interface ProductForm {
  product_name: string;
  product_image?: object;
  category_name: string;
  sub_category_name: string;
  category_idFk: number;
  sub_category_idFk: number;
};

const ProductDetailForm = () => {

  const navigation = useNavigation();

  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [image, setImage] = useState<ImagePicker.ImagePickerResponse | null>(null);
  const [isImageSelected, setIsImageSelected] = useState<boolean>(false);

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [subcategoryOpen, setSubCategoryOpen] = useState(false);

  const [storeCategoryList, setStoreCategoryList] = useState([])
  const [storeSubategoryList, setStoreSubCategoryList] = useState([])

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
          setStoreCategoryList(categoriesItems.data?.categories_list)
        })
        .catch((error) => { return error })

      await axios.get("/subcategory/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then(subCategoriesItems => {
          console.log("category", subCategoriesItems.data);
          setStoreSubCategoryList(subCategoriesItems.data?.sub_categories_list);
        })
        .catch((error) => { return error })
    }
    getData()

    return () => console.log("unmounted the product screen");

  }, [])

  const handlePostSubmittion = async (data) => {
    const token = await AsyncStorage.getItem("token");
    console.log(token)
    await axios.post('https://api.retailync.com/api/product/store', data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      }
    })
      .then(response => {
        console.log(response.data?.Message);
        Alert.alert("Message", JSON.stringify(response.data?.Message), [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate(StackScreenNameProvider.Home as never);
            }
          }
        ]);
        return response.data
      })
      .catch((error) => {
        console.log(error);
        let statusMessage = error?.response?.data;
        console.log(error)
        console.log("error", statusMessage)
        Alert.alert("Message", JSON.stringify(statusMessage))
        return statusMessage;
      })
  }

  const handleChoosePhoto = async () => {

    try {
      const options: ImagePicker.ImageLibraryOptions = {
        mediaType: 'photo',
        // includeBase64: true,
      };
      const response = await ImagePicker.launchImageLibrary(options)
      console.log("Image Picker", response);
      if (!response?.didCancel && response?.assets[0]?.uri) {
        setImage(response);
        !response.didCancel && Alert.alert("Message", "Image select successfully")
      }
      if (response.didCancel) {
        Alert.alert("Message", "Image doesn't select", [
          {
            text: "OK",
            onPress: () => setIsImageSelected(true)
          }
        ]);
      }

    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {

    const formData = new FormData();
    let getCategoryID = storeCategoryList.filter(categoryFilter => categoryFilter?.category_name === category)[0]?.id;
    let getSubCategoryID = storeSubategoryList.filter(categoryFilter => categoryFilter?.sub_category_name === subCategory)[0]?.id;

    console.log("Here we print the select category", getCategoryID, getSubCategoryID)

    formData.append('image', {
      uri: image?.assets[0]?.uri,
      type: image?.assets[0]?.type,
      name: image?.assets[0]?.fileName,
    });
    formData.append('product_name', productName)
    formData.append('category_name', category)
    formData.append('sub_category_name', subCategory)
    formData.append('category_idFk', getCategoryID)
    formData.append('sub_category_idFk', getSubCategoryID)


    let productForm: ProductForm = {
      product_name: productName,
      // product_image: formData,
      category_name: category,
      sub_category_name: subCategory,
      category_idFk: getCategoryID,
      sub_category_idFk: getSubCategoryID,
    }

    console.log(productForm);
    handlePostSubmittion(formData);
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
              storeCategoryList.map((categoriesItems, index: number) => (
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
              storeSubategoryList.map((subCategoriesItems, index: number) => (
                <Select.Item key={index} label={subCategoriesItems?.sub_category_name} value={subCategoriesItems?.sub_category_name} />
              ))
            }
          </Select>
        </Box>
      </Center>

      <Button marginY={5} onPress={handleChoosePhoto} >Select Image</Button>
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
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default ProductDetailForm;
