import React, {} from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
    tagName: string
}

const Tag = (props: Props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.tagName}</Text>
        </View>
    )
}

export default Tag;

const styles = StyleSheet.create({
    container: {
        
        marginRight: 5,
        marginBottom: 5,
        padding: 10,
        alignItems: 'center',
        backgroundColor: "#007AFF",
        borderRadius: 6,
        
    },
    text: {
        
        color: "white",
        fontWeight: "600"
    }
})