import React, { useState, useEffect, FC } from 'react'
import { StyleSheet, Text, View, Image, FlatList, ScrollView, RefreshControl } from 'react-native';
import GuidePreview from '../../../components/guide/GuidePreview';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SearchField from '../../../components/input_fields/SearchField';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { BASE_URL } from '../../../api/baseURL';
import Guide from '../../../interfaces/Guide';
import { connect } from 'react-redux';
import { getFeed } from '../../../api/feed/feedRequests';
//@ts-ignore
import SearchIcon from '../../../assets/icons/search-icon-1.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getSearchResults } from '../../../api/search/searchRequests';
interface FeedItem {
    id: string,
    username: string,
    profilePhotoUrl: string
}
interface Props {
    userToken: string,
    navigation: any
}
const SearchScreen: FC<Props> = (props) => {
    const insets = useSafeAreaInsets();
    const [refreshing, setRefreshing] = React.useState(false);
    const [data, setData] = useState();

    useEffect(() => {
        setRefreshing(false);
    }, [refreshing]);

    const onRefresh = () => {
        setRefreshing(true);
    };

    const onChangeDataHandle = (text: string) => {
        if (text.length !== 0)
            getSearchResults(props.userToken, text)
                .then(data => setData(data));
        else {
            setData([]);
        }
    }

    return (
        <View style={{
            paddingTop: insets.top,
            flex: 1,
            justifyContent: "center",
            backgroundColor: "#fff"
        }}>
            <View style={styles.header}
            >
                <SearchField onChangeData={onChangeDataHandle} />
            </View>
            <View style={styles.body}>
                <FlatList
                    data={data}
                    renderItem={({ item, index }) => {
                        console.log(item.profilePhotoUrl)
                        return (
                            <TouchableOpacity onPress={() => props.navigation.push('ProfileStack', {screen: 'Profile', params: {username: item.username}})}>
                                <View style={styles.bodyItem}>
                                    <Image style={styles.image} source={{ uri: BASE_URL + "/i/" + item.profilePhotoUrl }} />
                                    <View style={styles.textInfo}>
                                        <Text style={styles.username}>{item.username}</Text>
                                        <Text style={styles.title}>{item.title}</Text>
                                        {
                                            item.subscribed
                                                ?
                                                <Text style={styles.title}>Following</Text>
                                                :
                                                <>
                                                </>
                                        }
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                />
            </View>
        </View>
    )
}
const mapStateToProps = (state: any) => {
    return {
        userToken: state.tokenReducer.userToken
    }
}
export default connect(mapStateToProps)(SearchScreen);

const styles = StyleSheet.create({
    header: {
        flex: 1,
        paddingHorizontal: 10,
        borderBottomColor: "#A8B0BA",
        borderBottomWidth: 0.5
    },
    headerTitle: {
        fontWeight: '600',
        fontSize: 25
    },
    body: {
        flex: 14
    },
    bodyItem: {
        minHeight: 44,
        borderBottomColor: 'rgba(60, 60, 67, 0.3)',
        borderBottomWidth: 0.5,
        paddingVertical: 10,
        paddingLeft: 10,
        flexDirection: 'row'
    },
    textInfo: {
        paddingLeft: 10,
        justifyContent: 'center',
        flexDirection: 'column'
    },
    image: {
        width: 52,
        height: 52,
        borderRadius: 90
    },
    username: {
        fontWeight: '600'
    },
    title: {
        color: 'gray'
    }
})