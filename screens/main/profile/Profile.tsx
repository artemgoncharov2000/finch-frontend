import { setStatusBarBackgroundColor } from 'expo-status-bar';
import React, {useEffect, useState} from 'react'
import {StyleSheet, Text, View, Image, Button } from 'react-native';
import ChangeProfileButton from '../../../components/buttons/ChangeProfileButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AsyncStorage } from 'react-native';
import axios from 'axios';



const Profile = (props) => {
    const insets = useSafeAreaInsets();
    const [token, setToken] = useState('')
    const [profileData, setProfileData] = useState({
        username: "", 
        email: "", 
        phone: "", 
        title: "", 
        description: "",
        profilePhotoUrl: ""
        
    })
    const getTokenFromStorage = async () => {
        try {
            setToken(await AsyncStorage.getItem('token'))
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTokenFromStorage()
        getProfileData()
    })

    const getProfileData = () => {
        axios({
            method: "get",
            url: "http://192.168.1.70:8080/users/me",
            headers: {
                authorization: token
            }
        }).then(response => {
            const data = response.data
            console.log(data)
            setProfileData({
                username: data.username, 
                email: data.email, 
                phone: data.phone, 
                title: data.title, 
                description: data.description,
                profilePhotoUrl: data.profilePhotoUrl
            })
        })
    }

    return (
        <View style={{
                flex: 1,
                paddingTop: insets.top
            }}
        >
            <View style={styles.header}>
                <Text
                    style={{fontWeight: "600", fontSize: 17}}
                >{profileData.username}</Text>
            </View>
            <View style={styles.info}>
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        
                        
                    }}
                >
                    <View 
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Image 
                            source={{uri: profileData.profilePhotoUrl}}
                            style={{
                                width: 48,
                                height: 48
                            }}
                        />
                    </View>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Text>0</Text>
                        <Text>Путеводитель</Text>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Text>0</Text>
                        <Text>Подписчики</Text>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Text>0</Text>
                        <Text>Подписки</Text>
                    </View>
                </View>
                <View
                    style={{
                        
                        flex: 3,
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                    }}
                >
                    <Text
                        style={{
                            fontWeight: "600",
                            padding: 10
                        }}
                    >
                        {profileData.title}
                    </Text>
                    <Text
                        style={{
                            padding: 10
                        }}
                    >
                        {profileData.description}
                    </Text>
                    <ChangeProfileButton
                        title="Редактировать профиль"
                        onPress={()=>props.navigation.navigate('ProfileStackScreen')}
                    />
                </View>
                
            </View>
            <View style={styles.body}>
                <Button
                    onPress={() => props.navigation.navigate('CreateStackScreen')}
                    title="Create new guide"
                />
                <Button
                    onPress={() => {getProfileData()}}
                    title="Test"
                />
                {/* guides */}
            </View>
        </View>
    )
}

export default Profile


const styles = StyleSheet.create({
    header: {
        flex: 1,
        
        justifyContent: "center",
        alignItems: "center",
        
    },
    info: {
        flex: 4,
        
        borderBottomColor: "#A8B0BA",
        borderBottomWidth: 1
    },
    body: {
       
        flex: 10,
       
    }
})