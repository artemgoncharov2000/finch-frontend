import React, { FC, useState } from 'react'
import {StyleSheet, Text, View, Image} from 'react-native';
import DefaultButton from '../../../components/buttons/DefaultButton'
import InputField from '../../../components/input_fields/InputField';
import Signup from '../signup/Signup'
//@ts-ignore 
import FinchIcon from '../../../assets/finch-logo.svg' 
import MMKVStorage from "react-native-mmkv-storage";
import axios from 'axios';
import { AsyncStorage } from 'react-native';
interface Props {
    navigation: any
}
const MMKV = new MMKVStorage.Loader().initialize();
interface User {
    username: string,
    password: string
}

const Login: FC<Props> = (props) => {

   // const [token, setToken] = useState<string>('')
    const [user, setUser] = useState<User>({
        username: '',
        password: ''
    })   

    const onUsernameChange = (username: string) => {
        setUser({
            ...user,
            username: username
        })
    }

    const onPasswordChange = (password: string) => {
        setUser({
            ...user,
            password: password
        })
    }

    const setTokenToStorage = async (token: string) => {
        try {
            await AsyncStorage.setItem('token', token)
        } catch (err) {
            console.log(err)
        }
        
    }

    const loginUser = (user: User) => {
        console.log(user)
        axios({
            method: 'POST',
            url: 'http://192.168.1.70:8080/auth/login',
            data: {
                username: user.username,
                password: user.password
            }
        }).then(response => {
            let headers = response.headers
            console.log(headers['authorization'])
            setTokenToStorage(headers['authorization'])
        })
    }

    return(
        <View style={styles.container}>
            <View style={styles.titleView}>
                <FinchIcon/>
                <Text style={styles.title}>Вход</Text>
                <Text style={styles.subTitle}>Добро пожаловать, {"\n"} приключения уже ждут вас!</Text>
            </View>
            <View style={styles.inputView}>
                <InputField placeholder="Имя пользователя" secureTextEntry={false} onChangeText={text => onUsernameChange(text)}/>
                <InputField placeholder="Пароль" secureTextEntry={true} onChangeText={text => onPasswordChange(text)}/>
            </View>
            <View style={styles.buttonView}>
                <DefaultButton 
                    title="Log in" 
                    onPress={()=> {
                        loginUser(user)
                        props.navigation.navigate('MainStackScreen')
                    }}
                />
                <View>
                    
                </View>
            </View>
        </View>
    );
}

export default Login;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleView: {
        flex: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontWeight: "600",
        fontSize: 34,
        paddingTop: 25,
        paddingBottom: 16
    },
    subTitle: {
        textAlign: "center",
        color: 'gray'
    },
    inputView: {
        flex: 4
    },
    userInput: {
        fontSize: 17
    },
    passwordInput: {
        fontSize: 17
    },
    buttonView: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    
})