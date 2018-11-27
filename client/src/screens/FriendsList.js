import _ from 'lodash';
import React, { Component } from 'react';
import { 
    View, FlatList, ActivityIndicator, 
    ScrollView, StyleSheet, Platform
} from 'react-native';
// import { 
//     List, ListItem, SearchBar, 
//     Left, Thumbnail, Body, Right, Text 
// } from 'native-base';
import { connect } from 'react-redux';
import { List, ListItem } from 'react-native-elements';
import moment from 'moment';

import { getAllMessages } from '../actions';

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
    }

    getMessages = () => {
        this.props.getAllMessages(() => {
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

    renderRow = ({ item }) => {
        console.log(item);
        const date = item.thread[0].created;
        console.log(date);
        return (
            <ListItem
                roundAvatar
                title={`${item.user.firstName} ${item.user.lastName}`}
                subtitle={item.thread[0].content}
                avatar={{ 
                    uri: item.user.images ? item.user.images[0] : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6dz9gihQ9k_G92EryW9SlmPr5GmPRZxYF_ouPWLaZ4MiBw7fw' 
                }}
                rightTitle={moment(date).format('HH[:]mm')}
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
        console.log('messages', messages);
        return (
            <List>
                <FlatList
                    data={messages}
                    renderItem={this.renderRow}
                    ListEmptyComponent={this.listEmptyComponent}
                    keyExtractor={this.keyExtractor}
                    ListFooterComponent={this.renderFooter(this.state.loading)}
                />
            </List>
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
    console.log('inside state', state.messages);
    return {
        messages: state.messages
    };
};

const FriendsList = connect(mapStateToProps, { getAllMessages })(FriendsListComp);

export { FriendsList };
