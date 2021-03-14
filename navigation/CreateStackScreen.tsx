import React, {FC, useState} from 'react';
import {Button} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import CreateGuide from '../screens/main/create_guide/CreateGuide';
import CreateCard from '../screens/main/create_card/CreateCard';
import {connect} from 'react-redux';
import axios from 'axios';
import { AsyncStorage } from 'react-native';

const CreateStackScreen = (props) => {
  const CreateStack = createStackNavigator();
  const getTokenFromStorage = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        return token;
    } catch (error) {
        console.log(error)
    }
  }

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
                    console.log('url photo', props.guide.thumbnailUrl)
                    formData.append('file', {uri: props.guide.thumbnailUrl, type: 'image/jpg', name: 'imagename.jpg'})

                    getTokenFromStorage()
                    .then(token => {
                      console.log('token from formData', token)
                      var url = '';
                      // axios({
                      //   method: 'POST',
                      //   url: 'http://192.168.1.70:8080/i/upload',
                      //   headers: {
                      //     authorization: token,
                      //     'Content-type': 'multipart/form-data'
                      //   },
                      //   data: formData
                      // })
                      fetch('http://192.168.1.70:8080/i/upload' , {
                        method: 'post',
                        headers: {
                          authorization: token
                        },  
                        body: formData
                      })
                      .then(reponse => {
                        url = reponse.data.id;
                        console.log('url=',url);
                      })
                      return ({token, url})
                    })
                    // .then((token)=>{
                    //   console.log('Current data', props.guide)
                    //   axios({
                    //     method: 'POST',
                    //     url: 'http://192.168.1.70:8080/guides',
                    //     headers: {
                    //       authorization: token
                    //     },
                    //     data: {
                    //       description: props.guide.description,
                    //       location: props.guide.location,
                    //       thumbnailUrl: '',
                    //       title: props.guide.title,
                    //       travelDate: props.guide.travelDate 
                    //     }
                    //   }).then(response => console.log('response: ', response.data));
                      
                    // })
                    
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
                  onPress={() => {}}
                  title="Create"
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
  return{
      guide: state.guideReducer.guide,
      guideId: state.guideReducer.guide.id.id
  }
}
export default connect(mapStateToProps)(CreateStackScreen)
