import { Box, Center, CheckIcon, Select, Text } from 'native-base';
import * as React from 'react';
import { StyleSheet } from 'react-native';

interface DropDownListProps {
    label: string
    selectedCategoryOrSubCategory: string;
    setSelectedCategoryOrSubCategory: React.Dispatch<React.SetStateAction<string>>;
    store: never[]

}

const DropDownList = ({ selectedCategoryOrSubCategory, setSelectedCategoryOrSubCategory, store, label }: DropDownListProps) => {
    return (
        <React.Fragment>
            <Text fontSize={18} marginBottom={1}>{label}</Text>
            <Center>
                <Box>
                    <Select selectedValue={selectedCategoryOrSubCategory} minWidth="100%" accessibilityLabel={label.includes("Category") ? label : label.includes("Sub Category") ? label : undefined} placeholder={label.includes("Category") ? label : label.includes("Sub Category") ? label : undefined}
                        _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size="5" />
                        }}
                        mt={1}
                        onValueChange={itemValue => { setSelectedCategoryOrSubCategory(itemValue); console.log("selected Category", itemValue) }}

                    >
                        {
                            label.includes("Category") ?
                                store?.map((categoryItem, index: number) => (
                                    <Select.Item key={categoryItem?.id} label={categoryItem?.category_name} value={categoryItem?.category_name} />
                                ))
                                : null
                        }
                        {
                            label.includes("Sub Category") ?
                                store?.map((subCategoryItem, index: number) => (
                                    <Select.Item key={subCategoryItem?.id} label={subCategoryItem?.sub_category_name} value={subCategoryItem?.sub_category_name} />
                                ))
                                : null
                        }
                    </Select>
                </Box>
            </Center>
        </React.Fragment>
    );
};

export default DropDownList;

const styles = StyleSheet.create({
    container: {}
});
