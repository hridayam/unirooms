import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator, ScrollView, StyleSheet, Platform } from 'react-native';
import { Container, Content, Header, Left, Body, Right, List, ListItem, SearchBar, Text, Thumbnail, Icon, Title, Button, Form, Item, Input, Label } from 'native-base';
import { ImagePicker, Permissions } from 'expo';
import { Entypo, FontAwesome, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Dialog, { DialogTitle, DialogContent, ScaleAnimation } from 'react-native-popup-dialog';
import { connect } from 'react-redux';
import moment from 'moment';

import { getAllMessages } from '../actions';

class comp extends Component {
    constructor(props) {
        super(props);

        this.getMessages();
        this.state = {
            loading: true,
            data: [],
            page: 1,
            seed: 1,
            refreshing: false
        };
    }

    getMessages = () => {
        this.props.getAllMessages(() => {
            this.setState({ loading: false });
        });
    }

    render() {
        const items = this.props.messages;

        return (
            this.state.loading ? 
            <View style={styles.loadingContainer}>
                <ActivityIndicator size={Platform.OS === 'ios' ? 'large' : 100} />
            </View> :
            <Container style={{ flex: 1 }}>
                <Header style={{ height: 75 }}>
                    <Body style={{ alignItems: 'center' }}>
                        <Title>Chat</Title>
                    </Body>
                </Header>

                <ScrollView style={styles.containerStyle}>
                    <List 
                        dataArray={items}
                        renderRow={(item) => {
                            const date = item.thread[0].created;
                            return (
                                <ListItem 
                                    avatar
                                    onPress={() => {
                                        const { navigate } = this.props.navigation;
                                        navigate('Messages', {
                                            title: `${item.user.firstName} ${item.user.lastName}`,
                                            item
                                        });
                                    }}
                                >
                                    <Left>
                                        <Thumbnail 
                                            source={{ 
                                                uri: 'http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png' 
                                            }} 
                                        />
                                    </Left>
                                    <Body>
                                        <Text>{item.user.firstName} {item.user.lastName}</Text>
                                        <Text note>{item.thread[0].content}</Text>
                                    </Body>
                                    <Right>
                                        <Text note>
                                            {moment(date).format('HH[:]mm')}
                                        </Text>
                                    </Right>
                                </ListItem>
                            );   
                        }}
                    />
                </ScrollView>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: '#fff'
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    }
});

const mapStateToProps = (state) => {
    return {
        messages: state.messages
    };
};

const FriendsList = connect(mapStateToProps, { getAllMessages })(comp);

export { FriendsList };
