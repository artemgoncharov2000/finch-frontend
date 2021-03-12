import React, {FC, useState} from 'react';
import {View, Text, StyleSheet, StyleProp, TextStyle} from 'react-native'
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler'

interface Props {
    placeholder: string;
    secureTextEntry?: boolean;
    numberOfLines?: number;
    multiline?: boolean;
    fontSize?: number;
    fontWeight?: any;
    onChangeText: (text: string) => void;
}

const InputField: FC<Props> = (props) => {
    const [color, setColor] = useState('rgba(60, 60, 67, 0.3)') 
    const onEndEditing = () => {
        setColor('rgba(60, 60, 67, 0.3)')
    }
    return (
        <View style={{
            
            
            borderBottomColor: color,
            borderBottomWidth: 1.5,
            marginVertical: 10,
            
        }}
        >
            <TextInput 
                style={{
                    fontSize: props.fontSize || 17,
                    fontWeight: props.fontWeight || "400",
                    paddingBottom: 5
                }} 
                placeholder={props.placeholder} 
                numberOfLines={props.numberOfLines || 1}
                secureTextEntry={props.secureTextEntry || false } 
                multiline={props.multiline || false}
                onChangeText={props.onChangeText} 
                onFocus={() => {setColor('black')}}
                onEndEditing={onEndEditing} 

            />
        </View>
    );
}
export default InputField;
