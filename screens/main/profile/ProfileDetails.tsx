import React, { FC, useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, Modal, Button, Platform } from 'react-native';
import InputField from '../../../components/input_fields/InputField';
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'
import DateTimePicker from '@react-native-community/datetimepicker';
import AddImageButtonLarge from '../../../components/buttons/AddImageButtonLarge';
import { ScrollView } from 'react-native-gesture-handler';
import { setUserDescription, setUserEmail, setUserPhone, setUserTitle, setUserProfileUrl } from '../../../actions/userActions';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../../../api/baseURL';
import User from '../../../interfaces/User';


interface Props {
    user: User,
    navigation: any,
    setUserDescription: (value: string) => void,
    setUserEmail: (value: string) => void,
    setUserPhone: (value: string) => void,
    setUserTitle: (value: string) => void,
    setUserProfileUrl: (value: string) => void
}

const ProfileDetails = (props: Props) => {
    console.log(props.user.profilePhotoUrl);
    const [user, setUser] = useState({
        profilePhotoUrl: props.user.profilePhotoUrl,
        email: props.user.profilePhotoUrl,
        phone: props.user.phone,
        title: props.user.title,
        description: props.user.description
    })
    
    const getTokenFromStorage = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            
            return token;
        } catch (error) {
            console.log(error)
        }
    }

    


    const onChangeEmail = (value: string) => {
        setUser(prevState => ({
            ...prevState,
            email: value
        }));
    }

    const onChangePhone = (value: string) => {
        setUser(prevState => ({
            ...prevState,
            phone: value
        }));
    }

    const onChangeTitle = (value: string) => {
        setUser(prevState => ({
            ...prevState,
            title: value
        }));
    }

    const onChangeDescription = (value: string) => {
        setUser(prevState => ({
            ...prevState,
            description: value
        }))
    }

    const onChangeProfilePhotoButtonPress = () => {
        pickImage()
            .then(uri => {
                uploadImage(uri);
                setUser(prevState => ({
                    ...prevState,
                    profilePhotoUrl: uri
                }))
            })
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3, 2],
            quality: 1,
        });
        // if (!result.cancelled) {
        // }
        return result.uri;
    };

    const uploadImage = async (uri: string) => {
        const formData = new FormData()
        formData.append('file', {
            //@ts-ignore
            uri: Platform.OS === "android" ? uri : uri.replace('file://', ''),
            type: 'image/jpg',
            name: 'imagename.jpg'
        })
        console.log('token: ', props.token)

        await axios({
            method: 'POST',
            url: BASE_URL + '/i/upload',
            headers: {
                authorization: props.token,
                'Content-type': 'multipart/form-data'
            },
            data: formData
        })
        .then(response => {
            const id = response.data.id
            console.log('url', BASE_URL + '/i/' + id)
            setUser(prevState => ({
                ...prevState,
                profilePhotoUrl: id
            }))
        })
        .catch(error => {console.error(error)});
    }

    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <Button
                    onPress={updateProfile}
                    title="Save"
                />
            ),
        });
    }, [props.navigation, user]);

    const updateProfile = async () => {
        
        console.log('user imageUri', user.profilePhotoUrl)

        await axios({
            method: 'PUT',
            url: BASE_URL + '/users/me',
            headers: {
                authorization: props.token
            },
            data: {
                description: user.description,
                phone: user.phone,
                email: user.email,
                title: user.title,
                profilePhotoUrl: user.profilePhotoUrl
            }
        })
            .then(response => {
                console.log(response.data)
                if (response.data === 'Success') {
                    props.setUserProfileUrl(user.profilePhotoUrl)
                    props.setUserDescription(user.description);
                    props.setUserEmail(user.email);
                    props.setUserPhone(user.phone);
                    props.setUserTitle(user.title);
                    alert('Your profile updated!')
                }
            })
            .catch(error => console.error(error));

    }

    return (
        <View style={styles.container}>
            <ScrollView style={{ paddingVertical: 20 }}>
                <View style={{ alignItems: "center", }}>
                    <Image source={{ uri:  BASE_URL + '/i/' + user.profilePhotoUrl }} style={{ width: 128, height: 128, borderRadius: 90 }} />
                    <Button title="Change photo" onPress={onChangeProfilePhotoButtonPress} />
                </View>
                <Text style={{ fontWeight: "600", fontSize: 17 }}>Username</Text>
                <InputField value={props.user.username} editable={false} onChangeText={() => { }} />
                <Text style={{ fontWeight: "600", fontSize: 17 }}>Email</Text>
                <InputField value={user.email} onChangeText={text => onChangeEmail(text)} />
                <Text style={{ fontWeight: "600", fontSize: 17 }}>Phone</Text>
                <InputField value={user.phone} onChangeText={text => onChangePhone(text)} />
                <Text style={{ fontWeight: "600", fontSize: 17 }}>Title</Text>
                <InputField value={user.title} onChangeText={text => onChangeTitle(text)} />
                <Text style={{ fontWeight: "600", fontSize: 17 }}>Description</Text>
                <InputField value={user.description} onChangeText={text => onChangeDescription(text)} />
            </ScrollView>
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
        token: state.tokenReducer.token
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setUserProfileUrl: (val) => dispatch(setUserProfileUrl(val)),
        setUserDescription: (val) => dispatch(setUserDescription(val)),
        setUserEmail: (val) => dispatch(setUserEmail(val)),
        setUserPhone: (val) => dispatch(setUserPhone(val)),
        setUserTitle: (val) => dispatch(setUserTitle(val)),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetails)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        paddingHorizontal: 20
    }

})
