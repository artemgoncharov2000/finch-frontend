import React, {FC, useState} from 'react';
import {View, Text, StyleSheet, StyleProp, TextStyle} from 'react-native'
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler'

interface Props {
    placeholder?: string;
    secureTextEntry?: boolean;
    numberOfLines?: number;
    multiline?: boolean;
    fontSize?: number;
    fontWeight?: any;
    maxLength?: number;
    value?: string;
    editable?: boolean;
    onChangeText: (value: string) => void;
}

const InputField: FC<Props> = (props) => {
    const [color, setColor] = useState('rgba(60, 60, 67, 0.3)'); 
    const [value, setValue] = useState(props.value);
    const onEndEditing = () => {
        setColor('rgba(60, 60, 67, 0.3)')
    }

    const handleOnChange = (value: string) => {
        setValue(value);
        props.onChangeText(value)
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
                value={value || undefined}
                editable={props.editable || true}
                maxLength={props.maxLength || undefined}
                placeholder={props.placeholder || undefined} 
                numberOfLines={props.numberOfLines || 1}
                secureTextEntry={props.secureTextEntry || false } 
                multiline={props.multiline || false}
                onChangeText={handleOnChange} 
                onFocus={() => {setColor('black')}}
                onEndEditing={onEndEditing} 
            />
        </View>
    );
}
export default InputField;
