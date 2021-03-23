import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BASE_URL } from '../../../api/baseURL';

const CardViewScreen = (props) => {
    const [content, setContent] = useState([])
    const insets = useSafeAreaInsets();

    useEffect(() => {
        const data = props.props.route.params.content;

        setContent(JSON.parse(data));
        console.log('content', content);
    }, [])

    return (
        <View style={{
            flex: 1,
            paddingTop: insets.top,
            backgroundColor: '#fff'
        }}>
            <ScrollView>
                {
                    content.map((item, index) => {
                        if (item.type === 'text')
                            return (
                                <View style={styles.textItemContainer}>
                                    <Text style={styles.textItem}>{item.value}</Text>
                                </View>
                            )
                        else
                            return (
                                <View style={styles.imageItemContainer}>
                                    <Image style={styles.imageItem} source={{ uri: BASE_URL + '/i/' + item.value }} />
                                </View>
                            )
                    })
                }
            </ScrollView>
        </View>
    )
}

export default CardViewScreen;

const styles = StyleSheet.create({
    textItemContainer: {
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    textItem: {
        fontSize: 17
    },
    imageItemContainer: {
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    imageItem: {

        height: 180,
        width: 395
    }
})