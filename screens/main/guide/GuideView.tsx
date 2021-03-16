import React, { FC, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { FlatList, ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import CardPreview from '../../../components/card/CardPreview';
import BackButton from '../../../components/buttons/BackButton'
import Guide from '../../../interfaces/Guide';
import { BASE_URL } from '../../../api/baseURL';

const GuideView = (props) => {

    const [cards, setCards] = useState([
        { title: 'Rome' },
        { title: 'Florence' },
        { title: 'Venice' },
        { title: 'Piza' },
    ]);

    const [guide, setGuide] = useState<Guide>()

    useEffect(() => {
        console.log(props)
        const data: Guide = props.props.route.params.guide;
        setGuide({
            title: data.title,
            id: data.id,
            description: data.description,
            location: data.location,
            thumbnailUrl: data.thumbnailUrl,
            travelDate: data.travelDate
        })
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView>
            <View style={styles.imageContainer}>
                <View style={styles.backButton}>
                    <BackButton navigation={props.navigation} />
                </View>
                <Image style={{ height: 256, width: 415 }} source={{uri: BASE_URL + '/i/' + guide?.thumbnailUrl}} />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{guide?.title}</Text>
                {/* <Text style={styles.subtitle}>{guide.}</Text> */}
                <Text style={styles.subtitle}>{guide?.location}</Text>
                <Text style={styles.subtitle}>{guide?.travelDate}</Text>
            </View>
            <View style={styles.descriptionContainer}>
                <Text style={styles.description}>Description</Text>
                <Text>{guide?.description}</Text>
            </View>
            <View style={styles.cardsContainer}>
                {
                    cards.map((item, ind) => (<CardPreview title={item.title} key={ind}/>))
                }
            </View>
            </ScrollView>
            
        </View>
    );
}

export default GuideView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {

    },
    backButton: {
        position: 'absolute',
        zIndex: 1,
        paddingLeft: 10,
        paddingTop: 50
    },
    infoContainer: {

        backgroundColor: "rgb(255, 255, 255)",
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: "rgba(60, 60, 67, 0.3)"

    },
    title: {
        fontWeight: "800",
        fontSize: 42,
    },
    subtitle: {
        fontWeight: "400",
        fontSize: 18,
        color: "grey"
    },
    descriptionContainer: {
        backgroundColor: "rgb(255, 255, 255)",
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: "rgba(60, 60, 67, 0.3)"
    },
    description: {
        fontWeight: "600",
        fontSize: 18
    },
    cardsContainer: {
        backgroundColor: "rgb(255, 255, 255)"
    }
})