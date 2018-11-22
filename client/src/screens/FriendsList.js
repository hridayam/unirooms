import React, { Component } from 'react';
import { 
    View, FlatList, ActivityIndicator, 
    ScrollView, StyleSheet, Platform
} from 'react-native';
import { 
    List, ListItem, SearchBar, 
    Left, Thumbnail, Body, Right, Text 
} from 'native-base';
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
            <ScrollView style={styles.containerStyle}>
                <List 
                    dataArray={items}
                    renderRow={(item) => {
                        const date = item.thread[item.thread.length - 1].created;
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
                                    <Text note>{item.thread[item.thread.length - 1].content}</Text>
                                </Body>
                                <Right>
                                    <Text note>
                                        {moment(date).format('LTS')}
                                    </Text>
                                </Right>
                            </ListItem>
                        );   
                    }}
                />
            </ScrollView>
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
