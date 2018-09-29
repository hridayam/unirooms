import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import firebase from 'firebase';

import {
    AllMessages,
    LoginScreen,
    RegisterScreen,
    Chat,
    CreateListing,
    ListingDetail,
    Profile,
    ViewListings,
    Welcome

} from './src/screens';

export default class App extends React.Component {
  componentWillMount() {
    const config = {
        apiKey: 'AIzaSyA6fPurbpOopU918zzG4YEiuXrIjWita2U',
        authDomain: 'uniroom-project.firebaseapp.com',
        databaseURL: 'https://uniroom-project.firebaseio.com',
        projectId: 'uniroom-project',
        storageBucket: 'uniroom-project.appspot.com',
        messagingSenderId: '942380097329'
    };
    firebase.initializeApp(config);
  }

  render() {
    const MainNavigator = createBottomTabNavigator({
      welcome: Welcome,
      login: LoginScreen,
      register: RegisterScreen,
      main: {
        screen: createBottomTabNavigator({
          home: ViewListings,
          messages: {
            screen: createStackNavigator({
              messages: AllMessages,
              chat: Chat
            }),
            navigationOptions: ({navigation }) =>  {
              title: 'Review Jobs',
              /*tabBarIcon: ({ tintColor }) => {
                return <Icon name="favorite" size={30} color={tintColor} />;
              }*/
            })
          },
          profile: Profile
        }, {
          tabBarOptions: {
            labelStyle: { fontSize: 12 }
          }
        })
      }
    }, {
      navigationOptions: {
        tabBarVisible: true
      }
    });

    return (
      <View style={styles.container}>
        <MainNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
