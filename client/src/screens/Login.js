import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Image
} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Button, Label } from 'native-base';

class Login extends Component {
    
  render() {
    return (
            <Container style={{ backgroundColor: '#455a64', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Content>
                    <View style={styles.logoContainer}>
                             <Image
                                style={{ width: 100, height: 100 }}
                                source={require('../resources/logo.svg_.png')}
                            />
                            <Text style={styles.logoText}>UniRooms</Text>
                    </View>
                    <Form>
                        <Item floatingLabel>
                          <Label style={{ color: '#ffffff'}}>Username</Label>
                          <Input />
                        </Item>
                        <Item floatingLabel>
                          <Label style={{ color: '#ffffff'}}>Password</Label>
                          <Input />
                        </Item>
                  </Form>
                  <View style={{alignItems: 'center', justifyContent: 'center'}}>
                      <TouchableOpacity
                          style={styles.button}
                      >
                          <Text style={styles.buttonText}>Log In</Text>
                      </TouchableOpacity>
                      <View style={styles.signupTextCont}>
                          <View style={{flexDirection: 'row'}}>
                              <Text style={styles.signupText}>Dont have an account?</Text>
                              <TouchableOpacity>
                                  <Text style={styles.signupButton}>Sign Up</Text>
                              </TouchableOpacity>
                          </View>
                          <View style={{alignItems: 'center'}}>
                              <TouchableOpacity>
                                  <Text style={styles.signupButton}>Forgot Password?</Text>
                              </TouchableOpacity>
                          </View>
                      </View>
                  </View>
              </Content>
          </Container>
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
                flexDirection: 'column'
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

        export { Login };
