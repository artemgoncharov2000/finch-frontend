import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import LocalStorage from '../../../local_storage/LocalStorage';
import { signOut } from '../../../redux/actions/tokenActions';


const ProfileOptionsScreen = (props) => {

    const onSignOutButtonPress = () => {
        LocalStorage.delete('userToken')
        .then(res => {
            props.signOut();
        }) 
       
    }
    return (
        <View style={styles.container}>
            <Button title="Sign Out" onPress={onSignOutButtonPress}></Button>
        </View>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
    
}
export default connect(null, mapDispatchToProps)(ProfileOptionsScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})