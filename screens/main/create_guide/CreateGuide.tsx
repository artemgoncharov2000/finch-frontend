import React, { FC, useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, Modal, Button, Platform } from 'react-native';
import InputField from '../../../components/input_fields/InputField';
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'
import DateTimePicker from '@react-native-community/datetimepicker';
import AddImageButtonLarge from '../../../components/buttons/AddImageButtonLarge';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { connect } from 'react-redux';
import { setGuide, setGuideId } from '../../../actions/guideActions'
import { AsyncStorage } from 'react-native';
import { BASE_URL } from '../../../api/baseURL';
import Guide from '../../../interfaces/Guide';

interface Props {
    guide: Guide,
    setGuide: (guide: Guide) => void
}

const CreateGuide = (props: Props) => {

    const [image, setImage] = useState(null);
    const [date, setDate] = useState(new Date(1598051730000));
    const [show, setShow] = useState(false);
    const [token, setToken] = useState('');
    useEffect(() => {

        getAccessToDeviceLibrary();
        getTokenFromStorage()
            .then(token => {
                getServerGuideId(token);
                setToken(token)
            })
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

    const getTokenFromStorage = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            return token;
        } catch (error) {
            console.error(error)
        }
    }

    const getServerGuideId = async (token: string) => {
        await axios({
            method: 'POST',
            url: BASE_URL + '/guides',
            headers: {
                authorization: token
            },
            data: {}
        }).then(response => {
            props.setGuide({
                ...props.guide,
                id: { id: response.data.id }
            });
        })
    }

    const onChangeTitle = (text: string) => {
        props.setGuide({
            ...props.guide,
            title: text
        })
    }

    const onChangeDescription = (text: string) => {
        props.setGuide({
            ...props.guide,
            description: text
        })
    }

    const onChangeDate = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        props.setGuide({
            ...props.guide,
            travelDate: currentDate.toString()
        })
    };

    const onChangeLocation = (text: string) => {
        props.setGuide({
            ...props.guide,
            location: text
        })
    }

    const uploadImage = async (uri: string) => {
        const formData = new FormData()
        formData.append('file', {
            // @ts-ignore
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
        }).then(response => {
            props.setGuide({
                ...props.guide,
                thumbnailUrl: response.data.id
            })
        })
    }

    const onImagePickerButtonPress = () => {
        pickImage()
            .then(uri => {
                uploadImage(uri);
                setImage(uri);
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

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.imageContainer}>
                    {
                        image
                            ?
                            <Image source={{ uri: image }} style={{ width: 415, height: 256}} />
                            :
                            <AddImageButtonLarge onPress={onImagePickerButtonPress} />
                    }
                </View>
                <View style={styles.body}>
                    <Text style={{ fontWeight: "600" }}>Name your guide</Text>
                    <InputField placeholder="Guide name" value={props.guide.title} onChangeText={onChangeTitle} />
                    <Text style={{ fontWeight: "600" }}>Describe your experience</Text>
                    <InputField placeholder="Guide name" value={props.guide.description} onChangeText={onChangeDescription} numberOfLines={5} multiline={true} />
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
                    <InputField placeholder="It was in..." value={props.guide.location} onChangeText={onChangeLocation} />
                    <Text style={{ fontWeight: "600" }}>Add some cards</Text>
                    <Button title='Add card' onPress={() => { props.navigation.navigate('NewCard') }}></Button>
                </View>

            </ScrollView>

        </View>
    )
}

const mapStateToProps = (state: { guideReducer: { guide: { id: { id: any; }; }; }; }) => {
    return {
        guide: state.guideReducer.guide,
        guideId: state.guideReducer.guide.id.id
    }
}

const mapDispatchToProps = (dispatch: (arg0: { type: string; payload: string | Guide; }) => any) => {
    return {
        setGuide: (guide: Guide) => dispatch(setGuide(guide)),
        setGuideId: (guideId: string) => dispatch(setGuideId(guideId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGuide);

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
