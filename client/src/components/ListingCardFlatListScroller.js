import React, { Component } from 'react';
import { TouchableOpacity, ActivityIndicator, View, FlatList, Platform } from 'react-native';
import { Container } from 'native-base';
import moment from 'moment';
import PropTypes from 'prop-types';

import { ListingsViewCardComponent } from '../common';

class ListingCardFlatListScroller extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingData: props.loadingData,
            listings: props.listings,
            user: props.user,
            refreshing: props.refreshing
        };
    }

    componentWillReceiveProps(nextProps) {
        const { loadingData, listings, user, refreshing } = nextProps;
        this.setState({ loadingData, listings, user, refreshing });
    }

    listEmptyComponent = () => <View />

    keyExtractor = (item) => item.id;

    renderCard = (listing) => {
        const { user, date, images, listingTitle, 
            streetAddress, housingType, beds, 
            baths, rentingPrice
        } = listing.item;
        return (
            <TouchableOpacity 
                key={listing.id}
                style={{ paddingVertical: 5 }}
                activeOpacity={0.4} 
                onPress={() => this.props.navigation.navigate('Details', {
                    id: listing.item.id,
                    listing: listing.item,
                    liked: this.state.user.favorites.includes(listing.item.id)
                })} 
            >
                <ListingsViewCardComponent 
                    posterName={`${user.firstName} ${user.lastName}`}
                    postDate={moment(date).format('MMM D, YYYY')}
                    posterImageSource='https://i.kym-cdn.com/entries/icons/medium/000/009/754/PhotogenicGuy.jpg'
                    imageSource={images[0]} 
                    title={listingTitle}
                    streetAddress={streetAddress}
                    housingType={housingType}
                    rentingPrice={rentingPrice}
                    beds={beds}
                    baths={baths}
                />
            </TouchableOpacity>
        );
    }

    renderFooter = (loadingData) => {
        if (loadingData) {
            return <ActivityIndicator size="large" />;
        }
    }

    render() {
        return (
            <Container style={{ flex: 1 }}>
                <FlatList
                    data={this.state.listings}
                    ListEmptyComponent={this.listEmptyComponent}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderCard}
                    onEndReachedThreshold={Platform.OS === 'android' ? 0.01 : -0.15}
                    onEndReached={() => this.props.getData()}
                    onRefresh={() => this.props.onRefresh()}
                    refreshing={this.state.refreshing}
                    ListFooterComponent={this.renderFooter(this.state.loadingData)}
                />
            </Container>
        );
    }
}

ListingCardFlatListScroller.propTypes = {
    listings: PropTypes.array.isRequired,
    getData: PropTypes.func.isRequired,
    loadingData: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    refreshing: PropTypes.bool.isRequired,
    onRefresh: PropTypes.func.isRequired
};

export default ListingCardFlatListScroller;
