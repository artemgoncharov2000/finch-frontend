import React, { FC, useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, Modal, Button, Platform, KeyboardAvoidingView, Dimensions } from 'react-native';
import InputField from '../../../components/input_fields/InputField';
import * as ImagePicker from 'expo-image-picker'
import DateTimePicker from '@react-native-community/datetimepicker';
import AddImageButtonLarge from '../../../components/buttons/AddImageButtonLarge';
import { FlatList } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { setGuide, setGuideId } from '../../../redux/actions/guideActions'
import { BASE_URL } from '../../../api/baseURL';
import Guide from '../../../interfaces/Guide';
import { createGuide } from '../../../api/guide/guideRequests';
import { uploadImage } from '../../../api/images/imageRequests';
import { Card } from '../../../interfaces/Card';
import { createCard } from '../../../api/card/cardRequests';
import TagInput from '../../../components/input_fields/TagInput';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import NewItemButton from '../../../components/buttons/NewItemButton';
import AutoHeightImage from 'react-native-auto-height-image';


interface Props {
    navigation: any,
}

const CreateGuideScreen = (props: Props) => {
    const insets = useSafeAreaInsets();
    const [date, setDate] = useState(new Date(1598051730000));
    const [guide, setGuide] = useState({
        title: '',
        description: '',
        travelDate: '',
        thumbnailUrl: '',
        id: '',
        location: '',
        tags: []
    })

    const [cards, setCards] = useState<Card[]>([]);

    useEffect(() => {
        getAccessToDeviceLibrary();
        getAccessToCamera();
    }, []);

    const getAccessToDeviceLibrary = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    const getAccessToCamera = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    const onChangeTitle = (text: string) => {
        setGuide(prevState => ({
            ...prevState,
            title: text
        }));
    }

    const onChangeDescription = (text: string) => {
        setGuide(prevState => ({
            ...prevState,
            description: text
        }))
        
    }

    const onChangeDate = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);

        setGuide(prevState => ({
            ...prevState,
            travelDate: currentDate.toISOString()
        }))

    };

    const onChangeLocation = (text: string) => {
        setGuide(prevState => ({
            ...prevState,
            location: text
        }))
    }

    const onAddTagHandle = (tagName: string) => {
        if (tagName !== '') {
            setGuide(prevState => ({
                ...prevState,
                tags: prevState.tags.concat([tagName])
            }))
        }
    }

    const onRemoveTagHandle = (tagIndex: number) => {

        setGuide(prevState => ({
            ...prevState,
            tags: prevState.tags.filter((value, index, arr) => index != tagIndex)
        }))
    }

    const onImagePickerButtonPress = () => {
        pickImage()
            .then(uri => {
                if (uri) {
                    uploadImage(props.userToken, uri)
                    .then(id => {
                        setGuide(prevState => ({
                            ...prevState,
                            thumbnailUrl: id
                        }))
                    });
                }
            })
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [16, 9],
            quality: 1,
        });


        return result.uri;
    };

    const onAddCardHandle = (card: Card) => {
        setCards(cards.concat([card]));
    }

    const onCreateButtonPress = () => {
        createGuide(props.userToken, guide)
            .then(guideId => {
                if (cards) {
                    cards.map((card, index) => {
                        createCard(props.userToken, guideId, card);
                    })
                }
                alert('Guide Created!');
                props.navigation.goBack();
            })
            .catch(error => console.log(error))
    }

    const onBackButtonPress = () => {
        props.navigation.goBack();
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                flex: 1,
                justifyContent: "flex-start",
                backgroundColor: "#fff"
            }}
        >
            <FlatList
                ListHeaderComponent={
                    <>
                        <View style={styles.header}>
                            <Button title={'Back'} onPress={() => onBackButtonPress()} />
                            <Text style={styles.headerTitle}>New Guide</Text>
                            <Button title={'Create'} onPress={() => onCreateButtonPress()} />
                        </View>
                        <View style={styles.body}>
                            <View style={styles.imageContainer}>
                                {
                                    guide.thumbnailUrl
                                        ?
                                        <AutoHeightImage 
                                            source={{ uri: BASE_URL + '/i/' + guide.thumbnailUrl }} 
                                            width={Dimensions.get('window').width - 30}

                                        />
                                        :
                                        <AddImageButtonLarge onPress={onImagePickerButtonPress} />
                                }
                            </View>
                            <Text style={{ fontWeight: "600" }}>Name your guide</Text>
                            <InputField placeholder="Guide name" value={guide.title} onChangeText={onChangeTitle} />
                            <Text style={{ fontWeight: "600" }}>Describe your experience</Text>
                            <InputField placeholder="Guide name" value={guide.description} onChangeText={onChangeDescription} numberOfLines={5} multiline={true} />
                            <Text style={{ fontWeight: "600" }}>When it was?</Text>
                            <View style={{ paddingVertical: 10 }}>
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date}
                                    mode="date"
                                    display="default"
                                    onChange={onChangeDate}
                                />
                            </View>
                            <Text style={{ fontWeight: "600" }}>Where it was?</Text>
                            <InputField placeholder="It was in..." value={guide.location} onChangeText={onChangeLocation} />
                            <Text style={{ fontWeight: "600" }}>Add tags</Text>
                            <TagInput tags={guide.tags} onAddTagHandle={onAddTagHandle} onRemoveTagHandle={onRemoveTagHandle} />
                            <Text style={{ fontWeight: "600" }}>Add cards</Text>
                        </View>
                    </>
                }

                data={cards}
                renderItem={({ item, index }) => {
                    return (
                        <View style={cardStyles.container}>
                            <AutoHeightImage 
                                style={cardStyles.image} 
                                source={{ uri: BASE_URL + '/i/' + item?.thumbnailUrl }} 
                                width={Dimensions.get('window').width - 40}
                            />
                            <Text style={cardStyles.title}>{item?.title}</Text>
                        </View>
                    )
                }}
                keyExtractor={(item, index) => index.toString()}
                ListFooterComponent={
                    <>
                        {/* <Button title='Add card' onPress={() => { props.navigation.navigate('NewCard', { onAddCardHandle: onAddCardHandle }) }}></Button> */}
                        <View style={styles.newButton}>
                            <NewItemButton onPress={() => { props.navigation.navigate('NewCard', { onAddCardHandle: onAddCardHandle }) }} />
                        </View>

                    </>
                }
            />


        </KeyboardAvoidingView>
    )
}

const mapStateToProps = (state) => {
    return {
        userToken: state.tokenReducer.userToken
    }
}

const mapDispatchToProps = (dispatch: (arg0: { type: string; payload: string | Guide; }) => any) => {
    return {
        setGuide: (guide: Guide) => dispatch(setGuide(guide)),
        setGuideId: (guideId: string) => dispatch(setGuideId(guideId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGuideScreen);

const styles = StyleSheet.create({
    header: {
        flex: 1,
        paddingHorizontal: 7,
        borderBottomColor: "#A8B0BA",
        borderBottomWidth: 0.5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerTitle: {
        fontSize: 17,
        fontWeight: '600'
    },
    imageContainer: {
        paddingBottom: 10
    },
    body: {
        paddingTop: 20,
        flex: 19,
        paddingHorizontal: 15
    },
    newButton: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 10

    }
})

const cardStyles = StyleSheet.create({
    container: {
        margin: 20,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        backgroundColor: '#fff',
        borderRadius: 15
    },
    image: {
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    title: {

        fontSize: 24,
        fontWeight: "600",
        color: "black",
        padding: 10
    }
})
