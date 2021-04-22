import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import LocalStorage from '../../../local_storage/LocalStorage';
import { signOut } from '../../../redux/actions/tokenActions';


const ProfileOptionsScreen = (props) => {
    const insets = useSafeAreaInsets();
    const onSignOutButtonPress = () => {
        LocalStorage.delete('userToken')
            .then(res => {
                props.signOut();
            })
    }

    const onBackButtonPress = () => {
        props.navigation.goBack();
    }

    return (
        <View style={{
            paddingTop: insets.top,
            flex: 1,
            
        }}
        >
            <View style={styles.header}>
                <View style={styles.headerLeftItem}>
                    <Button title={'Back'} onPress={() => onBackButtonPress()} />
                </View>
                <View style={styles.headerItem}>
                    <Text style={styles.headerTitle}>Options</Text>
                </View>
                <View style={styles.headerItem}>

                </View>
                
                
            </View>
            <View style={styles.body}>
                <Button title="Sign Out" onPress={onSignOutButtonPress} />
            </View>

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
    header: {
        flex: 1,
        
        borderBottomColor: "#A8B0BA",
        borderBottomWidth: 0.5,
        flexDirection: 'row',
        
    },
    headerLeftItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 10
        
    },
    headerItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerTitle: {
        fontSize: 17,
        fontWeight: '600'
    },
    body: {
        paddingTop: 20,
        flex: 19,
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
})