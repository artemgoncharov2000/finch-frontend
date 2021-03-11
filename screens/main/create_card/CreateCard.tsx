import React, { FC, useState } from 'react'
import { StyleSheet, Text, View, Image, Modal, Button, Platform, ScrollView } from 'react-native';
import InputField from '../../../components/input_fields/InputField';
import * as ImagePicker from 'expo-image-picker'

const CreateCard = (props) => {

    const [image, setImage] = useState(null);
    const [list, setList] = useState([])

    const onAddTextButtonPress = () => {

        const copy = [...list]
        const item = {
            type: 'text',
            text: 'text'
        }
        copy.push(item)
        setList([...copy])
    }

    const onAddImageButtonPress = () => {
        const copy = [...list]
        const item = {
            type: 'image',
            uri: image
        }
        copy.push(item)
        setList([...copy])
    }
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
            onAddImageButtonPress()
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={{ fontWeight: "600" }}>Name your card</Text>
                <InputField placeholder="Card name" onChangeText={() => { }} />
                <Text style={{ fontWeight: "600" }}>Talk about loaction</Text>
                {list.map(item => (
                    item.type == 'text' ? <InputField placeholder={item.text} /> : <Image source={{ uri: item.uri }} style={{ width: 374, height: 180 }} />
                ))
                }
                <Button
                    title="Add text"
                    onPress={() => {
                        console.log('list')
                        onAddTextButtonPress();
                    }

                    } />
                <Button
                    title="Add photo"
                    onPress={() => {
                        pickImage();

                    }}

                />
            </ScrollView>
           
        </View>
    )
}
export default CreateCard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        padding: 20
    }
})