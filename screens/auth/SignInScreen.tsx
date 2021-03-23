import React, { FC, useState } from 'react'
import {StyleSheet, Text, View, Button} from 'react-native';
import DefaultButton from '../../components/buttons/DefaultButton'
import InputField from '../../components/input_fields/InputField';
import SignUpScreen from './SignUpScreen'
//@ts-ignore 
import FinchIcon from '../../assets/finch-logo.svg'
import axios from 'axios';
//import { AsyncStorage } from 'react-native';
import { BASE_URL } from '../../api/baseURL';
//import { getToken, setToken } from '../../actions/tokenActions';
import { connect } from 'react-redux';
import {SignInUser} from '../../api/auth/authentification';
import LocalStorage from '../../local_storage/LocalStorage'
import { signIn } from '../../redux/actions/tokenActions';

interface User {
    username: string,
    password: string,
}

const SignInScreen = (props) => {

    const [user, setUser] = useState<User>({
        username: '',
        password: ''
    })   

    const onUsernameChange = (value: string) => {
        setUser({
            ...user,
            username: value
        })
    }

    const onPasswordChange = (password: string) => {
        setUser({
            ...user,
            password: password
        })
    }

    // const setTokenToStorage = async (token: string) => {
    //     try {
    //         await AsyncStorage.setItem('token', token)
    //     } catch (err) {
    //         console.log(err)
    //     }
        
    // }

    return(
        <View style={styles.container}>
            <View style={styles.titleView}>
                <FinchIcon/>
                <Text style={styles.title}>Sign In</Text>
                <Text style={styles.subTitle}>Welcome, adventures are waiting for you!</Text>
            </View>
            <View style={styles.inputView}>
                <InputField placeholder="Nickname" secureTextEntry={false} onChangeText={text => onUsernameChange(text)}/>
                <InputField placeholder="Password" secureTextEntry={true} onChangeText={text => onPasswordChange(text)}/>
            </View>
            <View style={styles.buttonView}>
                <DefaultButton 
                    title="Sign in" 
                    onPress={()=> {
                        SignInUser(user)
                        .then(userToken => {
                            LocalStorage.save('userToken', userToken)
                            props.signIn(userToken)
                           // LocalStorage.storeData('token', token);
                          //  setTokenToStorage(token);
                           // props.navigation.navigate('MainStackScreen');
                        })
                    }}
                />
                <View style={styles.signupContainer}>
                    <Text style={styles.signupText}>No account?</Text>
                    <Button title="Sign Up" onPress={()=>{props.navigation.navigate('SignUp')}} />
                </View>
            </View>
        </View>
    );
}

const mapStateToProps = (state) => {
    return {
        state: state.tokenReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (value) => dispatch(signIn(value)),
        
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);

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
        textAlign: "center",
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
        
    },
    signupContainer: {
        paddingTop: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        
    },
    signupText: {
        color: "grey"
    }
    
})