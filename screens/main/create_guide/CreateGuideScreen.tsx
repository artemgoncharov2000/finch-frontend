import React, { FC, useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, Modal, Button, Platform } from 'react-native';
import InputField from '../../../components/input_fields/InputField';
import * as ImagePicker from 'expo-image-picker'
import DateTimePicker from '@react-native-community/datetimepicker';
import AddImageButtonLarge from '../../../components/buttons/AddImageButtonLarge';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { setGuide, setGuideId } from '../../../redux/actions/guideActions'
import { BASE_URL } from '../../../api/baseURL';
import Guide from '../../../interfaces/Guide';
import { createGuide, updateGuide } from '../../../api/guide/guideRequests';
import { uploadImage } from '../../../api/images/imageRequests';
import LocalStorage from '../../../local_storage/LocalStorage';
import { Card } from '../../../interfaces/Card';
import { createCard } from '../../../api/card/cardRequests';

interface Props {
    navigation: any,
}

const CreateGuideScreen = (props: Props) => {

    const [date, setDate] = useState(new Date(1598051730000));
    const [show, setShow] = useState(false);

    const [guide, setGuide] = useState({
        title: '',
        description: '',
        travelDate: '',
        thumbnailUrl: '',
        id: '',
        location: ''
    })

    const [cards, setCards] = useState<Card[]>([]);

    useEffect(() => {
        getAccessToDeviceLibrary();
        getAccessToCamera();
    }, []);
    
    const getAccessToDeviceLibrary = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    const getAccessToCamera = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    const onChangeTitle = (text: string) => {
        setGuide(prevState => ({
            ...prevState,
            title: text
        }));
    }

    const onChangeDescription = (text: string) => {
        setGuide(prevState => ({
            ...prevState,
            description: text
        }))
        console.log(guide.description);
    }

    const onChangeDate = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        setGuide(prevState => ({
            ...prevState,
            travelDate: currentDate.toString()
        }))

    };

    const onChangeLocation = (text: string) => {
        setGuide(prevState => ({
            ...prevState,
            location: text
        }))
    }

    const onImagePickerButtonPress = () => {
        pickImage()
            .then(uri => {
                uploadImage(props.userToken, uri)
                    .then(id => {
                        setGuide(prevState => ({
                            ...prevState,
                            thumbnailUrl: id
                        }))
                    });
            })
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            aspect: [16, 9],
            quality: 1,
        });
        return result.uri;
    };

    const onAddCardHandle = (card: Card) => {
        setCards(cards.concat([card]));
    }
    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <Button
                    onPress={() => {

                        createGuide(props.userToken, guide)
                            .then(guideId => {
                                console.log('guideId', guideId);

                                if(cards){
                                    cards.map((card, index) => {
                                        createCard(props.userToken, guideId, card);
                                    })
                                }

                                props.navigation.goBack();
                            })
                            .catch(error => console.log(error))
                        // .then(guideId => {
                        //     if (guideId) {
                        //         updateGuide(token, guideId, guide);
                        //     } else {
                        //         alert('something goes wrong!');
                        //     }
                        // })
                    }}
                    title="Create"
                />
            ),
        });
    }, [props.navigation, guide, cards]);

    return (
        <View style={styles.container}>
            {/* <ScrollView keyboardDismissMode='interactive'> */}
            <View style={styles.imageContainer}>
                {
                    guide.thumbnailUrl
                        ?
                        <Image source={{ uri: BASE_URL + '/i/' + guide.thumbnailUrl }} style={{ width: 415, height: 256 }} />
                        :
                        <AddImageButtonLarge onPress={onImagePickerButtonPress} />
                }
            </View>
            <View style={styles.body}>
                <Text style={{ fontWeight: "600" }}>Name your guide</Text>
                <InputField placeholder="Guide name" value={guide.title} onChangeText={onChangeTitle} />
                <Text style={{ fontWeight: "600" }}>Describe your experience</Text>
                <InputField placeholder="Guide name" value={guide.description} onChangeText={onChangeDescription} numberOfLines={5} multiline={true} />
                <Text style={{ fontWeight: "600" }}>When it was?</Text>
                <View style={{ paddingVertical: 10 }}>
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={onChangeDate}
                    />
                </View>
                <Text style={{ fontWeight: "600" }}>Where it was?</Text>
                <InputField placeholder="It was in..." value={guide.location} onChangeText={onChangeLocation} />
                <Text style={{ fontWeight: "600" }}>Add some cards</Text>
                <FlatList 
                    data={cards}
                    renderItem={({item, index}) => {
                        return (
                            <View>
                                <Text>{item.title}</Text>
                            </View>
                        )
                    }}
                />
                <Button title='Add card' onPress={() => { props.navigation.navigate('NewCard', {onAddCardHandle: onAddCardHandle})}}></Button>
            </View>

            {/* </ScrollView> */}

        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        userToken: state.tokenReducer.userToken
    }
}

const mapDispatchToProps = (dispatch: (arg0: { type: string; payload: string | Guide; }) => any) => {
    return {
        setGuide: (guide: Guide) => dispatch(setGuide(guide)),
        setGuideId: (guideId: string) => dispatch(setGuideId(guideId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGuideScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",

    },
    imageContainer: {

    },
    body: {
        paddingTop: 20,
        paddingHorizontal: 20
    }
})