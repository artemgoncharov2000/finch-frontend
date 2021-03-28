import React, { FC, useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, Modal, Button, Platform, ScrollView } from 'react-native';
import InputField from '../../../components/input_fields/InputField';
import * as ImagePicker from 'expo-image-picker'
import AddContentButton from '../../../components/buttons/AddContentButton';
import { connect } from 'react-redux';
import { BASE_URL } from '../../../api/baseURL';
import {Card, ContentItem} from '../../../interfaces/Card';
import { uploadImage } from '../../../api/images/imageRequests';
import AddImageButtonLarge from '../../../components/buttons/AddImageButtonLarge';



const CreateCardScreen = (props) => {

    const [previewImageUri, setPreviewImageUri] = useState(null)
    const [token, setToken] = useState('')
    const addNewCard = props.route.params.onAddCardHandle;
    const [card, setCard] = useState<Card>({
        content: [],
        guideId: '',
        location: '',
        thumbnailUrl: '',
        title: ''
    })

    useEffect(()=> {
        console.log('route', props.route)
    },[])


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
            content: prevState.content.concat([{type: 'text', value: 'ex. The story begins with...'}])
        }));
    }

    const onAddImageButtonPress = () => {
        pickImage()
        .then(uri => {
            uploadImage(props.userToken, uri)
            .then(id => {
                setCard(prevState => ({
                    ...prevState,
                    content: prevState.content.concat([{type: "image", value: id}])
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
        copy[index] = {type: 'text', value: text};
        setCard(prevState => ({
            ...prevState,
            content: copy
        }))
    }

    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <Button
                    onPress={()=>{
                        addNewCard(card);
                        props.navigation.goBack();
                    }}
                    title="Add"
                />
            ),
        });
    }, [props.navigation, card]);

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={{ fontWeight: "600" }}>Name your card</Text>
                <InputField placeholder="Card name" value={props.card.title} fontWeight="600" fontSize={20} onChangeText={onChangeTitle} />
                <Text style={{ fontWeight: "600" }}>Location</Text>
                <InputField placeholder="ex. The Eiffel Tower" value={props.card.location}  fontWeight="400" fontSize={14} onChangeText={onChangeLocation} />
                <Text style={{ fontWeight: "600" }}>Add a picture to your card</Text>
                {
                    card.thumbnailUrl
                        ?
                        <Image source={{ uri: BASE_URL + '/i/' + card.thumbnailUrl }} style={{ width: 415, height: 256 }} />
                        :
                        <AddImageButtonLarge onPress={onPreviewImageButtonPress} />
                }
                <Text style={{ fontWeight: "600" }}>Tell us more about your experience</Text>
                {card.content.map((item: ContentItem, index: number) => (
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
                        <Image key={index} source={{ uri: BASE_URL + '/i/' + item.value }} style={{ width: 374, height: 180 }} />
                ))
                }
                <View
                    style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 50, paddingVertical: 20 }}
                >
                    <AddContentButton type="text" onPress={onAddTextButtonPress} />
                    <AddContentButton type="image" onPress={onAddImageButtonPress}/>
                </View>
            </ScrollView>

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
    container: {
        flex: 1,
        justifyContent: "flex-start",
        padding: 20
    }
})