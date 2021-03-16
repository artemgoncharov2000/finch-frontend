import React, { FC, useState } from 'react'
import {StyleSheet, Text, View, Button } from 'react-native';
import DefaultButton from '../../../components/buttons/DefaultButton'
import InputField from '../../../components/input_fields/InputField';
//@ts-ignore 
import FinchIcon from '../../../assets/finch-logo.svg' 
import axios from 'axios';
import { MMKV } from 'react-native-mmkv';
import { BASE_URL } from '../../../api/baseURL';
import { ScrollView } from 'react-native-gesture-handler';
import {registerUser} from '../../../api/auth/authentification'
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
    return(
        <View style={styles.container}>
            
            <View style={styles.titleView}>
                <FinchIcon/>
                <Text style={styles.title}>Sign Up</Text>
                <Text style={styles.subTitle}>With your account, {"\n"} you can save interesting travel guides!</Text>
            </View>
            <View style={styles.inputView}>
                <InputField placeholder="Username" secureTextEntry={false} onChangeText={text => onUsernameChange(text)}/>
                <InputField placeholder="Email" secureTextEntry={false} onChangeText={text => onEmailChange(text)}/>
                <InputField placeholder="Password" secureTextEntry={true} onChangeText={text => onPasswordChange(text)}/>
            </View>
            <View style={styles.buttonView}>
                <DefaultButton 
                    title="Create account" 
                    onPress={()=>{
                        registerUser(user)
                        .then(result => {
                            console.log('result ', result)
                            if (result === 'Success') {
                                props.navigation.navigate('Login');
                            } else if (result) {
                                alert('Something goes wrong!');
                            }
                        })
                    }}
                />
                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>Have an account?</Text>
                    <Button title="Sign in" onPress={()=>{props.navigation.navigate('Login')}} />
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
        paddingHorizontal: 20
    },
    
    titleView: {
        flex: 4,
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
        justifyContent: "center",
        paddingBottom: 40
    },
    loginContainer: {
        paddingTop: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        
    },
    loginText: {
        color: "grey"
    }
})