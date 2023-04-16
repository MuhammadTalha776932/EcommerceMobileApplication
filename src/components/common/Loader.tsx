import { Spinner } from "native-base"
import { Alert, Text, View } from "react-native"



export const Loader = (isLoading:boolean,isError:boolean) => {
    if (isLoading) return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Spinner color='blue' size={20} />
    </View>)
      if (isError) return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Error</Text>
        </View>
      )
}
