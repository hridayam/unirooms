import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import Expo from 'expo';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store';
import Router from './src/Router';

export default class App extends React.Component {
    componentWillMount() {
        Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
        const config = {
            apiKey: 'AIzaSyA6fPurbpOopU918zzG4YEiuXrIjWita2U',
            authDomain: 'uniroom-project.firebaseapp.com',
            databaseURL: 'https://uniroom-project.firebaseio.com',
            projectId: 'uniroom-project',
            storageBucket: 'uniroom-project.appspot.com',
            messagingSenderId: '942380097329'
        };
        firebase.initializeApp(config);

        const firestore = firebase.firestore();
        const settings = {/* your settings... */ timestampsInSnapshots: true };
        firestore.settings(settings);
    }

    renderLoading() {
        return (
            <View>
                <ActivityIndicator size='large' />
            </View>
        );
    }

    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <View style={styles.container}>
                        <Router />
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
