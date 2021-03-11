import React from 'react'
import {StyleSheet, TextInput, View, Image } from 'react-native';
//@ts-ignore
import SearchIcon from '../../assets/icons/search-icon.svg'

const SearchField = () => {
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: "#EBEDF0",
                borderRadius: 10,
                height: 36,
                padding: 10
            }}
        >
            <SearchIcon/>
            <TextInput 
                placeholder="Search" 
                style={{
                    padding: 10
                }}
                
            />
        </View>
    )
}

export default SearchField;