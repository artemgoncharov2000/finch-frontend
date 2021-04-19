import React, { FC, useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, Modal, Button, Platform, ScrollView, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native';
import InputField from '../../../components/input_fields/InputField';
import * as ImagePicker from 'expo-image-picker'
import AddContentButton from '../../../components/buttons/AddContentButton';
import { connect } from 'react-redux';
import { BASE_URL } from '../../../api/baseURL';
import { Card, ContentItem } from '../../../interfaces/Card';
import { uploadImage } from '../../../api/images/imageRequests';
import AddImageButtonLarge from '../../../components/buttons/AddImageButtonLarge';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AutoHeightImage from 'react-native-auto-height-image';
import { FlatList } from 'react-native-gesture-handler';



const CreateCardScreen = (props) => {

    const insets = useSafeAreaInsets();
    const [card, setCard] = useState<Card>({
        content: [],
        guideId: '',
        location: '',
        thumbnailUrl: '',
        title: ''
    })

    const onChangeTitle = (text: string) => {
        setCard(prevState => ({
            ...prevState,
            title: text
        }))
    }

    const onChangeLocation = (text: string) => {
        setCard(prevState => ({
            ...prevState,
            location: text
        }))
    }

    const onAddTextButtonPress = () => {
        setCard(prevState => ({
            ...prevState,
            content: prevState.content.concat([{ type: 'text', value: 'ex. The story begins with...' }])
        }));
    }

    const onAddImageButtonPress = () => {
        pickImage()
            .then(uri => {
                uploadImage(props.userToken, uri)
                    .then(id => {
                        setCard(prevState => ({
                            ...prevState,
                            content: prevState.content.concat([{ type: "image", value: id }])
                        }))
                    })

            })
    }

    const onPreviewImageButtonPress = () => {
        pickImage()
            .then(uri => {
                uploadImage(props.userToken, uri)
                    .then(id => {
                        console.log("imageId", id)
                        setCard(prevState => ({
                            ...prevState,
                            thumbnailUrl: id
                        }));
                    });
            })
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 1,
        });
        return result.uri;
    };

    const onChangeContentItem = (text: string, index: number) => {
        const copy = [...card.content];
        copy[index] = { type: 'text', value: text };
        setCard(prevState => ({
            ...prevState,
            content: copy
        }))
    }

    const onBackButtonPress = () => {
        props.navigation.goBack();
    }

    const onAddButtonPress = () => {
        const addNewCard = props.route.params.onAddCardHandle;
        addNewCard(card);
        props.navigation.goBack();
    }

    return (
        <View style={{
            paddingTop: insets.top,
            flex: 1,
            justifyContent: "flex-start",
            backgroundColor: "#fff"
        }}>
            <View style={styles.header}>
                <Button title={'Back'} onPress={() => onBackButtonPress()} />
                <Text style={styles.headerTitle}>New Card</Text>
                <Button title={'Add'} onPress={() => onAddButtonPress()} />
            </View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.body}>
                    <FlatList
                        showsVerticalScrollIndicator={false}

                        ListHeaderComponent={
                            <>
                                <Text style={{ fontWeight: "600" }}>Name your card</Text>
                                <InputField placeholder="Card name" value={props.card.title} fontWeight="600" fontSize={20} onChangeText={onChangeTitle} />
                                <Text style={{ fontWeight: "600" }}>Location</Text>
                                <InputField placeholder="ex. The Eiffel Tower" value={props.card.location} fontWeight="400" fontSize={14} onChangeText={onChangeLocation} />
                                <Text style={{ fontWeight: "600", paddingBottom: 10 }}>Add a picture to your card</Text>
                                {
                                    card.thumbnailUrl
                                        ?
                                        <AutoHeightImage
                                            source={{ uri: BASE_URL + '/i/' + card.thumbnailUrl }}
                                            width={Dimensions.get('window').width - 30}
                                        />
                                        :
                                        <AddImageButtonLarge onPress={onPreviewImageButtonPress} />
                                }
                                <Text style={{ fontWeight: "600", paddingTop: 10 }}>Tell us more about your experience</Text>
                            </>
                        }

                        data={card.content}
                        renderItem={({ item, index }) => (
                            item.type == 'text'
                                ?
                                <InputField
                                    key={index}
                                    placeholder={item.value}
                                    multiline={true}
                                    fontWeight="400"
                                    fontSize={14}
                                    onChangeText={(text) => onChangeContentItem(text, index)}
                                />
                                :
                                <AutoHeightImage
                                    key={index} source={{ uri: BASE_URL + '/i/' + item.value }}
                                    width={Dimensions.get('window').width - 30}
                                    style={{ paddingTop: 10 }}
                                />
                        )}
                        keyExtractor={(item, index) => index.toString()}

                        ListFooterComponent={
                            <>
                                <View
                                    style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 50, paddingVertical: 20 }}
                                >
                                    <AddContentButton type="text" onPress={onAddTextButtonPress} />
                                    <AddContentButton type="image" onPress={onAddImageButtonPress} />
                                </View>
                            </>
                        }
                    />
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        card: state.cardReducer.card,
        guideId: state.guideReducer.guide.id.id,
        userToken: state.tokenReducer.userToken
    }
}

export default connect(mapStateToProps, null)(CreateCardScreen)

const styles = StyleSheet.create({
    header: {
        flex: 1,
        paddingHorizontal: 7,
        borderBottomColor: "#A8B0BA",
        borderBottomWidth: 0.5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerTitle: {
        fontSize: 17,
        fontWeight: '600'
    },
    body: {
        paddingTop: 20,
        flex: 19,
        paddingHorizontal: 15
    },
})