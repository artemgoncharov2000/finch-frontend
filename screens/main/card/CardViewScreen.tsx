import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, Button, Dimensions } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BASE_URL } from '../../../api/baseURL';
//@ts-ignore
import BackButtonIcon from '../../../assets/icons/back-button-icon.svg';
import BackButton from '../../../components/buttons/BackButton';

const CardViewScreen = (props) => {
    const [content, setContent] = useState([])
    const [title, setTitle] = useState('');
    const insets = useSafeAreaInsets();



    useEffect(() => {

        const content = props.props.route.params.content;
        const title = props.props.route.params.title;

        setContent(content);
        setTitle(title);

    }, [])

    return (
        <View style={{
            flex: 1,
            paddingTop: insets.top,
            backgroundColor: '#fff'
        }}>
            <View style={styles.header}>
                <BackButton navigation={props.props.navigation} color="#000" />
                <Text style={styles.headerTitle}>{title}</Text>
            </View>
            <View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={content}
                    renderItem={({ item, index }) => {
                        if (item.type === 'text')
                            return (
                                <View key={index} style={styles.textItemContainer}>
                                    <Text style={styles.textItem}>{item.value}</Text>
                                </View>
                            )
                        else
                            return (
                                <View key={index} style={styles.imageItemContainer}>
                                    <AutoHeightImage

                                        source={{ uri: BASE_URL + '/i/' + item.value }}
                                        width={Dimensions.get('window').width - 20}
                                    />
                                </View>
                            )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />
                
            </View>
        </View>
    )
}

export default CardViewScreen;

const styles = StyleSheet.create({
    header: {
        // backgroundColor: 'red',
        alignItems: 'center',

        paddingVertical: 5,
        paddingHorizontal: 5,
        flexDirection: 'row'
        
    },
    headerTitle: {
        paddingHorizontal: 5,
        fontSize: 30,
        fontWeight: '700',
        
    },
    textItemContainer: {
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    textItem: {
        fontSize: 18
    },
    imageItemContainer: {
        paddingBottom: 10,
        paddingHorizontal: 10,
    },
})