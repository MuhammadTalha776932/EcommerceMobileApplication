import { Box, Center, CheckIcon, Select, Text } from 'native-base';
import * as React from 'react';
import { StyleSheet } from 'react-native';

interface DropDownListProps {

    children?: React.ReactNode;
    SelectedCategoryOrSubCategory: string;
    setSelectedCategoryOrSubCategory: React.Dispatch<React.SetStateAction<string>>;

}

const DropDownList = (props: DropDownListProps) => {
    
    return (
        <React.Fragment>
            <Center>
                <Box>
                    <Select selectedValue={props.SelectedCategoryOrSubCategory} minWidth="100%" accessibilityLabel="Category" placeholder="Category"
                        _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size="5" />
                        }}
                        mt={1}
                        onValueChange={itemValue => { props.setSelectedCategoryOrSubCategory(itemValue); console.log("selected Category", itemValue) }}

                    >
                        {
                            props.children
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
