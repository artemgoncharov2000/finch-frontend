import React, { FC, useState } from 'react'
import { StyleSheet, Text, View, Button, Keyboard, TouchableWithoutFeedback, Linking } from 'react-native';
import DefaultButton from '../../components/buttons/DefaultButton'
import InputField from '../../components/input_fields/InputField';
//@ts-ignore 
import FinchIcon from './../../assets/finch-logo.svg'
import { signInUser, signUpUser } from '../../api/auth/authentification'
import { signIn } from '../../redux/actions/tokenActions';
import { connect } from 'react-redux';
import LocalStorage from '../../local_storage/LocalStorage';
interface Props {
    navigation: any
}

interface User {
    email: string,
    password: string,
    username: string
}

const SignUpScreen: FC<Props> = (props) => {

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

    const onSignUpButtonPress = () => {
        signUpUser(user)
            .then(result => {
                console.log('result ', result)
                if (result === 'Success') {
                    console.log(result)
                    signInUser(user)
                        .then(userToken => {
                            console.log(userToken);
                            LocalStorage.save('userToken', userToken);
                            props.signIn(userToken);
                        })

                } else if (result) {
                    alert('Something goes wrong!');
                }
            })
            .catch(err => console.error(err))
    }


    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.body}>
                    <View style={styles.titleView}>
                        <FinchIcon />
                        <Text style={styles.title}>Sign Up</Text>
                        <Text style={styles.subTitle}>With your account, {"\n"} you can save interesting travel guides!</Text>
                    </View>
                    <View style={styles.inputView}>
                        <InputField placeholder="Username" secureTextEntry={false} onChangeText={text => onUsernameChange(text)} />
                        <InputField placeholder="Email" secureTextEntry={false} onChangeText={text => onEmailChange(text)} />
                        <InputField placeholder="Password" secureTextEntry={true} onChangeText={text => onPasswordChange(text)} />
                        <Button title="Privacy Policy" onPress={()=>{Linking.openURL('https://finch-backend-ty3pscheea-lz.a.run.app/privacy')}}/>
                    </View>
                    <View style={styles.buttonView}>
                        <DefaultButton
                            title="Sign Up"
                            onPress={onSignUpButtonPress}
                        />
                        <View style={styles.loginContainer}>
                            <Text style={styles.loginText}>Have an account?</Text>
                            <Button title="Sign in" onPress={() => { props.navigation.navigate('SignIn') }} />
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}
const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (token: string) => dispatch(signIn(token))
    }
}
export default connect(null, mapDispatchToProps)(SignUpScreen);

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'flex-end',
    },
    body: {
        flex: 1,
        
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