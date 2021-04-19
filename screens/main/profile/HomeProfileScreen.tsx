import React, { FC, useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, FlatList, RefreshControl, Dimensions } from 'react-native';
import ChangeProfileButton from '../../../components/buttons/ChangeProfileButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BASE_URL } from '../../../api/baseURL';
import { connect } from 'react-redux';
import { setUser } from '../../../redux/actions/userActions';
import User from '../../../interfaces/User';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import GuidePreview from '../../../components/guide/GuidePreview';
import { getProfileData } from '../../../api/profile/profileRequests';
//@ts-ignore
import ProfileDetailIcon from '../../../assets/profile/profile-details-icon.svg';
//@ts-ignore
import EmptyIcon from '../../../assets/profile/empty-icon.svg';
//@ts-ignore
import BackButtonIcon from '../../../assets/icons/back-button-icon.svg';
import NewItemButton from '../../../components/buttons/NewItemButton';
import { getListOfGuidesByUsername } from '../../../api/guide/guideRequests';
import AutoHeightImage from 'react-native-auto-height-image';

interface Props {
    navigation: any,
    user?: User,
    userToken: string,
    setUser: (user: User) => void
}

const HomeProfileScreen = (props: Props) => {
    const insets = useSafeAreaInsets();
    const [guides, setGuides] = useState<String[]>([]);
    const [refreshing, setRefreshing] = React.useState(false);

    useEffect(() => {

        setRefreshing(false);
        getListOfGuidesByUsername(props.userToken, 'me')
            .then((list: string[]) => setGuides(list.reverse()));
        getProfileData(props.userToken, 'me')
            .then(data => {

                props.setUser(data);
            });

    }, [refreshing]);

    const onRefresh = () => {
        setRefreshing(true);
    }

    return (
        <View style={{
            flex: 1,
            paddingTop: insets.top,
            backgroundColor: '#fff'
        }}
        >
            <View style={styles.header}>
                <View style={styles.headerLeftItem}>

                </View>
                <View style={styles.headerTitle}>
                    <Text style={styles.headerTitle}>{props.user?.username}</Text>
                </View>
                <View style={styles.headerRightItem}>
                    {
                        <TouchableOpacity onPress={() => props.navigation.navigate('ProfileOptions')} >
                            <ProfileDetailIcon width={26} height={26} fill="#000" />
                        </TouchableOpacity>
                    }

                </View>
            </View>

            <View style={styles.body}>
                {
                    <View style={styles.newButtonContainer}>
                        <NewItemButton onPress={() => { props.navigation.navigate('CreateStackScreen') }} />
                    </View>
                }
                {

                    <FlatList
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={
                            <>
                                <View style={styles.profileContainer}>
                                    <View style={styles.profileInfoHeader}>
                                        <View
                                            style={{
                                                flex: 1,
                                                justifyContent: "center",
                                                alignItems: "center",

                                            }}
                                        >
                                            {
                                                props.user?.profilePhotoUrl === '' || props.user?.profilePhotoUrl === 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/%D0%9F%D1%83%D1%82%D0%B8%D0%BD_23.12.20.jpg/416px-%D0%9F%D1%83%D1%82%D0%B8%D0%BD_23.12.20.jpg'
                                                    ?
                                                    <Image style={styles.profilePhoto} source={require('../../../assets/default/default-profile-photo.png')} />
                                                    :
                                                    <AutoHeightImage
                                                        style={{
                                                            borderRadius: 90,
                                                        }}
                                                        source={{ uri: BASE_URL + "/i/" + props.user?.profilePhotoUrl }}
                                                        width={Dimensions.get('window').width - 320}
                                                    />
                                            }

                                        </View>
                                        <View style={styles.profileInfoContainer}>

                                            <TouchableWithoutFeedback style={styles.profileInfoContainerItem} >
                                                <Text>{guides.length}</Text>
                                                <Text style={{ fontSize: 12 }}>Guides</Text>
                                            </TouchableWithoutFeedback>

                                            <TouchableOpacity style={styles.profileInfoContainerItem} onPress={() => props.navigation.push('ProfileStack', { screen: 'Subscribers', params: { username: props.user?.username } })}>
                                                <Text>{props.user?.subscribersCount}</Text>
                                                <Text style={{ fontSize: 12 }}>Subscribers</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity style={styles.profileInfoContainerItem} onPress={() => props.navigation.push('ProfileStack', { screen: 'Subscriptions', params: { username: props.user?.username } })}>
                                                <Text>{props.user?.subscriptionsCount}</Text>
                                                <Text style={{ fontSize: 12 }}>Subsctiptions</Text>
                                            </TouchableOpacity>

                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            flex: 2,

                                            alignItems: "flex-start",
                                            paddingVertical: 5
                                        }}
                                    >
                                        {
                                            <Text
                                                style={{
                                                    fontWeight: "600",
                                                }}
                                            >
                                                {props.user?.title}
                                            </Text>
                                        }
                                        <Text
                                            style={{

                                            }}
                                        >
                                            {props.user?.description}
                                        </Text>

                                    </View>
                                    <ChangeProfileButton title="Edit profile" onPress={() => props.navigation.navigate('EditProfile')} />
                                </View>
                            </>
                        }
                        ListEmptyComponent={
                            <>
                                <View style={styles.emptyList}>
                                    <EmptyIcon />
                                    <Text style={styles.emptyListTitle}>Share your travels</Text>
                                    <Text style={styles.emptyListSubTitle}>Your travel guides will appear here</Text>
                                </View>
                            </>
                        }
                        data={guides}
                        renderItem={({ item, index }) => {
                            return <GuidePreview navigation={props.navigation} username={props.user?.username} profilePhotoUrl={props.user?.profilePhotoUrl} guideId={item} onPress={() => props.navigation.push('GuideStack', { guideId: item })} />
                        }}
                        keyExtractor={(item, index) => index.toString()}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    />
                    //     </>
                    // )
                }
            </View>
        </View>
    )
}

const mapStateToProps = (state: { userReducer: { user: any; }; tokenReducer: { userToken: any; }; }) => {
    return {
        user: state.userReducer.user,
        userToken: state.tokenReducer.userToken
    }
}
const mapDispatchToProps = (dispatch: (arg0: { type: string; payload: string | User; }) => any) => {
    return {
        setUser: (user: User) => dispatch(setUser(user)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeProfileScreen)

const styles = StyleSheet.create({

    header: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        // borderBottomColor: "#A8B0BA",
        // borderBottomWidth: 0.5,
        backgroundColor: '#fff'
    },
    headerLeftItem: {
        flex: 1,
        alignItems: 'flex-start',
        paddingRight: 10
    },
    headerCenterItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerTitle: {

        fontWeight: "600",
        fontSize: 22,
    },
    headerRightItem: {

        flex: 1,
        alignItems: 'flex-end',
        paddingRight: 10
    },
    profileContainer: {
        flex: 4,
        borderBottomColor: "#A8B0BA",
        borderBottomWidth: 0.5,
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: '#fff'
    },

    profileInfoHeader: {
        flex: 1,
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        // backgroundColor: 'red',


    },

    profilePhoto: {
        width: 90,
        height: 90,
        borderRadius: 90,
    },

    profileInfoContainer: {
        flexDirection: "row",
        // backgroundColor: 'yellow',

    },

    profileInfoContainerItem: {
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },

    body: {
        flex: 15,
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    emptyList: {
        alignSelf: 'center',
        alignItems: 'center'
    },
    emptyListTitle: {
        paddingVertical: 5,
        fontSize: 20,
        fontWeight: '600'
    },
    emptyListSubTitle: {
        paddingVertical: 5,
        color: "#6C7889",
        fontSize: 16
    },
    newButtonContainer: {
        zIndex: 30,
        position: "absolute",
        right: 20,
        bottom: 15
    },

})