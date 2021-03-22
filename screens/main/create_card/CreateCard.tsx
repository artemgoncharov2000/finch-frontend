import React, { FC, useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, Modal, Button, Platform, ScrollView } from 'react-native';
import InputField from '../../../components/input_fields/InputField';
import * as ImagePicker from 'expo-image-picker'
import AddContentButton from '../../../components/buttons/AddContentButton';
import AddImageButtonMiddle from '../../../components/buttons/AddImageButtonMiddle';
import { setCard, getCard } from '../../../redux/actions/cardActions';
import { connect } from 'react-redux';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { BASE_URL } from '../../../api/baseURL';
import { createCard } from '../../../api/card/cardRequests';
import {Card, ContentItem} from '../../../interfaces/Card';



const CreateCard = (props) => {

    const [image, setImage] = useState(null);
    const [previewImageUri, setPreviewImageUri] = useState(null)
    const [token, setToken] = useState('')
    const [card, setCard] = useState<Card>({
        content: [],
        guideId: {id: ''},
        location: '',
        tags: [],
        thumbnailUrl: '',
        title: ''
    })

    const getTokenFromStorage = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            return token;
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(()=> {
        getTokenFromStorage()
        .then(t => setToken(t));
        props.setCard({
            ...props.card,
            guideId: {id: props.guideId}
        })
    },[])


    const onChangeTitle = (text: string) => {
        // props.setCard({
        //     ...props.card,
        //     title: text
        // });
        setCard(prevState => ({
            ...prevState,
            title: text
        }))
    }

    const onChangeLocation = (text: string) => {
        // props.setCard({
        //     ...props.card,
        //     location: text
        // });
        setCard(prevState => ({
            ...prevState,
            location: text
        }))
    }

    const onAddTextButtonPress = () => {
        const item: ContentItem = {
            type: 'text',
            value: 'ex. The story begins with...',
        }
        // props.setCard({
        //     ...props.card,
        //     content: content
        // })
        setCard(prevState => ({
            ...prevState,
            content: prevState.content.concat([item])
        }))
    }

    const onAddImageButtonPress = () => {
        pickImage()
        .then(uri => {
            uploadImage(uri, 'content')
            setImage(uri)
        })

    }
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });
        // if (!result.cancelled) {
        // }
        return result.uri;
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
            url: BASE_URL + '/i/upload',
            headers: {
                authorization: token,
                'Content-type': 'multipart/form-data'
            },
            data: formData
        })
        .then(response => {
            if (type === 'preview') {
                props.setCard({
                    ...props.card,
                    thumbnailUrl: response.data.id
                })
            } else if (type === 'content') {
                const content = [...props.card.content];
                const item = {
                    type: 'image',
                    uri: image,
                    id: imageId
                }
                content.push(item)
                props.setCard({
                    ...props.card,
                    content: content
                })
            }
        })
        .catch((error)=>console.error(error))
        
    }

    const pickPreviewImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3, 2],
            quality: 1,
        });

        if (!result.cancelled) {
            
            uploadImage(result.uri, 'preview')
            setPreviewImageUri(result.uri);
        }
    }

    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <Button
                    onPress={()=>{
                        getTokenFromStorage()
                        .then(token => {
                            //updateGuide(token, props.guide);
                            createCard(token, props.card)
                        })
                    }}
                    title="Add"
                />
            ),
        });
    }, [props.navigation]);

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
                        <Image source={{ uri: BASE_URL + '/i/' + card.thumbnailUrl }} style={{ width: 374, height: 90, borderRadius: 10 }} />
                        :
                        <AddImageButtonMiddle onPress={pickPreviewImage} />
                }

                <Text style={{ fontWeight: "600" }}>Tell us more about your experience</Text>
                {props.card.content.map((item, key) => (
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
                    <AddContentButton type="image" onPress={onAddImageButtonPress}/>
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