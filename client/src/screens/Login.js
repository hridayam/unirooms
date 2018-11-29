import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Alert
} from 'react-native';
import { Container, Content, Form, Item, Input, Label } from 'native-base';

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
            if (err) Alert.alert('Unable to Login', 'please check the email, and password');
            this.setState({ loadingData: false });
        });
    }

    render() {
        return (
            <Container 
                style={styles.mainContainer}
            >
                <Content>
                    <View style={styles.logoContainer}>
                        <Image
                            style={{ 
                                width: 200, 
                                height: 150,
                                resizeMode: 'contain' 
                            }}
                            source={icon} 
                        />
                    </View>
                    <Form>
                        <Item floatingLabel>
                            <Label style={{ color: '#ffffff' }}>Email</Label>
                            <Input 
                                textContentType='emailAddress'
                                onChangeText={(email) => { this.setState({ email }); }}
                                value={this.state.email}
                                keyboardType='email-address'
                                autoCapitalize='none'
                                textInputStyle
                                autoFocus
                            />
                        </Item>
                        <Item floatingLabel>
                            <Label style={{ color: '#ffffff' }}>Password</Label>
                            <Input 
                                textContentType='password'
                                onChangeText={(password) => { this.setState({ password }); }}
                                value={this.state.password}
                                secureTextEntry
                                autoCapitalize='none'
                            />
                        </Item>
                    </Form>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.onSubmit.bind(this)}
                            disabled={this.state.loadingData}
                        >
                            {
                                this.state.loadingData ?
                                    <ActivityIndicator color='#fff' size='small' /> :
                                    <Text style={styles.buttonText}>Login</Text>
                            }
                        </TouchableOpacity>

                        <View style={styles.signupTextCont}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.signupText}>Dont have an account?</Text>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('Register')}
                                >
                                    <Text style={styles.signupButton}>Sign Up</Text>
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
    mainContainer: { 
        backgroundColor: '#455a64', 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
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

const Login = connect(null, { loginUser })(comp);

export { Login };
