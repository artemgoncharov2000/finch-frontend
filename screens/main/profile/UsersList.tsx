import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { AsyncStorage } from 'react-native';
import { getUserSubscribers, getUserSubscriptions } from '../../../api/profile/profileRequests';


const ListItem = (props) => {
    return (
        <View style={styles.listItem}>
            <TouchableOpacity>
                <Text style={styles.text}>{props.value}</Text>
            </TouchableOpacity>
        </View>
    )
}

const UsersList = (props) => {
    const [users, setUsers] = useState<string[]>([])
    const getTokenFromStorage = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            return token;

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTokenFromStorage()
        .then(token => {
            if (props.type === 'Subscribers') {
                getUserSubscribers(token)
                .then(users => {
                    setUsers(users);
                })
            } else if (props.type === 'Subscriptions'){
                getUserSubscriptions(token)
                .then (users => {
                    setUsers(users)
                })
            }
        })
    }, [])

    return (
        <View style={styles.container}>
            <FlatList
                data={users}
                renderItem={({item, index}) => <ListItem key={index} value={item}/>}
                keyExtractor={(item, index) => index.toString()}
            />
            
        </View>
    );    
}

export default UsersList;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 20
        
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