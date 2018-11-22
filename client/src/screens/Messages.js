import React, { Component } from 'react';
import { 
    KeyboardAvoidingView, Platform
} from 'react-native';
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
        return (
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
