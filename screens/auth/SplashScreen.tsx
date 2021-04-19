import React, {useEffect} from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image} from 'react-native';
import { connect } from 'react-redux';
import { checkUserToken } from '../../api/auth/authentification';
import LocalStorage from '../../local_storage/LocalStorage';
import { restoreToken, signIn, signOut } from '../../redux/actions/tokenActions';


const SplashScreen = (props) => {

    useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        
        const bootstrapAsync = async () => {
            let userToken: string;
            
            try {
                // Restore token stored in `SecureStore` or any other encrypted storage
                // userToken = await SecureStore.getItemAsync('userToken');
                userToken = await LocalStorage.getValueFor('userToken');
                
                if (userToken == null)
                    throw 'Token is null'
            } catch (e) {
                // Restoring token failed
                //console.log('zhopa')
                console.log(e);
                props.signOut();
            }

            // After restoring token, we may need to validate it in production apps

            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
            restoreToken(userToken);
                checkUserToken(userToken)
                .then(status => {
                    console.log(status);
                    if (status === 'Fail') {
                        LocalStorage.delete('userToken')
                        .then(() => props.signOut());
                    } else {
                        props.signIn(userToken);
                    }
                })
            // setTimeout(function() {
                
                
            //     //your code to be executed after 1 second
            //   }, 2000);
            // dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };

        bootstrapAsync();
    }, []);

    return (
        <View style={styles.container}>
            
            <Image style={styles.logo} source={require('../../assets/finch-splash.png')}/>
            <View style={styles.spaceView}></View>
            <ActivityIndicator size="small" color="#1E6CFF"/>
        </View>
    );
}

const mapStateToProps = (state) => {
    return {
        state: state.tokenReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (token: string) => dispatch(signIn(token)),
        restoreToken: (token: string) => dispatch(restoreToken(token)),
        signOut: () => dispatch(signOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    logo: {
        width: 330,
        height: 90
    },
    spaceView: {
        paddingVertical: 20
    }
})