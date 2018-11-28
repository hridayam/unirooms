import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, Platform, YellowBox } from 'react-native';
import { Font, Permissions } from 'expo';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './src/store';
import Router from './src/Router';
import { app } from './firebase-setup';
//import StatusBar from './src/common/StatusBar';

YellowBox.ignoreWarnings(['Warning: TouchableWithoutFeedback']);
YellowBox.ignoreWarnings(['Warning: Failed prop type: Invalid props.style key `fontfamily`']);

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            loggedIn: null,
            verified: false
        };
    }

    async componentWillMount() {
        //ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT_UP);

        app.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
                if (user.emailVerified) {
                    this.setState({ verified: true });
                    Permissions.askAsync(Permissions.CAMERA_ROLL);
                }
                //app.auth().signOut();
            } else {
                this.setState({ loggedIn: false, verified: false });
            }
        });

        await Font.loadAsync({
            headerFont: require('./assets/fonts/Pacifico.ttf'),
            titleFont: require('./assets/fonts/Lato-Bold.ttf'),
            bodyFont: require('./assets/fonts/Lato-Light.ttf'),
        });
        this.setState({ loading: false });
    }

    renderLoading = () => {
        return (
            <View style={styles.container}>
                <ActivityIndicator size={Platform.OS === 'ios' ? 'large' : 100} />
            </View>
        );
    }

    render() {
        if (this.state.loggedIn === null) {
            return this.renderLoading();
        }
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    {
                        //<StatusBar backgroundColor="blue" barStyle="light-content" />
                    }
                    <View style={styles.container}>
                        {
                            this.state.loading ?
                            this.renderLoading() :
                            <Router
                                loggedIn={this.state.loggedIn}
                                verified={this.state.verified}
                            />
                        }
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

export default App;
