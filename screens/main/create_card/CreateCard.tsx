import React, { FC, useState } from 'react'
import { StyleSheet, Text, View, Image, Modal, Button, Platform, ScrollView } from 'react-native';
import InputField from '../../../components/input_fields/InputField';
import * as ImagePicker from 'expo-image-picker'
import AddContentButton from '../../../components/buttons/AddContentButton';
import AddImageButtonMiddle from '../../../components/buttons/AddImageButtonMiddle';

const CreateCard = () => {

    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null)
    const [list, setList] = useState([])

    const onAddTextButtonPress = () => {
        const copy = [...list]
        const item = {
            type: 'text',
            text: 'ex. The story begins with...'
        }
        copy.push(item)
        setList([...copy])
    }

    const onAddImageButtonPress = () => {
        let promise = new Promise((resolve, reject) => {
            pickImage()
            image ? resolve(null) : reject()
        })
        promise.then(() => {
            const copy = [...list]
            const item = {
                type: 'image',
                uri: image
            }
            copy.push(item)
            setList([...copy])
        })

    }
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3, 2],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri)


        }
    };

    const pickPreviewImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3, 2],
            quality: 1,
        });

        if (!result.cancelled) {
            setPreviewImage(result.uri)
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={{ fontWeight: "600" }}>Name your card</Text>
                <InputField placeholder="Card name" fontWeight="600" fontSize={20} onChangeText={() => { }} />
                <Text style={{ fontWeight: "600" }}>Description</Text>
                <InputField placeholder="ex. How I was on The Eiffel Tower" fontWeight="400" fontSize={14} onChangeText={() => { }} />
                <Text style={{ fontWeight: "600" }}>Add a picture to your card</Text>
                {
                    previewImage
                        ?
                        <Image source={{ uri: previewImage }} style={{ width: 374, height: 90, borderRadius: 10 }} />
                        :
                        <AddImageButtonMiddle onPress={pickPreviewImage} />
                }

                <Text style={{ fontWeight: "600" }}>Tell us more about your experience</Text>
                {list.map((item, key) => (
                    item.type == 'text'
                        ?
                        <InputField
                            placeholder={item.text}
                            multiline={true}
                            fontWeight="400"
                            fontSize={14}
                            onChangeText={() => { }}
                        />
                        :
                        <Image source={{ uri: item.uri }} style={{ width: 374, height: 180 }} />
                ))
                }
                <View
                    style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 50, paddingVertical: 20 }}
                >
                    <AddContentButton type="text" onPress={onAddTextButtonPress} />
                    <AddContentButton type="image" onPress={onAddImageButtonPress}

                    />
                </View>
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