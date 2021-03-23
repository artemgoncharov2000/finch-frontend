import React, { FC, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { FlatList, ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import CardPreview from '../../../components/card/CardPreview';
import BackButton from '../../../components/buttons/BackButton'
import Guide from '../../../interfaces/Guide';
import { BASE_URL } from '../../../api/baseURL';
import { getCardsByGuideId } from '../../../api/card/cardRequests';
import Card from '../../../interfaces/Card';
import { getGuideById } from '../../../api/guide/guideRequests';
import { connect } from 'react-redux';

const GuideView = (props) => {

    const [guide, setGuide] = useState<Guide>()
    const [cards, setCards] = useState<Card[]>()

    useEffect(() => {
        
        const guideId = props.props.route.params.guideId;

        getGuideById(props.userToken, guideId)
            .then(data => {
    
                setGuide({
                    title: data.title,
                    id: data.id,
                    description: data.description,
                    location: data.location,
                    thumbnailUrl: data.thumbnailUrl,
                    travelDate: data.travelDate,
                    created: data.created
                })
            })


        getCardsByGuideId(props.userToken, guideId)
            .then(cards => {
                console.log('card' + cards)
                setCards(cards)
            })

    }, []);

    return (
        <View style={styles.container}>

            <View style={styles.imageContainer}>
                <View style={styles.backButton}>
                    <BackButton navigation={props.props.navigation} />
                </View>
                <Image style={{ height: 256, width: 415 }} source={{ uri: BASE_URL + '/i/' + guide?.thumbnailUrl }} />
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
                <FlatList
                    data={cards}
                    renderItem={({ item, index }) => {
                        return <CardPreview cardId={item.id} navigation={props.props.navigation}/>
                    }}
                />
            </View>
        </View>
    );
}
const mapStateToProps = (state) => {
    return {
        userToken: state.tokenReducer.userToken
    }
}
export default connect(mapStateToProps)(GuideView);

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