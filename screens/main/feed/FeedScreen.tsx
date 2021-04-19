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
interface FeedItem{
    id: string,
    username: string,
    profilePhotoUrl: string
}
interface Props{
    userToken: string,
    navigation: any
}
const FeedScreen: FC<Props> = (props) => {
    const insets = useSafeAreaInsets();
    const [feedItems, setFeedItems] = useState<FeedItem[]>([])
    const [refreshing, setRefreshing] = React.useState(false);

    useEffect(() => {
        setRefreshing(false);
        getFeed(props.userToken)
        .then((feedItems: FeedItem[]) => setFeedItems(feedItems.reverse()));
    }, [refreshing])

    const onRefresh = () => {
        setRefreshing(true);
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
                {/* <SearchField /> */}
                <Text style={styles.headerTitle}>Feed</Text>
                <TouchableOpacity onPress={() => props.navigation.navigate('Search')}>
                    <SearchIcon fill="#000" width="28" height="28"/>
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <FlatList
                    showsVerticalScrollIndicator ={false}
                    data={feedItems}
                    renderItem={({ item, index }) => {
                        return <GuidePreview 
                            profilePhotoUrl={item.profilePhotoUrl}
                            navigation={props.navigation}
                            username={item.username} 
                            guideId={item.id} 
                            onPress={() => props.navigation.push('GuideStack', {screen: 'Guide', guideId: item.id })} 
                        />
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
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
export default connect(mapStateToProps)(FeedScreen);

const styles = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        borderBottomColor: "#A8B0BA",
        borderBottomWidth: 0.5
    },
    headerTitle: {
        fontWeight: '600',
        fontSize: 25
    },
    body: {
        flex: 14
    }
})