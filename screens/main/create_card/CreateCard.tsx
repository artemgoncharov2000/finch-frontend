import React, { FC, useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, Modal, Button, Platform, ScrollView } from 'react-native';
import InputField from '../../../components/input_fields/InputField';
import * as ImagePicker from 'expo-image-picker'
import AddContentButton from '../../../components/buttons/AddContentButton';
import AddImageButtonMiddle from '../../../components/buttons/AddImageButtonMiddle';
import { setCard, getCard } from '../../../actions/card';
import { connect } from 'react-redux';
import axios from 'axios';
import { AsyncStorage } from 'react-native';


const CreateCard = (props) => {


    const [image, setImage] = useState(null);
    const [previewImageUri, setPreviewImageUri] = useState(null)
    const [content, setContent] = useState([])
    const [card, setCard] = useState(props.card)
    const [token, setToken] = useState('')

    const getTokenFromStorage = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            return token;
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=> {
        getTokenFromStorage()
        .then(t => setToken(t));
        setCard({
            ...card,
            guideId: {id: props.guideId}
        });
        props.setCard(card)
    },[])


    const onChangeTitle = (text: string) => {
        setCard({
            ...card,
            title: text
        });

        props.setCard(card);
        console.log('card', card)
    }

    const onChangeLocation = (text: string) => {
        setCard({
            ...card,
            location: text
        });
        props.setCard(card);
        console.log('props.card', props.card)
    }

    const onAddTextButtonPress = () => {
        const copy = [...content]
        const item = {
            type: 'text',
            text: 'ex. The story begins with...',
        }
        copy.push(item)
        setContent([...copy])
        console.log('content: ', JSON.stringify(content))
    }

    const onAddImageButtonPress = () => {
        let promise = new Promise((resolve, reject) => {
            pickImage()
            image ? resolve(image) : reject()
        })
        promise.then((image) => {
            uploadImage(image, 'content')
        })

    }
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3, 2],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri)
        }
    };

    const uploadImage = async (uri: string, type: string) => {
        
        const formData = new FormData()
                    formData.append('file', { 
                      uri: Platform.OS === "android" ? uri : uri.replace('file://', ''), 
                      type: 'image/jpg', 
                      name: 'imagename.jpg'
                    })
        axios({
            method: 'POST',
            url: 'http://192.168.1.70:8080/i/upload',
            headers: {
                authorization: token,
                'Content-type': 'multipart/form-data'
            },
            data: formData
        })
        .then(response => {
            const imageId = response.data.id;
            if (type === 'preview') {
                setCard({
                    ...card,
                    thumbnailUrl: imageId
                })
                console.log(card)
                props.setCard(card)
            } else if (type === 'content') {
                const copy = [...content];
                const item = {
                    type: 'image',
                    uri: image,
                    id: imageId
                }
                copy.push(item)
                setContent([...copy])
                setCard({
                    ...card,
                    content: JSON.stringify(content)
                })
                props.setCard(card)

            }
        })
        .catch((error)=>console.log(error))
        
    }

    const pickPreviewImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3, 2],
            quality: 1,
        });

        if (!result.cancelled) {
            console.log('uri', result.uri);
            try {
                uploadImage(result.uri, 'preview')
            } catch(err) {
                console.log(err)
            }
            setPreviewImageUri(result.uri);
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={{ fontWeight: "600" }}>Name your card</Text>
                <InputField placeholder="Card name" value={card.title} fontWeight="600" fontSize={20} onChangeText={onChangeTitle} />
                <Text style={{ fontWeight: "600" }}>Location</Text>
                <InputField placeholder="ex. The Eiffel Tower" value={card.location}  fontWeight="400" fontSize={14} onChangeText={onChangeLocation} />
                <Text style={{ fontWeight: "600" }}>Add a picture to your card</Text>
                {
                    previewImageUri
                        ?
                        <Image source={{ uri: previewImageUri }} style={{ width: 374, height: 90, borderRadius: 10 }} />
                        :
                        <AddImageButtonMiddle onPress={pickPreviewImage} />
                }

                <Text style={{ fontWeight: "600" }}>Tell us more about your experience</Text>
                {content.map((item, key) => (
                    item.type == 'text'
                        ?
                        <InputField
                            key={key}
                            placeholder={item.text}
                            multiline={true}
                            fontWeight="400"
                            fontSize={14}
                            onChangeText={() => { }}
                        />
                        :
                        <Image key={key} source={{ uri: item.uri }} style={{ width: 374, height: 180 }} />
                ))
                }
                <View
                    style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 50, paddingVertical: 20 }}
                >
                    <AddContentButton type="text" onPress={onAddTextButtonPress} />
                    <AddContentButton type="image" onPress={onAddImageButtonPress}

                    />
                </View>
            </ScrollView>

        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        card: state.cardReducer.card,
        guideId: state.guideReducer.guide.id.id
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCard: (card) => dispatch(setCard(card)),
        getCard: () => dispatch(getCard())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCard) 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        padding: 20
    }
})