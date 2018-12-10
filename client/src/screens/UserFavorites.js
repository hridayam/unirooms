import _ from 'lodash';
import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Container, Header, Body, Text } from 'native-base';
import { connect } from 'react-redux';

import ListingCardFlatListScroller from '../components/ListingCardFlatListScroller';
import { getFavorites } from '../actions';

class UserFavoritesComp extends Component {
    state = {
        loadingData: true,
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        if (!this.state.loadingData) {
            this.setState({ loadingData: true });
        }
        
        this.props.getFavorites(this.props.user.favorites, (err) => {
            if (err) { 
                Alert.alert('unable to fetch data');
            }
            this.setState({ loadingData: false });
        });
    }

    mapListings = () => {
        const { favoriteListings } = this.props;
        return _.map(favoriteListings, listing => {
            return listing;
        });
    }

    render() {
        const listings = this.mapListings();
        return (
            <Container style={{ flex: 1 }}>
                <Header style={{ height: 75, backgroundColor: '#0055A2' }}>
                    <Body style={{ alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'headerFont', fontSize: 26, color: '#E5A823' }}>Your Favorites</Text>
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
                    onPressButton={this.getData}
                />
            </Container>
        );
    }
}

const matchStateToProps = (state) => {
    return {
        favoriteListings: state.favoriteListings,
        user: state.auth
    };
};

const UserFavorites = connect(matchStateToProps, { getFavorites })(UserFavoritesComp);

export { UserFavorites };
