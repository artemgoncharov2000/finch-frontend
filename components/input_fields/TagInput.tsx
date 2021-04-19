import React, { useState } from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
//@ts-ignore
import DeleteIcon from '../../assets/icons/delete-icon.svg';
interface Props {
    tags: string[],
    onAddTagHandle: (tagName: string) => void,
    onRemoveTagHandle: (index: number) => void
}

const Tag = (props: {tagName: string, index: number, onRemoveTagHandle: (index: number) => void}) => {
    return (
        <View>
            <View style={TagStyles.container}>
                <Text style={TagStyles.text}>{props.tagName}</Text>
                <TouchableOpacity onPress={() => {props.onRemoveTagHandle(props.index)}}>
                    <DeleteIcon width="10" height="10" fill="#fff"/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const TagInput = (props: Props) => {

    const [text, setText] = useState('')

    return (
        <View style={TagInputStyles.container}>
            {
                props.tags 
                ?
                <>
                    {props.tags.map((tag, index) => {
                        return (
                            <Tag key={index} tagName={tag} index={index} onRemoveTagHandle={props.onRemoveTagHandle}/>
                        );
                    })}
                </>
                :
                <>
                </>
            }
            <TextInput 
                style={TagInputStyles.input}
                placeholder='Enter tag name' 
                value={text} 
                onChangeText={(text)=>{setText(text)}} 
                onEndEditing={() => {
                    props.onAddTagHandle(text);
                    setText('');
                }}
            />
        </View>
    )
}

export default TagInput;

const TagInputStyles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 10,
        borderRadius: 5,
        minHeight: 40,
        borderWidth: 1,
        borderColor: 'rgba(60, 60, 67, 0.3)',
        
        
    },
    input: {
       fontSize: 15,
       fontWeight: '600'
    }
});

const TagStyles = StyleSheet.create({
    container: {
        marginRight: 5,
        marginBottom: 5,
        padding: 10,
        alignItems: 'center',
        backgroundColor: "#007AFF",
        borderRadius: 6,
        flexDirection: 'row'
    },
    text: {
        marginRight: 5,
        color: "white",
        fontWeight: "600"
    }
})