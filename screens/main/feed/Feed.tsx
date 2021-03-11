import React from 'react'
import { StyleSheet, Text, View, Image, FlatList, ScrollView } from 'react-native';
import GuidePreview from '../../../components/guide/GuidePreview';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SearchField from '../../../components/search/SearchField';

const Feed = () => {
    const insets = useSafeAreaInsets();
    return (
        <View style={{
            paddingTop: insets.top,
            flex: 1,
            justifyContent: "center",

        }}>
            <View style={{
                flex: 1,

                justifyContent: 'center',
                paddingHorizontal: 20,
            }}
            >
                <SearchField />
            </View>
            <View style={{
                flex: 14,
                paddingHorizontal: 20
                
            }}
            >
                <ScrollView contentContainerStyle={{paddingVertical: 20}}>
                    <GuidePreview />
                    <GuidePreview />
                    <GuidePreview />
                </ScrollView>

            </View>

        </View>
    )
}

export default Feed

const styles = StyleSheet.create({
    container: {

    }
})