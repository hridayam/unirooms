import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    TouchableOpacity,
    TextInput,
    Image,
    ScrollView } from 'react-native';
//import { Container, Header, Content, Form, Item, Input, Button, Label } from 'native-base';
//import firebase from 'firebase';

import { registerUser } from '../actions';

class RegisterScreen extends Component {
    state = {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

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

    //todo: upon success, navigate to login
    signUp() {
        console.log(this.state);
        registerUser(this.state);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.logoText}>Please enter your details to Sign Up.</Text>
                <TextInput 
                    style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="First Name"
                    placeholderTextColor="#ffffff"
                    value={this.state.firstName}
                    onChangeText={firstName => { this.setState({ firstName }); }}
                    selectionColor="#fff"
                    keyboardType="email-address"
                    onSubmitEditing={() => this.password.focus()}
                />
                <TextInput 
                    style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Last Name"
                    placeholderTextColor="#ffffff"
                    value={this.state.lastName}
                    onChangeText={lastName => { this.setState({ lastName }); }}
                    selectionColor="#fff"
                    keyboardType="email-address"
                    onSubmitEditing={() => this.password.focus()}
                />
                <TextInput 
                    style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Username"
                    placeholderTextColor="#ffffff"
                    value={this.state.username}
                    onChangeText={username => { this.setState({ username }); }}
                    selectionColor="#fff"
                    keyboardType="email-address"
                    onSubmitEditing={() => this.password.focus()}
                />
                
                <TextInput 
                    style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Email"
                    placeholderTextColor="#ffffff"
                    value={this.state.email}
                    onChangeText={email => { this.setState({ email }); }}
                    selectionColor="#fff"
                    keyboardType="email-address"
                    onSubmitEditing={() => this.password.focus()}
                />
                <TextInput 
                    style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Password"
                    value={this.state.password}
                    onChangeText={password => { this.setState({ password }); }}
                    secureTextEntry
                    placeholderTextColor="#ffffff"
                    ref={(input) => { this.password = input; }}
                />
                <TextInput 
                    style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Confirm Password"
                    value={this.state.confirmPassword}
                    onChangeText={confirmPassword => { this.setState({ confirmPassword }); }}
                    secureTextEntry
                    placeholderTextColor="#ffffff"
                    ref={(input) => { this.password = input; }}
                />
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={this.signUp.bind(this)}
                >
                    <Text style={styles.buttonText}>Register/Sign Up</Text>
                </TouchableOpacity>

                <View style={styles.signupTextCont}>
                    <Text style={styles.signupText}>Already have an account?</Text>
                    <TouchableOpacity onPress={this.goBack}>
                        <Text style={styles.signupButton}>Log In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    logoText: {
        marginVertical: 15,
        fontSize: 18,
        color: 'rgba(255, 255, 255, 0.7)'
    },
    container: {
        backgroundColor: '#455a64',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    signupTextCont: {
        flexGrow: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingVertical: 16,
        flexDirection: 'row'
    },
    signupText: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 16
    },
    signupButton: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500'
    },
    formContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputBox: {
        width: 300,
        backgroundColor: 'rgba(255, 255,255,0.2)',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#ffffff',
        marginVertical: 10
    },
    button: {
        width: 300,
        backgroundColor: '#1c313a',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    }
});

export { RegisterScreen };
