import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { BASE_URL } from '../../api/baseURL';
import { getCardByGuideId } from '../../api/card/cardRequests';
import { Card } from '../../interfaces/Card';

interface Props {
    cardId: string
    userToken: string,
    navigation: any
}

const CardPreview = (props: Props) => {

    const [card, setCard] = useState<Card>()

    useEffect(() => {
        console.log('CardId', props.cardId)
        getCardByGuideId(props.userToken, props.cardId)
            .then((card: Card) => {
                setCard(card)
            })
        console.log('content card', card?.content)
    }, [])

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => { props.navigation.push('GuideStack', { screen: 'Card', params: { content: card?.content, title: card?.title } }) }}>
                <AutoHeightImage
                    style={{
                        
                        borderTopLeftRadius: 15,
                        borderTopRightRadius: 15
                    }}
                    width={Dimensions.get('window').width - 40}
                    source={{ uri: BASE_URL + '/i/' + card?.thumbnailUrl }}
                    
                />
                <Text style={styles.title}>{card?.title}</Text>
            </TouchableOpacity>
        </View>
    )
}
const mapStateToProps = (state) => {
    return {
        userToken: state.tokenReducer.userToken
    }
}
export default connect(mapStateToProps)(CardPreview);

const styles = StyleSheet.create({
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

    title: {

        fontSize: 24,
        fontWeight: "600",
        color: "black",
        padding: 10
    }
})