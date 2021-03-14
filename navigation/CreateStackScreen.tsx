import React, { FC, useEffect, useState } from 'react';
import { Button, Platform } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import CreateGuide from '../screens/main/create_guide/CreateGuide';
import CreateCard from '../screens/main/create_card/CreateCard';
import { connect } from 'react-redux';
import axios from 'axios';
import { AsyncStorage } from 'react-native';

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
                const formData = new FormData()
                formData.append('file', {
                  uri: Platform.OS === "android" ? props.guide.thumbnailUrl : props.guide.thumbnailUrl.replace('file://', ''),
                  type: 'image/jpg',
                  name: 'imagename.jpg'
                })

                var url = '';
                axios({
                  method: 'POST',
                  url: 'http://192.168.1.70:8080/i/upload',
                  headers: {
                    authorization: token,
                    'Content-type': 'multipart/form-data'
                  },
                  data: formData
                })
                  .then(respose => {
                    url = respose.data.id
                    axios({
                      method: 'PUT',
                      url: 'http://192.168.1.70:8080/guides',
                      headers: {
                        authorization: token
                      },
                      data: {
                        description: props.guide.description,
                        location: props.guide.location,
                        thumbnailUrl: url,
                        title: props.guide.title,
                        travelDate: props.guide.travelDate
                      }
                    }).then(response => console.log('response: ', response.data));
                  })

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
               
                const item = {
                  content: props.card.content,
                  guideId: props.card.guideId.id,
                  location: props.card.location,
                  tags: props.card.tags,
                  thumbnailUrl: props.card.thumbnailUrl,
                  title: props.card.title    
                }
                console.log('item', item);
                axios({
                  method: 'POST',
                  url: 'http://192.168.1.70:8080/cards',
                  headers: {
                    authorization: token
                  },
                  data: item
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
