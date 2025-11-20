import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SafeAreaView from '../components/SafeAreaView'
import Card from '../components/cardComp/Card'
import CardTitle from '../components/cardComp/CardTitle'
import CardContent from '../components/cardComp/CardContent'
import CardFooter from '../components/cardComp/CardFooter'
import Ionicons from 'react-native-vector-icons/Ionicons'
import s from '../styles'

const AccordionScreen = (props) => {
    const { navigation } = props;

    return (
        <SafeAreaView style={[s.container, s.bgWhite]}>

            <View style={[s.row, s.p10, s.mb20, s.alignCenter]}>
                <Pressable style={[s.mr10, s.btnCircle, s.btnLight]} onPress={() => navigation.goBack()}>
                    <Ionicons size={25} name="arrow-back" />
                </Pressable>
                <Text style={[s.textXxl, s.fw6]}>Sample Accordion</Text>
            </View>

            <Card accordion={true} open={false}>
                <CardTitle title="Accordion Card 1" />
                <CardContent>
                    <View style={[]}>
                        <Text>Content Card 1</Text>
                    </View>
                </CardContent>
                <CardFooter>
                    <Text style={[s.fs12, s.italic]}>Footer pertama</Text>
                </CardFooter>
            </Card>

            <Card accordion={true} open={false}>
                <CardTitle title="Accordion Card 2" />
                <CardContent>
                    <View style={[]}>
                        <Text>Content Card 1</Text>
                        <Text>Content Card 2</Text>
                    </View>
                </CardContent>
                <CardFooter>
                    <Text style={[s.fs12, s.italic]}>Footer kedua</Text>
                </CardFooter>
            </Card>

            <Card accordion={true} open={false}>
                <CardTitle title="Accordion Card 3" />
                <CardContent>
                    <View style={[]}>
                        <Text>Content Card 1</Text>
                        <Text>Content Card 2</Text>
                        <Text>Content Card 3</Text>
                    </View>
                </CardContent>
                <CardFooter>
                    <Text style={[s.fs12, s.italic]}>Footer ketiga</Text>
                </CardFooter>
            </Card>

            <Card accordion={true} open={false} /* onContentHeightChange={forceUpdate} (removed as it's not needed here) */>
                <CardTitle title="Accordion Card 4" />
                <CardContent>
                    <View style={[]}>
                        <Text>Content Card 1</Text>
                        <Text>Content Card 2</Text>
                        <Text>Content Card 3</Text>

                        <Card accordion={true} open={false} style={[s.m0]}>
                            <CardTitle title="Sub Accordion" />
                            <CardContent >
                                <View style={[]}>
                                    <Text>Content Card 1</Text>
                                    <Text>Content Card 2</Text>
                                    <Text>Content Card 3</Text>
                                </View>
                            </CardContent>
                        </Card>
                    </View>
                </CardContent>
            </Card>

        </SafeAreaView>
    )
}

export default AccordionScreen

const styles = StyleSheet.create({})