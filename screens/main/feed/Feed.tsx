import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, FlatList, ScrollView } from 'react-native';
import GuidePreview from '../../../components/guide/GuidePreview';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SearchField from '../../../components/input_fields/SearchField';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { BASE_URL } from '../../../api/baseURL';
import Guide from '../../../interfaces/Guide';

const Feed = (props) => {
    const insets = useSafeAreaInsets();
   // const [guideIdsList, setGuideIdsList] = useState('');
   // const [token, setToken] = useState('');
    const [guides, setGuides] = useState<Guide[]>([])
    useEffect(() => {
        getTokenFromStorage()
        .then((token) => {
            getGuideListFromServer(token);
           // setToken(token);
        })
    },[])

    const getTokenFromStorage = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            return token;

        } catch (error) {
            console.log(error)
        }
    }

    const getGuideListFromServer = async (token: string | null | undefined) => {
        await axios({
            method: 'GET',
            url: BASE_URL + '/feed',
            headers: {
                authorization: token
            }
        })
        .then(response => {
            const guideIds: [string] = response.data;
            guideIds.map((item, index) => {
                getGuideFromServer(token, item)
                .then(guide => {
                    console.log(guide)
                    setGuides(prevState => prevState.concat([guide]));
                })
                
            })
            console.log(guides)
        })
    }

    const getGuideFromServer = async (token: string | null | undefined, guideId: string) => {
        console.log('token ', token);
        
        const request = await axios({
            method: 'GET',
            url: BASE_URL + '/guides/' + guideId,
            headers: {
                authorization: token
            }
        })
        .then(response => {
            console.log(response.data)
            return response.data;
        })

        return request;
    }

    return (
        <View style={{
            paddingTop: insets.top,
            flex: 1,
            justifyContent: "center",
            
        }}>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                paddingHorizontal: 20
            }}
            >
                <SearchField />
            </View>
            <View style={{
                flex: 14,


            }}
            >
                <FlatList
                    data={guides}
                    renderItem={({item, index}) => {
                        return <GuidePreview title={guides[index].title} subTitle={guides[index].description} imageId={guides[index].thumbnailUrl} onPress={() => props.navigation.navigate('GuideStackScreen', {guide: guides[index]})}/>
                    }}
                />
            </View>
        </View>
    )
}

export default Feed
const styles = StyleSheet.create({
    container: {

    }
})