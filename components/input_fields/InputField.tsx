import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native'
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler'

interface Props {
    placeholder: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
}

const InputField: FC<Props> = (props) => {

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder={props.placeholder} secureTextEntry={props.secureTextEntry || false } onChangeText={props.onChangeText}/>
        </View>
    );
}
export default InputField;

const styles = StyleSheet.create({
    container: {
        width: 375,
        alignSelf: 'center',
        borderBottomColor: "rgba(60, 60, 67, 0.3)",
        borderBottomWidth: 0.5,
        marginVertical: 10
    },
    input: {
        fontSize: 17,
        paddingBottom: 19
    }
});