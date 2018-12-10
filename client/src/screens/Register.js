import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  Dimensions,
  ActivityIndicator,
  ImageBackground,
  Alert
} from 'react-native';
import { Container, Content, Header, Left, Body, Right, Icon, Title, Button, Form, Item, Input, Label } from 'native-base';
import { Entypo, FontAwesome, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Col, Row, Grid } from 'react-native-easy-grid';

import { registerUser } from '../actions/index';
import { icon } from '../common/images';

class comp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            loadingData: false
        };
    }

    _handlePress() {
        console.log(this.state.first);
        console.log(this.state.last);
        console.log(this.state.email);
        console.log(this.state.pass1);
        console.log(this.state.pass2);
    }

    checkInputs() {
        const emailCount = this.state.email.length;
        if (this.state.pass1 !== this.state.pass2) {
        return false;
        } else if (this.state.first === '' || this.state.last === '') {
        return false;
        } else if (this.state.email.substring(emailCount - 10, emailCount - 1) !== '@sjsu.edu') {
            return false;
        }

        this._handlePress();
        return true;
    }

    onSubmit() {
        const { email, password, confirmPassword } = this.state;
        this.setState({ loadingData: true });
        this.props.registerUser({ email, password, confirmPassword }, (err) => {
            if (err) Alert.alert('Registration Unsuccessful', 'Either your email was not an SJSU email, the passwords were less than 8 characters, or the passwords were unidentical.');
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
                      source={require('../../assets/Backgrounds/Room3.jpg')}
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
                                    <Item rounded style={{ width: 250, marginBottom: 15 }}>
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
                                     <Item rounded style={{ width: 250, marginBottom: 60 }}>
                                        <Text>     </Text>
                                        <MaterialCommunityIcons name="lock-outline" size={30} color='white' />
                                        <Input 
                                            placeholder='Confirm Password'
                                            placeholderTextColor='white'
                                            value={this.state.confirmPassword}
                                            onChangeText={(confirmPassword) => { this.setState({ confirmPassword }); }}
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
                                        activeOpacity={0.9}
                                    >
                                        { this.state.loadingData ?
                                            <ActivityIndicator color='#fff' size='small' /> :
                                            <Text style={styles.buttonText}>Sign Up</Text>
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
        alignItems: 'center',
        marginBottom: 30
    },
    buttonText: {
        fontSize: 20,
        fontFamily: 'bodyFont',
        color: 'white',
        textAlign: 'center'
    }
});

const Register = connect(null, { registerUser })(comp);

export { Register };
