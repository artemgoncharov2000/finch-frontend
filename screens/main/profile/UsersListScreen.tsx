import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { AsyncStorage } from 'react-native';
import { getUserSubscribers, getUserSubscriptions } from '../../../api/profile/profileRequests';
import { connect } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ListItem = (props) => {

    const onListItemPress = () => {
        props.navigation.push('ProfileStack', { screen: 'Profile', params: { username: props.value } })
    }
    return (
        <TouchableOpacity onPress={onListItemPress}>
            <View style={styles.listItem}>
                <Text style={styles.text}>{props.value}</Text>
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
            paddingLeft: 20,
            backgroundColor: '#fff'
        }}>
            <FlatList
                data={users}
                renderItem={({ item, index }) => <ListItem key={index} navigation={props.navigation} value={item} />}
                keyExtractor={(item, index) => index.toString()}
            />

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
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 20,
        backgroundColor: '#fff'
    },
    listItem: {
        paddingVertical: 10,
        height: 44,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(60, 60, 67, 0.3)'
    },
    text: {
        fontSize: 18,
    }
})