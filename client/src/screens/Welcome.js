import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { Container, Content, Header, Left, Body, Right, Icon, Title, Button, Form, Item, Input, Label } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import { icon } from '../common/images';

class Welcome extends Component {
    render() {
        return (
            <Container style={{ flex: 1 }}>
                <ImageBackground
                    source={require('../../assets/Backgrounds/Room1.jpg')}
                    style={{ width: '100%', height: '100%' }}
                > 
                    <Content scrollEnabled={false} >
                        <Grid>
                            <Row style={{ justifyContent: 'center', alignItems: 'center', height: Dimensions.get('window').height * 0.5 }}>
                                <Image
                                    style={{ 
                                        width: 300, 
                                        height: 250,
                                        resizeMode: 'contain' 
                                    }}
                                    source={require('../../assets/icon_blank.png')} 
                                />
                            </Row>

                            <Row style={{ height: Dimensions.get('window').height * 0.25 }} />

                            <Row style={{ justifyContent: 'center', alignItems: 'center', height: Dimensions.get('window').height * 0.1 }}>
                                <TouchableOpacity 
                                    style={styles.button}
                                    onPress={() => this.props.navigation.navigate('Login')}
                                    activeOpacity={0.9}
                                >
                                    <Text style={styles.buttonText}>Sign In</Text>
                                </TouchableOpacity>
                            </Row>

                            <Row style={{ justifyContent: 'center', alignItems: 'center', height: Dimensions.get('window').height * 0.1 }}>        
                                <TouchableOpacity 
                                    style={styles.button}
                                    onPress={() => this.props.navigation.navigate('Register')}
                                    activeOpacity={0.9}
                                >
                                    <Text style={styles.buttonText}>Sign Up</Text>
                                </TouchableOpacity>
                            </Row>

                            <Row style={{ height: Dimensions.get('window').height * 0.05 }} />
                        </Grid>
                    </Content>
                </ImageBackground>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        width: 150,
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

export { Welcome };
