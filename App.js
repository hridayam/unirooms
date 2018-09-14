import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import { 
    AuthScreen, 
    WelcomeScreen, 
    AllMessagesScreen, 
    ChatScreen, 
    CreateListingScreen, 
    ForgotPasswordScreen,
    HomeScreen,
    ListingDetailScreen,
    ProfileScreen
} from './screens';

export default class App extends React.Component {
  componentWillMount() {
    var config = {
        apiKey: "AIzaSyA6fPurbpOopU918zzG4YEiuXrIjWita2U",
        authDomain: "uniroom-project.firebaseapp.com",
        databaseURL: "https://uniroom-project.firebaseio.com",
        projectId: "uniroom-project",
        storageBucket: "uniroom-project.appspot.com",
        messagingSenderId: "942380097329"
    };
    firebase.initializeApp(config);
  }

  render() {
    const MainNavigator = createBottomTabNavigator({
      welcome: WelcomeScreen ,
      auth: AuthScreen,
      main: {
        screen: createBottomTabNavigator({
          home: HomeScreen,
          messages: {
            screen: createStackNavigator({
              messages: AllMessagesScreen,
              chat: ChatScreen
            }),
            navigationOptions: ({navigation}) => ({
              title: 'Review Jobs',
              /*tabBarIcon: ({ tintColor }) => {
                return <Icon name="favorite" size={30} color={tintColor} />;
              }*/
            })
          },
          profile: ProfileScreen
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
