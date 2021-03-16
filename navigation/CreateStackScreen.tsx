import React, { FC, useEffect, useState } from 'react';
import { Button, Platform } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import CreateGuide from '../screens/main/create_guide/CreateGuide';
import CreateCard from '../screens/main/create_card/CreateCard';
import { connect } from 'react-redux';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { BASE_URL } from '../api/baseURL';

const CreateStackScreen = (props) => {
  const CreateStack = createStackNavigator();
  const [token, setToken] = useState('')
  const getTokenFromStorage = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      return token;
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getTokenFromStorage()
      .then(t => setToken(t))
  })

  return (
    <CreateStack.Navigator>
      <CreateStack.Screen
        name="NewGuide"
        component={CreateGuide}
        options={{
          headerRight: () => (
            <Button
              onPress={() => {
                console.log('props.guide', props.guide)
                axios({
                  method: 'PUT',
                  url: BASE_URL + "/guides",
                  headers: {
                    authorization: token
                  },
                  data: {
                    description: props.guide.description,
                    location: props.guide.location,
                    thumbnailUrl: props.guide.thumbnailUrl,
                    title: props.guide.title,
                    travelDate: props.guide.travelDate
                  }
                })
                .then(response => console.log('response: ', response.data))
                .catch(error => console.error(error))
              }}
              title="Create"
              color="#007AFF"
            />
          ),
          headerBackTitle: "Back",
          headerTitle: "New Guide"
        }}
      />
      <CreateStack.Screen
        name="NewCard"
        component={CreateCard}
        options={{
          
          headerRight: () => (
            <Button
              onPress={() => {
                console.log('props.card', props.card)
                axios({
                  method: 'POST',
                  url: BASE_URL + "/cards",
                  headers: {
                    authorization: token
                  },
                  data: {
                    content: JSON.stringify(props.card.content),
                    guideId: props.card.guideId.id,
                    location: props.card.location,
                    tags: props.card.tags,
                    thumbnailUrl: props.card.thumbnailUrl,
                    title: props.card.title
                  }
                })
                  .then(response => console.log('response: ', response.data))
                  .catch(error => {
                    console.log(error)
                  })
              }}
              title="add"
              color="#007AFF"
            />
          ),
          headerBackTitle: "Back",
          headerTitle: "New Card"
        }}

      />
    </CreateStack.Navigator>

  );
};
const mapStateToProps = (state) => {
  return {
    guide: state.guideReducer.guide,
    guideId: state.guideReducer.guide.id.id,
    card: state.cardReducer.card
  }
}
export default connect(mapStateToProps)(CreateStackScreen)
