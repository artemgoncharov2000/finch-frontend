import React, { FC, useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, FlatList, RefreshControl } from 'react-native';
import ChangeProfileButton from '../../../components/buttons/ChangeProfileButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BASE_URL } from '../../../api/baseURL';
import { connect } from 'react-redux';
import { setUser } from '../../../redux/actions/userActions';
import User from '../../../interfaces/User';
import { TouchableOpacity } from 'react-native-gesture-handler';
import GuidePreview from '../../../components/guide/GuidePreview';
import { followUser, getProfileData, unfollowUser } from '../../../api/profile/profileRequests';
//@ts-ignore
import ProfileDetailIcon from '../../../assets/profile/profile-details-icon.svg';
//@ts-ignore
import EmptyIcon from '../../../assets/profile/empty-icon.svg';
//@ts-ignore
import BackButtonIcon from '../../../assets/icons/back-button-icon.svg';
import { getListOfGuidesByUsername } from '../../../api/guide/guideRequests';
import FollowButton from '../../../components/buttons/FollowButton';

interface Props {
    navigation: any,
    username: string,
    user?: User,
    userToken: string,
    setUser: (user: User) => void
}

const UserProfileScreen = (props: Props) => {
    const insets = useSafeAreaInsets();
    const [user, setUser] = useState<User>();
    const [guides, setGuides] = useState<String[]>([]);
    const [refreshing, setRefreshing] = React.useState(false);

    useEffect(() => {
        setRefreshing(false);
        getListOfGuidesByUsername(props.userToken, props.username)
            .then(list => setGuides(list));
        getProfileData(props.userToken, props.username)
            .then(data => {
                setUser(data);
            });
    }, [refreshing]);

    const onRefresh = () => {
        setRefreshing(true);
    }

    const onChangeFollowHandle = () => {
        if (user?.subscribed) {
            unfollowUser(props.userToken, props.username)
            .then(() => onRefresh());
        } else {
            followUser(props.userToken, props.username)
            .then(() => onRefresh()); 
        }
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
                    <TouchableOpacity style={{ paddingLeft: 10 }} onPress={() => props.navigation.goBack()}>
                        <BackButtonIcon width={26} height={26} fill="#000" />
                    </TouchableOpacity>
                </View>
                <View style={styles.headerTitle}>
                    <Text style={styles.headerTitle}>{user?.username}</Text>
                </View>
                <View style={styles.headerRightItem}>
                </View>
            </View>

            <View style={styles.body}>
                {/* { 
                    // guides.length == 0
                    //     ?
                    //     (
                    //         <>
                    //             <View style={styles.emptyList}>
                    //                 <EmptyIcon />
                    //                 <Text style={styles.emptyListTitle}>Share your travels</Text>
                    //                 <Text style={styles.emptyListSubTitle}>Your travel guides will appear here</Text>
                    //             </View>

                    //         </>
                    //     )
                    //     :
                    //     (
                    //         <> */}
                                <FlatList
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
                                                        <Image style={styles.profilePhoto} source={{ uri: BASE_URL + "/i/" + user?.profilePhotoUrl }} />
                                                    </View>
                                                    <View
                                                        style={{
                                                            flex: 1,
                                                            justifyContent: "center",
                                                            alignItems: "center"
                                                        }}
                                                    >
                                                        <Text>{guides.length}</Text>
                                                        <Text style={{ fontSize: 12 }}>Guides</Text>
                                                    </View>
                                                    <View
                                                        style={{
                                                            flex: 1,
                                                            justifyContent: "center",
                                                            alignItems: "center"
                                                        }}
                                                    >
                                                        <TouchableOpacity style={styles.touchableOpacity} onPress={() => props.navigation.push('ProfileStack', { screen: 'Subscribers', params: { username: user?.username } })}>
                                                            <Text>{user?.subscribersCount}</Text>
                                                            <Text style={{ fontSize: 12 }}>Subscribers</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View
                                                        style={{
                                                            flex: 1,
                                                            justifyContent: "center",
                                                            alignItems: "center"
                                                        }}
                                                    >
                                                        <TouchableOpacity style={styles.touchableOpacity} onPress={() => props.navigation.push('ProfileStack', { screen: 'Subscriptions', params: { username: user?.username } })}>
                                                            <Text>{user?.subscriptionsCount}</Text>
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
                                                        <Text style={{ fontWeight: "600" }}>
                                                            {user?.title}
                                                        </Text>
                                                    }
                                                    <Text>
                                                        {user?.description}
                                                    </Text>

                                                </View>
                                                <FollowButton isFollow={user?.subscribed} onChangeFollowHandle={onChangeFollowHandle} />
                                            </View>
                                        </>
                                    }
                                    data={guides}
                                    renderItem={({ item, index }) => {
                                        return <GuidePreview navigation={props.navigation} username={user?.username} profilePhotoUrl={user?.profilePhotoUrl} guideId={item} onPress={() => props.navigation.push('GuideStack', {screen: 'Guide', params: {guideId: item }})} />
                                    }}
                                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                {/* { //             </>
                //         )
                // }*/}
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
export default connect(mapStateToProps, mapDispatchToProps)(UserProfileScreen)

const styles = StyleSheet.create({
    container: {

    },
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
    },

    profilePhoto: {
        width: 64,
        height: 64,
        borderRadius: 90
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
    touchableOpacity: {
        justifyContent: "center",
        alignItems: "center"
    }
})