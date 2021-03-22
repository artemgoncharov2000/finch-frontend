import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, FlatList, ScrollView } from 'react-native';
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

const Feed = (props) => {
    const insets = useSafeAreaInsets();
    const [guidesIds, setGuidesIds] = useState<string[]>([])

    useEffect(() => {
        // setGuides([]);

        // getGuideListFromServer(props.userToken);
        getFeed(props.userToken)
        .then(ids => setGuidesIds(ids));
    }, [])

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
export default connect(mapStateToProps)(Feed);

const styles = StyleSheet.create({
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    }
})