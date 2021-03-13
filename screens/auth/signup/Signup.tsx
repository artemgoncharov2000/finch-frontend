import React, { FC, useState } from 'react'
import {StyleSheet, Text, View, Image,  } from 'react-native';
import DefaultButton from '../../../components/buttons/DefaultButton'
import InputField from '../../../components/input_fields/InputField';
//@ts-ignore 
import FinchIcon from '../../../assets/finch-logo.svg' 
import axios from 'axios';
import { MMKV } from 'react-native-mmkv';
interface Props {
    navigation: any
}

interface User {
    email: string,
    password: string,
    username: string
}

const Signup: FC<Props> = (props) => {

    const [user, setUser] = useState<User>({
        email: '',
        password: '',
        username: ''
    })

    const onUsernameChange = (username: string) => {
        setUser({
            ...user,
            username: username
        })
    }

    const onEmailChange = (email: string) => {
        setUser({
            ...user,
            email: email
        })
    }

    const onPasswordChange = (password: string) => {
        setUser({
            ...user,
            password: password
        })
    }

    const registerUser = (user: User) => {
        console.log('Hello world')
        // fetch('https://finch-backend-ty3pscheea-lz.a.run.app/auth/register', {
        //     method: 'POST',
        //     headers: {
    
        //     },
        //     body: JSON.stringify({
        //         email: user.email,
        //         password: user.password,
        //         username: user.username
        //     })
        // });
        axios({
            method: 'POST',
            url: 'http://192.168.1.70:8080/auth/register',
            data: {
                email: user.email,
                password: user.password,
                username: user.username
            }
        }).then(response => {console.log(response.data)})

        
    }

    return(
        <View style={styles.container}>
            <View style={styles.titleView}>
                {/* <Image source={require('../../../assets/finch-logo.png')}/> */}
                <FinchIcon/>
                <Text style={styles.title}>Создать Аккаунт</Text>
                <Text style={styles.subTitle}>С помощью аккаунта, {"\n"} сможешь сохранять интересные путеводители!</Text>
            </View>
            <View style={styles.inputView}>
                <InputField placeholder="Ник" secureTextEntry={false} onChangeText={text => onUsernameChange(text)}/>
                <InputField placeholder="Электронная почта" secureTextEntry={false} onChangeText={text => onEmailChange(text)}/>
                <InputField placeholder="Пароль" secureTextEntry={true} onChangeText={text => onPasswordChange(text)}/>
            </View>
            <View style={styles.buttonView}>
                <DefaultButton 
                    title="Create account" 
                    onPress={()=>{
                        registerUser(user)
                        props.navigation.navigate('Login')
                    }}
                />
                <View>
                    
                </View>
            </View>
        </View>
    );
}

export default Signup;

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
        color: 'gray',
        textAlign: "center"
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