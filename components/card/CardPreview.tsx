import React, {useEffect, useState} from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { BASE_URL } from '../../api/baseURL';
import { getCardById} from '../../api/card/cardRequests';
import { Card } from '../../interfaces/Card';

interface Props {
    cardId: string
    userToken: string
}

const CardPreview = (props: Props) => {

    const [card, setCard] = useState<Card>()

    useEffect(() => {
        console.log('CardId', props.cardId)
        getCardById(props.userToken, props.cardId)
        .then((card: Card) => {
            setCard(card)
        })
        console.log('content card', card?.content)
    }, [])

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => {props.navigation.navigate('CardView', {content: card?.content})}}>
                <Image style={styles.image} source={{uri: BASE_URL + '/i/' + card?.thumbnailUrl}}/>
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
    image: {
        height: 180,
        width: 375,
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