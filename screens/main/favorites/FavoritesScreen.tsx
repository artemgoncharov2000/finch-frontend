import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, StyleSheet, Text, RefreshControl } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { getFavorites } from '../../../api/favorites/favoritesRequests';
import { FlatList } from 'react-native-gesture-handler';
import GuidePreview from '../../../components/guide/GuidePreview';

interface FavoritesItem{
    id: string,
    profilePhotoUrl: string,
    username: string
}

const FavoritesScreen = (props) => {
    const insets = useSafeAreaInsets();
    const [favorites, setFavorites] = useState<FavoritesItem[]>([]);
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        setRefreshing(false);
        getFavorites(props.userToken)
        .then((favorites: FavoritesItem[]) => setFavorites(favorites.reverse()));
    }, [refreshing])

    const onRefresh = () => {
        setRefreshing(true);
    }

    return (
        <View style={{ flex: 1, paddingTop: insets.top, backgroundColor: '#fff'}}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Favorites</Text>
            </View>
            <View style={styles.body}>
                <FlatList 
                    data={favorites}
                    renderItem={({ item, index }) => {
                        return <GuidePreview 
                            profilePhotoUrl={item.profilePhotoUrl}
                            navigation={props.navigation}
                            username={item.username} 
                            guideId={item.id} 
                            onPress={() => props.navigation.navigate('GuideStack', {screen: 'Guide', params: {guideId: item.id }})} 
                        />
                    }}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                />
            </View>
        </View>
    );
}
const mapStateToProps = (state) => {
    return {
        userToken: state.tokenReducer.userToken
    }
}
export default connect(mapStateToProps)(FavoritesScreen);

const styles = StyleSheet.create({
    header: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        paddingHorizontal: 20,
        borderBottomColor: "#A8B0BA",
        borderBottomWidth: 0.5
    },
    headerTitle: {
        fontWeight: '600',
        fontSize: 25
    },
    body: {
        flex: 14,
        backgroundColor: '#fff'
    }
})