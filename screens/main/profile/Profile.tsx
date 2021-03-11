import { setStatusBarBackgroundColor } from 'expo-status-bar';
import React from 'react'
import {StyleSheet, Text, View, Image, Button } from 'react-native';
import ChangeProfileButton from '../../../components/buttons/ChangeProfileButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Profile = (props) => {
    
    const insets = useSafeAreaInsets();
    return (
        <View style={{
                flex: 1,
                paddingTop: insets.top
            }}
        >
            <View style={styles.header}>
                <Text
                    style={{fontWeight: "600", fontSize: 17}}
                >username</Text>
            </View>
            <View style={styles.info}>
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        
                        
                    }}
                >
                    <View 
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Image 
                            source={require("../../../assets/profile/default.jpg")}
                            style={{
                                width: 48,
                                height: 48
                            }}
                        />
                    </View>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Text>0</Text>
                        <Text>Путеводитель</Text>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Text>0</Text>
                        <Text>Подписчики</Text>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Text>0</Text>
                        <Text>Подписки</Text>
                    </View>
                </View>
                <View
                    style={{
                        
                        flex: 3,
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                    }}
                >
                    <Text
                        style={{
                            fontWeight: "600",
                            padding: 10
                        }}
                    >
                        Your title
                    </Text>
                    <Text
                        style={{
                            padding: 10
                        }}
                    >
                        Your status
                    </Text>
                    <ChangeProfileButton
                        title="Редактировать профиль"
                        onPress={()=>{}}
                    />
                </View>
                
            </View>
            <View style={styles.body}>
                <Button
                    onPress={() => props.navigation.navigate('CreateStackScreen')}
                    title="Create new guide"
                />
                {/* guides */}
            </View>
        </View>
    )
}

export default Profile


const styles = StyleSheet.create({
    header: {
        flex: 1,
        
        justifyContent: "center",
        alignItems: "center",
        
    },
    info: {
        flex: 4,
        
        borderBottomColor: "#A8B0BA",
        borderBottomWidth: 1
    },
    body: {
       
        flex: 10,
       
    }
})