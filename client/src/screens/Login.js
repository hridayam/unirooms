import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Alert,
    ImageBackground,
    Dimensions,
    KeyboardAvoidingView 
} from 'react-native';
import { Container, Content, Header, Left, Body, Right, Icon, Title, Button, Form, Item, Input, Label } from 'native-base';
import { Entypo, FontAwesome, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Col, Row, Grid } from 'react-native-easy-grid';


import { icon } from '../common/images';
import { loginUser } from '../actions';

class comp extends Component {
    state = {
        email: '',
        password: '',
        loadingData: false
    }

    onSubmit() {
        const { email, password } = this.state;
        this.setState({ loadingData: true });
        this.props.loginUser({ email, password }, (err) => {
            if (err) Alert.alert('Login Unsuccessful', 'Your email or password is incorrect.');
            this.setState({ loadingData: false });
        });
    }

    render() {
        return (
            <KeyboardAvoidingView
                style={{ flex: 1, justifyContent: 'center' }}
                behavior="padding" enabled
            >
                <Container style={{ flex: 1 }}> 
                    <ImageBackground
                      source={require('../../assets/Backgrounds/Room2.jpg')}
                      style={{ width: '100%', height: '100%' }}
                    > 
                        <Content scrollEnabled={false}>
                            <Grid>
                                <Row style={{ justifyContent: 'flex-start', alignItems: 'flex-start', height: Dimensions.get('window').height * 0.5 }}>
                                    <Button
                                        transparent
                                        style={{ marginTop: 15, height: 60, width: 60, justifyContent: 'center', alignItems: 'center' }}
                                        onPress={() => this.props.navigation.navigate('Welcome')}
                                    >
                                        <Ionicons name="ios-arrow-back" size={50} color='white' />
                                    </Button>
                                </Row>
                                <Row style={{ justifyContent: 'flex-start', alignItems: 'center', height: Dimensions.get('window').height * 0.5, flexDirection: 'column' }}>
                                    <Item rounded style={{ width: 250, marginBottom: 15 }}>
                                        <Text>     </Text>
                                        <MaterialCommunityIcons name="email-outline" size={30} color='white' />
                                        <Input 
                                            placeholder='Email Address'
                                            placeholderTextColor='white'
                                            value={this.state.email}
                                            textContentType='emailAddress'
                                            onChangeText={(email) => { this.setState({ email }); }}
                                            keyboardType='email-address'
                                            blurOnSubmit
                                            returnKeyType='done'
                                            style={{ color: 'white', fontSize: 20, fontFamily: 'bodyFont' }}
                                            autoCorrect={false}
                                        />
                                    </Item>
                                    <Item rounded style={{ width: 250, marginBottom: 60 }}>
                                        <Text>     </Text>
                                        <MaterialCommunityIcons name="lock-outline" size={30} color='white' />
                                        <Input 
                                            placeholder='Password'
                                            placeholderTextColor='white'
                                            value={this.state.password}
                                            onChangeText={(password) => { this.setState({ password }); }}
                                            secureTextEntry
                                            autoCapitalize='none'
                                            blurOnSubmit
                                            returnKeyType='done'
                                            style={{ color: 'white', fontSize: 20, fontFamily: 'bodyFont' }}
                                            autoCorrect={false}
                                        />
                                    </Item>
                                    <TouchableOpacity 
                                        style={styles.button}
                                        onPress={this.onSubmit.bind(this)}
                                        disabled={this.state.loadingData}
                                        activeOpacity={0.9}
                                    >
                                        { this.state.loadingData ?
                                            <ActivityIndicator color='#fff' size='small' /> :
                                            <Text style={styles.buttonText}>Login</Text>
                                        }
                                    </TouchableOpacity>
                                </Row>
                            </Grid>
                        </Content>
                    </ImageBackground>
                </Container>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        width: 250,
        height: 40,
        backgroundColor: '#447B66',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 20,
        fontFamily: 'bodyFont',
        color: 'white',
        textAlign: 'center'
    }
});

const Login = connect(null, { loginUser })(comp);

export { Login };
