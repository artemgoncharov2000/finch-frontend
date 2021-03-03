import React, { FC } from 'react'
import {StyleSheet, Text, View, Image } from 'react-native';
import DefaultButton from '../../../components/buttons/DefaultButton'
import { TextInput } from 'react-native-gesture-handler';
import { log } from 'react-native-reanimated';
import InputField from '../../../components/input_fields/InputField';
import Signup from '../signup/Signup'

const Login: FC = (props) => {

    console.log("Component created")

    return(
        <View style={styles.container}>
            <View style={styles.titleView}>
                <Image source={require('../../../assets/finch-logo.png')}/>
                <Text style={styles.title}>Вход</Text>
                <Text style={styles.subTitle}>Добро пожаловать, {"\n"} приключения уже ждут вас!</Text>
            </View>
            <View style={styles.inputView}>
                <InputField placeholder="Электронная почта" secureTextEntry={false} onChangeText={() => {}}/>
                <InputField placeholder="Пароль" secureTextEntry={true} onChangeText={() => {}}/>
            </View>
            <View style={styles.buttonView}>
                <DefaultButton title="Войти" onPress={()=> props.navigation.navigate('HomeScreen')}/>
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