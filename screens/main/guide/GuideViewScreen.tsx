import React, { FC, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { FlatList, ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import CardPreview from '../../../components/card/CardPreview';
import BackButton from '../../../components/buttons/BackButton'
import Guide from '../../../interfaces/Guide';
import { BASE_URL } from '../../../api/baseURL';
import { getListOfCardsByGuideId } from '../../../api/card/cardRequests';
import Card from '../../../interfaces/Card';
import { getGuideById } from '../../../api/guide/guideRequests';
import { connect } from 'react-redux';
import Tag from '../../../components/tag/Tag';

const GuideViewScreen = (props) => {
    const [guide, setGuide] = useState()
    const [cards, setCards] = useState<Card[]>()
   
    useEffect(() => {

        const guideId = props.route.params.guideId;
        getGuideById(props.userToken, guideId)
            .then(data => {
                const date = new Date(data.travelDate)
                setGuide({
                    title: data.title,
                    id: data.id,
                    description: data.description,
                    location: data.location,
                    thumbnailUrl: data.thumbnailUrl,
                    travelDate: date.toLocaleString('default', { month: 'short' }) + ' ' + date.getDate() + ', ' + date.getFullYear(),
                    created: data.created,
                    tags: data.tags 
                })
            })
        getListOfCardsByGuideId(props.userToken, guideId)
            .then(cards => {
                setCards(cards)
            });

    }, []);

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.imageContainer}>
                    <View style={styles.backButton}>
                        <BackButton navigation={props.navigation} color="#fff" />
                    </View>
                    <Image style={{ height: 256, width: 415 }} source={{ uri: BASE_URL + '/i/' + guide?.thumbnailUrl }} />
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>{guide?.title}</Text>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>Description</Text>
                    <Text>{guide?.description}</Text>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>Location</Text>
                    <Text>{guide?.location}</Text>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>Travel date</Text>
                    <Text>{guide?.travelDate}</Text>
                </View>
                {
                    guide?.tags 
                        ?
                        <View style={styles.descriptionContainer}>
                            <Text style={styles.description}>Tags</Text>
                            <View style={styles.tagsContainer}>
                                {guide.tags.map((tag, index) => {
                                    return (
                                        <Tag key={index} tagName={tag} />
                                    )
                                })}
                            </View>
                        </View>
                        :
                        <>
                        </>
                }

                <View style={styles.cardsContainer}>
                    {cards?.map((card, index) => {
                        return (
                            <CardPreview cardId={card.id} key={index} navigation={props.navigation} />
                        );
                    })}
                </View>
            </ScrollView>
        </View>
    );
}
const mapStateToProps = (state) => {
    return {
        userToken: state.tokenReducer.userToken
    }
}
export default connect(mapStateToProps)(GuideViewScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
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
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    description: {
        fontWeight: "600",
        paddingBottom: 5,
        fontSize: 18
    },
    cardsContainer: {
        backgroundColor: "rgb(255, 255, 255)"
    }
})