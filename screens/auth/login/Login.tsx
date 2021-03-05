import React, { FC, useState } from 'react'
import {StyleSheet, Text, View, Image,} from 'react-native';
import DefaultButton from '../../../components/buttons/DefaultButton'
import { TextInput } from 'react-native-gesture-handler';
import { log } from 'react-native-reanimated';
import InputField from '../../../components/input_fields/InputField';
import Signup from '../signup/Signup'
import axios from 'axios'
import FinchIcon from '../../../assets/finch-logo.svg' 

interface Props {
    navigation: any
}

interface User {
    username: string,
    password: string
}

const Login: FC<Props> = (props) => {

    const [token, setToken] = useState<string>('')
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

    const loginUser = (user: User) => {
        console.log(user)
        fetch('http://localhost:8080/auth/login', {
            method: 'Post',
            headers: {
                
            },
            body: JSON.stringify({
                password: user.password,
                username: user.username
            })
        })
        .then((response) => {
            setToken(response.headers["map"]["authorization"])
            console.log(token)
        })
        .catch((error) => {
            console.error(error)
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
                    title="Войти" 
                    onPress={()=> {
                       // loginUser(user)
                        props.navigation.navigate('HomeScreen')
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