import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, Image } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { AsyncStorage } from 'react-native';
import { getUserByUsername, getUserSubscribers, getUserSubscriptions } from '../../../api/profile/profileRequests';
import { connect } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { setUser } from '../../../redux/actions/userActions';
import { BASE_URL } from '../../../api/baseURL';
//@ts-ignore
import BackButtonIcon from '../../../assets/icons/back-button-icon.svg';
const ListItem = (props) => {
    const [user, setUser] = useState();

    useEffect(() => {
        getUserByUsername(props.userToken, props.username)
            .then(user => {
                setUser(user)
            });
          
    }, [])
    const onListItemPress = () => {
        console.log('props.value:', props.username)
        props.navigation.push('ProfileStack', { screen: 'Profile', params: { username: props.username } })
    }
    return (
        <TouchableOpacity onPress={() => onListItemPress()}>
            <View style={styles.bodyItem}>
                <Image style={styles.image} source={{ uri: BASE_URL + "/i/" + user?.profilePhotoUrl }} />
                <View style={styles.textInfo}>
                    <Text style={styles.username}>{user?.username}</Text>
                    <Text style={styles.title}>{user?.title}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const UsersListScreen = (props) => {
    const insets = useSafeAreaInsets();
    const [users, setUsers] = useState<string[]>([])
    const username = props.route.params.username;

    useEffect(() => {

        if (props.type === 'Subscribers') {
            getUserSubscribers(props.userToken, username)
                .then(users => {
                    setUsers(users);
                })
        } else if (props.type === 'Subscriptions') {
            getUserSubscriptions(props.userToken, username)
                .then(users => {
                    setUsers(users)
                })
        }

    }, [])

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            paddingTop: insets.top,

            backgroundColor: '#fff'
        }}>
            <View style={styles.header}>
                <View style={styles.headerLeftItem}>
                    <TouchableOpacity onPress={() => { props.navigation.goBack() }}>
                        <BackButtonIcon  width={26} height={26} fill="#000"/>
                    </TouchableOpacity>
                    
                </View>
                <View style={styles.headerCenterItem}>
                    <Text style={styles.headerTitle}>{props.type}</Text>
                </View>
                <View style={styles.headerRightItem}>

                </View>

            </View>
            <View style={styles.body}>
                <FlatList
                    data={users}
                    renderItem={({ item, index }) => <ListItem key={index} navigation={props.navigation} username={item} userToken={props.userToken} />}
                    keyExtractor={(item, index) => index.toString()}
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
export default connect(mapStateToProps)(UsersListScreen);
const styles = StyleSheet.create({

    header: {
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(60, 60, 67, 0.3)',

    },
    headerLeftItem: {
        marginLeft: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        // backgroundColor: 'green'
    },
    headerCenterItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red'
    },
    headerTitle: {
        fontSize: 17,
        fontWeight: '600'
    },
    headerRightItem: {
        flex: 1,
        marginRight: 10
        // backgroundColor: 'yellow'
    },
    body: {
        flex: 14, 

    },
    
    bodyItem: {
        minHeight: 44,
        borderBottomColor: 'rgba(60, 60, 67, 0.3)',
        borderBottomWidth: 0.5,
        paddingVertical: 10,
        paddingLeft: 10,
        flexDirection: 'row'
    },
    textInfo: {
        paddingLeft: 10,
        justifyContent: 'center',
        flexDirection: 'column'
    },
    image: {
        width: 52,
        height: 52,
        borderRadius: 90
    },
    username: {
        fontWeight: '600'
    },
    title: {
        color: 'gray'
    }
})