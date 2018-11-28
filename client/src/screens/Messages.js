import React, { Component } from 'react';
import { Text, Image, StyleSheet, YellowBox, ImageBackground, TouchableOpacity, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Container, Content, Header, Left, Body, Right, Icon, Title, Button, Form, Item, Input, Label } from 'native-base';
import { ImagePicker, Permissions } from 'expo';
import { Entypo, FontAwesome, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Dialog, { DialogTitle, DialogContent, ScaleAnimation } from 'react-native-popup-dialog';
import { GiftedChat } from 'react-native-gifted-chat';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { connect } from 'react-redux';

import { app } from '../../firebase-setup';
import { sendMessage } from '../actions/chat';


class comp extends Component {
    static navigationOptions = ({ navigation }) => ({
            title: `${navigation.state.params.title}`,
            headerTitleStyle: { textAlign: 'left', alignSelf: 'center' },
            headerStyle: {
                backgroundColor: 'white',
            },
        }
    );
    
    onSend(messages = []) {
        const { user, otherUser } = this.props;
        //console.log(messages);
        if (messages === []) {
            return;
        }
        let message = messages[0];
        message = {
            content: message.text,
            created: new Date(),
            senderID: user.id
        };
        // firebase.firestore.FieldValue.serverTimestamp()
        const data = {
            content: message,
            id: this.props.threadID,
            users: [user.id, otherUser.id]
        };
        sendMessage(data);
    }
    
    render() {
        const { goBack } = this.props.navigation;

        return (
            <Container style={{ flex: 1 }}>
                <Header style={{ height: 75, backgroundColor: '#0055A2', zIndex: 1 }}>
                    <Body style={{ alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'titleFont', fontSize: 22, color: '#E5A823' }} >{this.props.user.firstName} {this.props.user.lastName}</Text>
                    </Body>
                </Header>

                <Header transparent style={{ height: 75, marginTop: -75, zIndex: -1, position: 'absolute' }}>
                    <Left style={{ flex: 1 }}>
                        <Button 
                            transparent 
                            style={{ marginLeft: 3 }}
                            onPress={() => goBack()}
                        >
                            <Ionicons name="md-arrow-round-back" size={30} color='white' />
                        </Button>
                    </Left>
                    <Body style={{ flex: 1 }} />         
                    <Right style={{ flex: 1 }} />
                </Header>

                <KeyboardAvoidingView style={{ flex: 1 }}>
                    <GiftedChat
                        bottomOffset={Platform.OS === 'ios' ? 56 : 0}
                        messages={this.props.messages}
                        onSend={messages => this.onSend(messages)}
                        user={{
                            _id: app.auth().currentUser.uid,
                            name: `${this.props.user.firstName} ${this.props.user.lastName}`,
                            avatar: 'https://placeimg.com/140/140/any'
                        }}
                        
                    />
                    {Platform.OS === 'android' ? <KeyboardSpacer /> : null }
                </KeyboardAvoidingView>
            </Container>
        );
    }
}

const mapStateToProps = (state, props) => {
    const { id } = props.navigation.state.params.item;
    const { user, thread } = state.messages[id];

    const messages = [];
    let userData;
    thread.forEach((message, i) => {
        if (message.senderID === app.auth().currentUser.uid) {
            userData = {
                name: `${state.auth.firstName} ${state.auth.lastName}`,
                _id: app.auth().currentUser.uid,
                avatar: 'https://placeimg.com/140/140/any'
            };
        } else {
            userData = {
                name: `${user.firstName} ${user.lastName}`,
                _id: user.id,
                avatar: 'https://placeimg.com/140/140/any'
            };
        }

        message = {
            text: message.content,
            createdAt: message.created,
            _id: i,
            user: userData
        };
        messages.push(message);
    });
    
    return {
        otherUser: user,
        user: state.auth,
        messages,
        threadID: id
    };
};

const Messages = connect(mapStateToProps, {})(comp);
export { Messages };
