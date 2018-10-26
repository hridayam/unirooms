import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from './src/store';
import {
    AllMessages, 
    Login,
    RegisterScreen,
    Chat,
    CreateListing,
    ListingDetail,
    Profile,
    ViewListings,
    Welcome,
    Verification
    
} from './src/screens';
//import { store, persistor } from './store';

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

    renderLoading() {
        return (
            <View>
                <ActivityIndicator size='large' />
            </View>
        );
    }

    render() {
        const MainNavigator = createBottomTabNavigator({
            welcome: Welcome,
            auth: Verification,
            main: {
                screen: createBottomTabNavigator({
                    home: ViewListings,
                    messages: {
                        screen: createStackNavigator({
                        messages: AllMessages,
                        chat: Chat
                        }),
                        navigationOptions: ({navigation}) => ({
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
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <View style={styles.container}>
                        <MainNavigator />
                    </View>
                </PersistGate>
            </Provider>
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
