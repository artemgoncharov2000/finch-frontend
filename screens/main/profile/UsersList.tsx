import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';



const ListItem = (props) => {
    return (
        <View style={styles.listItem}>
            <TouchableOpacity>
                <Text style={styles.text}>{props.value}</Text>
            </TouchableOpacity>
        </View>
    )
}

const UsersList = () => {
    return (
        <View style={styles.container}>
            <FlatList
                data={[
                    {key: 'Devin'},
                    {key: 'Dan'},
                    {key: 'Dominic'},
                    {key: 'Jackson'},
                    {key: 'James'},
                    {key: 'Joel'},
                    {key: 'John'},
                    {key: 'Jillian'},
                    {key: 'Jimmy'},
                    {key: 'Julie'},
                ]}
                renderItem={({item}) => <ListItem value={item.key}/>}
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