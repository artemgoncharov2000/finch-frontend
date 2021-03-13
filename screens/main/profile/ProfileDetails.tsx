import React, { FC, useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, Modal, Button, Platform } from 'react-native';
import InputField from '../../../components/input_fields/InputField';
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'
import DateTimePicker from '@react-native-community/datetimepicker';
import AddImageButtonLarge from '../../../components/buttons/AddImageButtonLarge';
import { ScrollView } from 'react-native-gesture-handler';


const ProfileDetails= (props) => {
    const [username, setUsername] = useState('username')
    const onUsernameTextChange = (text: string) => {
        setUsername(text)
    }
    return (
        <View style={styles.container}>
            <ScrollView style={{paddingVertical: 20}}>
                <View style={{alignItems: "center", }}>
                    <Image source={require("../../../assets/profile/default.jpg")} style={{width: 128, height: 128, borderRadius: 90}}/>
                    <Button title="Change photo" onPress={()=>{}}/>
                </View>
                <Text style={{fontWeight: "600", fontSize: 17}}>Username</Text>
                <InputField value={username} onChangeText={text=>setUsername(text)}/>
                <Text style={{fontWeight: "600", fontSize: 17}}>Email</Text>
                <InputField value="email" onChangeText={()=>{}}/>
                <Text style={{fontWeight: "600", fontSize: 17}}>Title</Text>
                <InputField value="title" onChangeText={()=>{}}/>
                <Text style={{fontWeight: "600", fontSize: 17}}>Description</Text>
                <InputField value="description" onChangeText={()=>{}}/>
                
            </ScrollView>
        </View>
    )
}
export default ProfileDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        paddingHorizontal: 20


    }

})
