import React from 'react'
import { StyleSheet, TextInput, View, Image } from 'react-native';
//@ts-ignore
import SearchIcon from '../../assets/icons/search-icon.svg'

interface Props {
    onChangeData: (text: string) => void
}

const SearchField = (props: Props) => {

    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <SearchIcon />
            </View>
            <View style={styles.body}>
                <TextInput
                    placeholder="Search"
                    style={styles.text}
                    onChangeText={text => {props.onChangeData(text)}}
                />
            </View>

        </View>
    )
}

export default SearchField;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#EBEDF0",
        borderRadius: 10,
        height: 40,
        padding: 10
    },
    left: {
        flex: 1,
        
    },
    body: {
        flex: 19
    },
    text: {
        fontSize: 16,
    }
})