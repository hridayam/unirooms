import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  Dimensions
} from 'react-native';
import { Content, Form, Item, Input, Label } from 'native-base';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
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

    render() {
        const image = require('../../assets/icon_blank.png');

        return (
            <KeyboardAvoidingView
                style={{ backgroundColor: '#455a64', flex: 1, justifyContent: 'center' }}
                behavior="padding" enabled
            >
                <Content>
                    <View style={styles.logoContainer}>
                        <Image
                            style={{ 
                                width: 200, 
                                height: 150,
                                resizeMode: 'contain' 
                            }}
                            source={image} 
                        />
                    </View>
                    <Form style={{ alignItems: 'center' }}>
                        <Item floatingLabel>
                          <Label style={{ color: '#ffffff' }}>First Name</Label>
                          <Input />
                        </Item>
                        <Item floatingLabel>
                          <Label style={{ color: '#ffffff' }}>Last Name</Label>
                          <Input />
                        </Item>
                        <Item floatingLabel>
                          <Label style={{ color: '#ffffff' }}>Username</Label>
                          <Input />
                        </Item>
                        <Item floatingLabel>
                          <Label style={{ color: '#ffffff' }}>Email</Label>
                          <Input />
                        </Item>
                        <Item floatingLabel>
                          <Label style={{ color: '#ffffff' }}>Password</Label>
                          <Input />
                        </Item>
                        <Item floatingLabel>
                          <Label style={{ color: '#ffffff' }}>Confirm Password</Label>
                          <Input />
                        </Item>
                  </Form>
                  <View>
                      <TouchableOpacity
                          style={styles.button}
                      >
                          <Text style={styles.buttonText}>Sign Up</Text>
                      </TouchableOpacity>
                      <View style={styles.signupTextCont}>
                          <Text style={styles.signupText}>Already have an account?</Text>
                          <TouchableOpacity>
                              <Text style={styles.signupButton}>Log In</Text>
                          </TouchableOpacity>
                      </View>
                  </View>
              </Content>
          </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    logoContainer: {
        flexGrow: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 50
    },
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

export { Register };
