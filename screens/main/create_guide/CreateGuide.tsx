import React, { FC, useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, Modal, Button, Platform } from 'react-native';
import InputField from '../../../components/input_fields/InputField';
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'
import DateTimePicker from '@react-native-community/datetimepicker';
import AddImageButtonLarge from '../../../components/buttons/AddImageButtonLarge';
import { ScrollView } from 'react-native-gesture-handler';


const CreateGuide = (props) => {

    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3, 2],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const [date, setDate] = useState(new Date(1598051730000));
    const [show, setShow] = useState(false);

    const onChangeDate = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{ paddingVertical: 20 }}>
                    {
                        image
                            ?
                            <Image source={{ uri: image }} style={{ width: 374, height: 180, borderRadius: 10 }} />
                            :
                            <AddImageButtonLarge onPress={pickImage} />
                    }
                </View>
                <Text style={{ fontWeight: "600" }}>Name your guide</Text>
                <InputField placeholder="Guide name" onChangeText={() => { }} />
                <Text style={{ fontWeight: "600" }}>Describe your experience</Text>
                <InputField placeholder="Guide name" onChangeText={() => { }} numberOfLines={5} multiline={true} />
                <Text style={{ fontWeight: "600" }}>When it was?</Text>
                <View style={{paddingVertical: 10}}>
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={onChangeDate}
                    />
                </View>


                <Text style={{ fontWeight: "600" }}>Where it was?</Text>
                <InputField placeholder="It was in..." onChangeText={() => { }} />
                <Text style={{ fontWeight: "600" }}>Add some cards</Text>
                <Button title='Add card' onPress={() => { props.navigation.navigate('NewCard') }}></Button>
            </ScrollView>

        </View>
    )
}
export default CreateGuide

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        paddingHorizontal: 20


    }
})
