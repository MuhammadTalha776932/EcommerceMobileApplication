import { Button } from 'native-base'
import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Animated, { FadeInRight, Layout, RollInLeft, RollInRight, RollOutRight } from 'react-native-reanimated'

const DemoReanimated = () => {
    const [data, setData] = React.useState<Array<{ id: string, name: string }>>([
        {
            id: "1",
            name: "string"
        },
        {
            id: "2",
            name: "string"
        },
        {
            id: "3",
            name: "string"
        }
    ])
    const [extra, setExtra] = React.useState([{
        id: "1",
        name: "string"
    },
    {
        id: "2",
        name: "string"
    },
    {
        id: "3",
        name: "string"
    }])


    const _addNewItems = React.useCallback(() => {
        const randxId = Math.floor(Math.random() * 2);

        setData([{ ...extra[randxId], id: Date.now().toString() },
        ...data
        ])
    }, [data]);

    const _deleteItems = React.useCallback(() => {
        setData([...data.slice(1)]);
    }, [data]);

    return (
        <View style={{ flex: 1 }}>
            <Button marginY={1} onPress={_addNewItems}>Add</Button>
            <Button onPress={_deleteItems}>Delete</Button>
            <ScrollView style={{flexGrow:1}}>
                <>
                    {
                        data.map(uniqueName => (
                            <Animated.View
                                layout={Layout.stiffness(100)}
                                entering={RollInLeft}
                                exiting={RollOutRight}
                                key={uniqueName.id}
                                style={{
                                    marginHorizontal: 20,
                                    backgroundColor: "#ffffff",
                                    elevation: 5,
                                    marginVertical: 10,
                                    padding: 20,
                                    height: "25%"
                                }}>

                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: "bold",
                                    color: "#000",
                                    textAlign: "center",
                                }}>
                                    {
                                        uniqueName.name
                                    }
                                </Text>

                            </Animated.View>
                        ))
                    }
                </>
            </ScrollView>
        </View>
    )
}

export default DemoReanimated

const styles = StyleSheet.create({})