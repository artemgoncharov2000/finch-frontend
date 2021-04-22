import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GuideViewScreen from '../../screens/main/guide/GuideViewScreen';
import CardViewScreen from '../../screens/main/card/CardViewScreen';
import SearchScreen from '../../screens/main/search/SearchScreen';
import ReportScreen from '../../screens/main/report/ReportScreen';
import ProfileStackNavigator from '../ProfileStackNavigator';
import GuideStackNavigator from '../GuideStackNavigator';

const SearchStackNavigator = (props) => {
    const SearchStack = createStackNavigator();
    return (
        <SearchStack.Navigator
            headerMode="none"
        >
            <SearchStack.Screen name="Search" component={SearchScreen}/>
            <SearchStack.Screen name="Report">
                {({navigation, route}) => {return <ReportScreen navigation={navigation} route={route}/>}}
            </SearchStack.Screen>
            <SearchStack.Screen name="GuideStack" component={GuideStackNavigator}/>
            <SearchStack.Screen name="ProfileStack">
                {({navigation, route}) => { return <ProfileStackNavigator navigation={navigation} username={route.params?.params.username}/>}}
            </SearchStack.Screen>
        </SearchStack.Navigator>
    )
}
export default SearchStackNavigator;