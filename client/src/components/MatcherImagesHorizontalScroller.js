import React, { Component } from 'react';
import { TouchableOpacity, ActivityIndicator, View, FlatList, Platform, Alert } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Container } from 'native-base';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { scale } from '../common';
import { startChatting } from '../actions';

const width = scale(100);

class MatcherImagesHorizontalScroller extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingData: props.loadingData,
            users: props.users,
            user: props.user,
            refreshing: props.refreshing
        };
    }

    componentWillReceiveProps(nextProps) {
        const { loadingData, users, user, refreshing } = nextProps;
        this.setState({ loadingData, users, user, refreshing });
    }

    listEmptyComponent = () => {
        return (
            <View />
        );
    }

    // <View
    //     style={{
    //         flex: 0,
    //         paddingLeft: scale(1),
    //         paddingRight: scale(1),
    //         backgroundColor: '#2B2B2B',
    //         borderRadius: width / 2,
    //     }}
    // >
    //     <Avatar
    //         height={width - scale(3)}
    //         width={width - scale(3)}
    //         rounded
    //         title='?'
    //         overlayContainerStyle={{
    //         }}
    //         activeOpacity={0.7}
    //     />
    // </View>

    keyExtractor = (item) => item.id;

    sendMessage = (user) => {
        startChatting(user.id, err => {
            if (err) return Alert.alert('something went wrong');
            Alert.alert('click on there name below to chat');
        });
    }

    renderCard = (user) => {
        const { images, firstName, lastName } = user.item;
        return (
            <View
                style={{
                    flex: 0,
                    paddingLeft: scale(5),
                    paddingRight: scale(5)
                }}
            >
                <Avatar
                    height={width}
                    width={width}
                    rounded
                    source={{ uri: images[0] }}
                    onPress={
                        () => {
                            Alert.alert(
                                `Message ${firstName} ${lastName}?`,
                                '',
                                [
                                    { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                                    { text: 'OK', onPress: () => this.sendMessage(user.item) },
                                ]
                            );
                        }
                    }
                    activeOpacity={0.7}
                />
            </View>
        );
    }

    render() {
        return (
            <View 
                style={{ 
                    height: width + scale(20), 
                    paddingLeft: scale(19), 
                    paddingRight: scale(19),
                    paddingTop: scale(19)
                }}
            >
                <FlatList
                    data={this.state.users}
                    ListEmptyComponent={this.listEmptyComponent}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderCard}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        );
    }
}

MatcherImagesHorizontalScroller.propTypes = {
    users: PropTypes.array.isRequired,
    getData: PropTypes.func.isRequired,
    loadingData: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    refreshing: PropTypes.bool.isRequired,
    onRefresh: PropTypes.func.isRequired
};

export default connect(null)(MatcherImagesHorizontalScroller);
