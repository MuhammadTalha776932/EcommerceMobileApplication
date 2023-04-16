import { useNavigation } from "@react-navigation/native";
import { Box, HStack, IconButton, Icon, Button } from "native-base";
import { StatusBar, Text, useWindowDimensions } from "react-native";
import { StackScreenNameProvider } from "../../utils/StackScreenNameProvider.utils";

export function AppBar() {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  return (<Box>
    <StatusBar backgroundColor="#3700B3" barStyle="light-content" />
    <Box bg="violet.600" />
    <HStack bg="violet.800" px="1" py="3" justifyContent="space-between" alignItems="center" w="100%">
      <HStack alignItems="center">
      </HStack>
      <HStack>
        <Button textAlign={"center"} onPress={() => {
          navigation.navigate(StackScreenNameProvider.ProductForm as never);
        }}>+</Button>
      </HStack>
    </HStack>
  </Box>)
}