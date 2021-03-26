import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image} from 'react-native';


const SplashScreen = () => {
    return (
        <View style={styles.container}>
            
            <Image style={styles.logo} source={require('../../assets/finch-splash.png')}/>
            <View style={styles.spaceView}></View>
            <ActivityIndicator size="small" color="#1E6CFF"/>
        </View>
    );
}

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    logo: {
        width: 300,
        height: 90
    },
    spaceView: {
        paddingVertical: 20
    }
})