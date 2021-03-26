import React, { FC, useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { BASE_URL } from '../../api/baseURL';
import { getGuideById } from '../../api/guide/guideRequests';
import { getUserByUsername } from '../../api/profile/profileRequests';
//@ts-ignore
import CommentIcon from '../../assets/icons/comment-icon.svg';
//@ts-ignore
import LikeIcon from '../../assets/icons/like-icon.svg';
//@ts-ignore
import MessageIcon from '../../assets/icons/message-icon.svg';
import Guide from '../../interfaces/Guide';
import User from '../../interfaces/User';

interface Props {
    username: string,
    profilePhotoUrl: string,
    guideId: string,
    userToken: string
    onPress: () => void
}


const GuidePreview: FC<Props> = (props) => {

    const [guide, setGuide] = useState({
        description: '',
        thumnailUrl: '',
        title: '',
        created: ''
    })
    
    useEffect(() => {
        getGuideById(props.userToken, props.guideId)
        .then((guide: Guide) => {
            const date = new Date(guide.created);
            setGuide({
                description: guide.description,
                thumnailUrl: guide.thumbnailUrl,
                title: guide.title,
                created: date.toLocaleString('default', { month: 'short' }) + ' ' + date.getDate() + ', ' + date.getFullYear()
            })
        })
        
    }, [])

    return (

        <View style={styles.container}>
            <View style={styles.header} >
                <Image style={styles.profilePhoto} source={{uri: BASE_URL + '/i/' + props.profilePhotoUrl}} />
                <View style={styles.headerInfoContainer}>
                    <Text style={styles.usernameText}>{props.username}</Text>
                    <Text style={styles.dateText}>{guide.created}</Text>
                </View>
            </View>
            <View>
                <TouchableOpacity onPress={props.onPress}>
                    <Image
                        source={{ uri: BASE_URL + '/i/' + guide.thumnailUrl }}
                        style={{
                            height: 180,
                            width: 375,
                        }}
                    />
                </TouchableOpacity>
            </View>
            
            <View style={styles.tagsContainer}>

            </View>
            <View style={styles.textContainer}>
                <Text
                    style={styles.title}
                >
                    {guide.title}
                </Text>
                <Text
                    style={styles.description}
                >
                    {guide.description}
                </Text>
            </View>
            <View style={styles.actionsContainer}>
                <View style={styles.actionElement}>
                    <TouchableOpacity>
                        <LikeIcon width={20} height={20} fill="#6C7889" />
                    </TouchableOpacity>
                </View>
                <View style={styles.actionElement}>
                    <TouchableOpacity>
                        <CommentIcon width={20} height={20}fill="#6C7889" />
                    </TouchableOpacity>
                </View>
                <View style={styles.actionElement}>
                    <TouchableOpacity>
                        <MessageIcon width={20} height={20} fill="#6C7889" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    );
}
const mapStateToProps = (state) => {
    return {
        userToken: state.tokenReducer.userToken
    }
};
export default connect(mapStateToProps)(GuidePreview);

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        borderRadius: 15,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        margin: 20
    },
    header: {
        flexDirection: 'row',
        padding: 10
    },
    profilePhoto: {
        borderRadius: 90,
        width: 36,
        height: 36,

    },
    headerInfoContainer: {
        paddingHorizontal: 10
    },
    usernameText: {
        fontWeight: '600',
        fontSize: 17
    },
    dateText: {
        color: "#6C7889",
        fontSize: 15
    },
    
    tagsContainer: {

    },
    textContainer: {

    },
    title: {
        fontStyle: 'normal',
        fontWeight: "600",
        fontSize: 22,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    description: {
        fontStyle: 'normal',
        fontWeight: "400",
        fontSize: 16,
        color: "#6C7889",
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 10
    },
    actionsContainer: {
        flexDirection: 'row',
        borderTopColor: '#6C7889',
        borderTopWidth: 0.5,
        paddingVertical: 10,
        margin: 10
    },
    actionElement: {
        paddingRight: 50
    },
})