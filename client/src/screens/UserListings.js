import _ from 'lodash';
import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Container, Header, Body, Title } from 'native-base';
import { connect } from 'react-redux';

import ListingCardFlatListScroller from '../components/ListingCardFlatListScroller';
import { getUserListings } from '../actions';

class UserListingsComp extends Component {
    state = {
        loadingData: true
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        if (!this.state.loadingData) {
            this.setState({ loadingData: true });
        }
        
        this.props.getUserListings(this.props.user, (err) => {
            if (err) { 
                Alert.alert('unable to fetch data');
            }
            this.setState({ loadingData: false });
        });
    }

    mapListings = () => {
        const { userListings } = this.props;
        return _.map(userListings, listing => {
            return listing;
        });
    }

    render() {
        const listings = this.mapListings();
        return (
            <Container style={{ flex: 1 }}>
                <Header style={{ height: 75 }}>
                    <Body style={{ alignItems: 'center' }}>
                        <Title>Your Listings</Title>
                    </Body>
                </Header>

                <ListingCardFlatListScroller 
                    listings={listings}
                    user={this.props.user}
                    loadingData={false}
                    getData={() => {}}
                    navigation={this.props.navigation}
                    refreshing={this.state.loadingData}
                    onRefresh={this.getData}
                />
            </Container>
        );
    }
}

const matchStateToProps = (state) => {
    return {
        userListings: state.userListings,
        user: state.auth
    };
};

const UserListings = connect(matchStateToProps, { getUserListings })(UserListingsComp);

export { UserListings };
