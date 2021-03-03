import React, { FC } from 'react'
import {StyleSheet, Text, View, Image,  } from 'react-native';
import DefaultButton from '../../../components/buttons/DefaultButton'
import InputField from '../../../components/input_fields/InputField';


const Signup: FC = (props) => {

    console.log("Component created")

    return(
        <View style={styles.container}>
            <View style={styles.titleView}>
                <Image source={require('../../../assets/finch-logo.png')}/>
                <Text style={styles.title}>Создать Аккаунт</Text>
                <Text style={styles.subTitle}>С помощью аккаунта, {"\n"} сможешь сохранять интересные путеводители!</Text>
            </View>
            <View style={styles.inputView}>
                <InputField placeholder="Ник" secureTextEntry={false} onChangeText={() => {}}/>
                <InputField placeholder="Электронная почта" secureTextEntry={false} onChangeText={() => {}}/>
                <InputField placeholder="Пароль" secureTextEntry={true} onChangeText={() => {}}/>
            </View>
            <View style={styles.buttonView}>
                <DefaultButton title="Создать аккаунт" onPress={()=>{}}/>
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