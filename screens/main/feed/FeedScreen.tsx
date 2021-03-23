import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, FlatList, ScrollView, RefreshControl } from 'react-native';
import GuidePreview from '../../../components/guide/GuidePreview';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SearchField from '../../../components/input_fields/SearchField';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { BASE_URL } from '../../../api/baseURL';
import Guide from '../../../interfaces/Guide';
import LocalStorage from '../../../local_storage/LocalStorage';
import { connect } from 'react-redux';
import { getFeed } from '../../../api/feed/feedRequests';

const FeedScreen = (props) => {
    const insets = useSafeAreaInsets();
    const [guidesIds, setGuidesIds] = useState<string[]>([])
    const [refreshing, setRefreshing] = React.useState(false);

    useEffect(() => {
        // setGuides([]);

        // getGuideListFromServer(props.userToken);
        setRefreshing(false);

        getFeed(props.userToken)
        .then(ids => setGuidesIds(ids));
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
                <SearchField />
            </View>
            <View style={{
                flex: 14,
            }}
            >
                <FlatList
                    data={guidesIds}
                    renderItem={({ item, index }) => {
                        return <GuidePreview guideId={guidesIds[index]}  onPress={() => props.navigation.navigate('GuideStackScreen', { guideId: guidesIds[index] })} />
                    }}
                    
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                />
            </View>
        </View>
    )
}
const mapStateToProps = (state) => {
    return {
        userToken: state.tokenReducer.userToken
    }
}
export default connect(mapStateToProps)(FeedScreen);

const styles = StyleSheet.create({
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    }
})