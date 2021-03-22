import React, { FC, useState, useContext, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpScreen from '../screens/auth/SignUpScreen';
import SignInScreen from '../screens/auth/SignInScreen';
import GuideStackNavigator from './GuideStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';
import MainStackNavigator from './MainStackNavigator';
import CreateStackNavigator from './CreateStackNavigator';
import { restoreToken, signIn, signOut } from '../redux/actions/tokenActions';
import { connect } from 'react-redux';
import LocalStorage from '../local_storage/LocalStorage';
import { SignUpUser, SignInUser } from '../api/auth/authentification';
import SplashScreen from '../screens/auth/SplashScreen';
const RootStack = createStackNavigator();

const RootStackNavigator = ({ state, signIn, restoreToken }) => {

    const [isLoading, setIsLoading] = useState(true);


    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        
        const bootstrapAsync = async () => {
            let userToken: string;
            
            try {
                // Restore token stored in `SecureStore` or any other encrypted storage
                // userToken = await SecureStore.getItemAsync('userToken');
                userToken = await LocalStorage.getValueFor('userToken')
                
            } catch (e) {
                // Restoring token failed
                console.log('zhopa')
            }

            // After restoring token, we may need to validate it in production apps

            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
            setTimeout(function() {
                restoreToken(userToken);
                //your code to be executed after 1 second
              }, 2000);
            // dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };

        bootstrapAsync();
    }, []);

    // const authContext = React.useMemo(
    //     () => ({
    //         signIn: async (data) => {
    //             // In a production app, we need to send some data (usually username, password) to server and get a token
    //             // We will also need to handle errors if sign in failed
    //             // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
    //             // In the example, we'll use a dummy token
    //             SignInUser(data)
    //                 .then(token => {
    //                     signIn(token);
    //                 })

    //             // dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
    //         },
    //         signOut: () => dispatch({ type: 'SIGN_OUT' }),
    //         signUp: async (data) => {
    //             // In a production app, we need to send user data to server and get a token
    //             // We will also need to handle errors if sign up failed
    //             // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
    //             // In the example, we'll use a dummy token
    //             SignUpUser(data)

    //                 .then(result => {
    //                     signIn(token)
    //                 })
    //             // dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
    //         },
    //     }),
    //     []
    // );

    return (
        <NavigationContainer>
            <RootStack.Navigator
                headerMode="none"
                mode="modal"
            >
                {state.isLoading ? (
                    <RootStack.Screen name="Splash" component={SplashScreen} />
                )

                    :

                    state.userToken == null ? (
                        <>
                            <RootStack.Screen name="SignUp" component={SignUpScreen} />
                            <RootStack.Screen name="SignIn" component={SignInScreen} />

                        </>
                    ) : (
                        <>
                            <RootStack.Screen name="MainStackScreen" component={MainStackNavigator} />
                            <RootStack.Screen name="CreateStackScreen" component={CreateStackNavigator} />
                            <RootStack.Screen name="ProfileStackScreen" component={ProfileStackNavigator} />
                            <RootStack.Screen name="GuideStackScreen" component={GuideStackNavigator} />
                        </>
                    )}
            </RootStack.Navigator>
        </NavigationContainer>
    );
}

const mapStateToProps = (state: { tokenReducer: any; }) => {
    return {
        state: state.tokenReducer
    }
}

const mapDispatchToProps = (dispatch: (arg0: { type: string; payload?: string; }) => any) => {
    return {
        signIn: (token: string) => dispatch(signIn(token)),
        restoreToken: (token: string) => dispatch(restoreToken(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RootStackNavigator);
