import { setStatusBarBackgroundColor } from 'expo-status-bar';
import React, { FC, useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import ChangeProfileButton from '../../../components/buttons/ChangeProfileButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../../../api/baseURL';
import { connect } from 'react-redux';
import { setUser } from '../../../actions/userActions';
import { setToken } from '../../../actions/tokenActions';
import User from '../../../interfaces/User';
import { TouchableOpacity } from 'react-native-gesture-handler';
import GuidePreview from '../../../components/guide/GuidePreview';
import { getProfileData } from '../../../api/profile/profileRequests';
//@ts-ignore
import ProfileDetailIcon from '../../../assets/icons/profile-details-icon.svg';
import NewGuideButton from '../../../components/buttons/NewGuideButton'
interface Props {
    navigation: any,
    user: User,
    token: string,
    setToken: (token: any) => void,
    setUser: (user: User) => void
}

const Profile = (props: Props) => {
    const insets = useSafeAreaInsets();

    const getTokenFromStorage = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            return token;

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTokenFromStorage()
            .then(token => {
                getProfileData(token)
                    .then(response => {
                        const data = response.data;
                        console.log('data: ', data)
                        props.setUser({
                            description: data.description,
                            email: data.email,
                            phone: data.phone,
                            profileAccess: data.profileAccess,
                            profilePhotoUrl: data.profilePhotoUrl,
                            subscribersCount: data.subscribersCount,
                            subscriptionsCount: data.subscriptionsCount,
                            title: data.title,
                            type: data.type,
                            username: data.username
                        })
                    })
                props.setToken(token)
            })
    }, [])

    return (
        <View style={{
            flex: 1,
            paddingTop: insets.top
        }}
        >
            <View style={styles.header}>
               
                <Text
                    style={{ fontWeight: "600", fontSize: 17 }}
                >
                    {props.user.username}
                </Text>
                
            </View>

            <View style={styles.info}>
                <View
                    style={{
                        flex: 1,
                        paddingVertical: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            
                        }}
                    >
                        <Image
                            source={{ uri:  BASE_URL + "/i/" + props.user.profilePhotoUrl  }}
                            style={{
                                width: 64,
                                height: 64,
                                borderRadius: 90
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
                        <Text style={{fontSize: 12}}>Guides</Text>

                    </View>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <TouchableOpacity style={styles.touchableOpacity} onPress={() => props.navigation.navigate('ProfileStackScreen', { destination: 'Subscribers' })}>
                            <Text>{props.user.subscribersCount}</Text>
                            <Text style={{fontSize: 12}}>Subscribers</Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <TouchableOpacity style={styles.touchableOpacity} onPress={() => props.navigation.navigate('ProfileStackScreen', { destination: 'Subscriptions' })}>
                            <Text>{props.user.subscriptionsCount}</Text>
                            <Text style={{fontSize: 12}}>Subsctiptions</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View
                    style={{
                        flex: 2,
                        
                        alignItems: "flex-start",
                        paddingVertical: 5
                    }}
                >
                    {
                        <Text
                            style={{
                                fontWeight: "600",
                                
                            }}
                        >
                            {props.user.title}
                        </Text>
                    }
                    <Text
                        style={{
                            
                        }}
                    >
                        {props.user.description}
                    </Text>

                </View>
                <ChangeProfileButton title="Edit profile" onPress={() => props.navigation.navigate('ProfileStackScreen', { destination: 'Details' })}/>
            </View>
            <View style={styles.body}>
                <View style={{ zIndex: 30, position: "absolute", right: 20, bottom: 15}}>
                    <NewGuideButton onPress={()=>{props.navigation.navigate('CreateStackScreen')}} />
                </View>
                <FlatList
                    data={[
                        { title: "Italy", subTitle: "How I spend my weekends in Italy!" },
                        { title: "Italy", subTitle: "How I spend my weekends in Italy!" },
                        { title: "Italy", subTitle: "How I spend my weekends in Italy!" },
                    ]}
                    renderItem={({ item }) => {
                        //const guide = getGuideFromServer('dfdf', item)
                        return <GuidePreview title={item.title} subTitle={item.subTitle} navigation={props.navigation} />
                    }}
                />



            </View>
        </View>
    )
}

const mapStateToProps = (state: { userReducer: { user: User; }; tokenReducer: { token: any; }; }) => {
    return {
        user: state.userReducer.user,
        token: state.tokenReducer.token
    }
}
const mapDispatchToProps = (dispatch: (arg0: { type: string; payload: string | User; }) => any) => {
    return {
        setUser: (user: User) => dispatch(setUser(user)),
        setToken: (value: string) => dispatch(setToken(value))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile)

const styles = StyleSheet.create({
    header: {
        flex: 1,

        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: "#A8B0BA",
        borderBottomWidth: 1,

    },
   
    info: {
        flex: 4,
        
        borderBottomColor: "#A8B0BA",
        borderBottomWidth: 1,
        paddingVertical: 20,
        paddingHorizontal: 20
    },
    body: {

        flex: 15,


    },
    touchableOpacity: {
        justifyContent: "center",
        alignItems: "center"
    }
})