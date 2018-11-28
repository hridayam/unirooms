import _ from 'lodash';
import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator, ScrollView, StyleSheet, Platform } from 'react-native';
import { Container, Content, Header, Left, Body, Right, SearchBar, Thumbnail, Icon, Title, Button, Form, Item, Input, Label } from 'native-base';
import { ImagePicker, Permissions } from 'expo';
import { Entypo, FontAwesome, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Dialog, { DialogTitle, DialogContent, ScaleAnimation } from 'react-native-popup-dialog';
import { connect } from 'react-redux';
import { List, ListItem, Text } from 'react-native-elements';
import moment from 'moment';

import { getAllMessages, getMatchedUsers } from '../actions';
import MatcherImagesHorizontalScroller from '../components/MatcherImagesHorizontalScroller';
import { moderateScale } from '../common';

class FriendsListComp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            data: [],
            page: 1,
            seed: 1,
            refreshing: false
        };
    }

    componentDidMount() {
        this.getMessages();
        this.getMatches();
    }

    getMessages = () => {
        this.props.getAllMessages(() => {
            this.setState({ loading: false });
        });
    }

    getMatches = () => {
        this.props.getMatchedUsers(() => {
            this.setState({ loading: false });
        });
    }

    keyExtractor = (item, index) => item.id;

    listEmptyComponent = () => <View />
    
    mapMessages = () => {
        const { messages } = this.props;
        return _.map(messages, message => {
            return message;
        });
    }

    mapMatchedUsers = (messages) => {
        const { matchedUsers } = this.props;
        const data = [];
        _.map(matchedUsers, user => {
            if (messages === []) {
                data.push(user);
            } else {
                let approved = true;
                messages.forEach(message => {
                    if (message.user.id === user.id) {
                        approved = false;
                    }
                });

                if (approved) {
                    data.push(user);
                }
            }
        });
        return data;
    }

    renderRow = ({ item }) => {
        const date = item.thread[0] ? moment(item.thread[0].created).format('HH[:]mm') : ' ';
        const subtitle = item.thread[0] ? item.thread[0].content : 'Click here to chat';
        return (
            <ListItem
                roundAvatar
                title={`${item.user.firstName} ${item.user.lastName}`}
                subtitle={subtitle}
                avatar={{ 
                    uri: item.user.images ? item.user.images[0] : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6dz9gihQ9k_G92EryW9SlmPr5GmPRZxYF_ouPWLaZ4MiBw7fw' 
                }}
                rightTitle={date}
                onPress={() => {
                    const { navigate } = this.props.navigation;
                    navigate('Messages', {
                        title: `${item.user.firstName} ${item.user.lastName}`,
                        item
                    });
                }}
            />
        );
    }

    renderFooter = (loadingData) => {
        if (loadingData) {
            return <ActivityIndicator size="large" />;
        }
    }

    render() {
        const messages = this.mapMessages();
        const matchedUsers = this.mapMatchedUsers(messages);
        return (
            <Container style={{ flex: 1 }}>
                <Header style={{ height: 75 }}>
                    <Body style={{ alignItems: 'center' }}>
                        <Title>Chat</Title>
                    </Body>
                </Header>

                <MatcherImagesHorizontalScroller
                    users={matchedUsers}
                    loadingData={false}
                    refreshing={false}
                    getData={() => {}}
                    onRefresh={() => {}}
                    user={this.props.user}
                    navigation={this.props.navigation}
                />

                <List>
                    <FlatList
                        data={messages}
                        renderItem={this.renderRow}
                        ListEmptyComponent={this.listEmptyComponent}
                        keyExtractor={this.keyExtractor}
                        ListFooterComponent={this.renderFooter(this.state.loading)}
                    />
                </List>
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
        messages: state.messages,
        matchedUsers: state.matchedUsers,
        user: state.auth
    };
};

const FriendsList = connect(mapStateToProps, { getAllMessages, getMatchedUsers })(FriendsListComp);

export { FriendsList };
