import _ from 'lodash';
import React, { Component } from 'react';
import { TouchableOpacity, ActivityIndicator, View, Alert, FlatList, Platform } from 'react-native';
import { Container, Header, Left, Right, Body, Title, Button } from 'native-base';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import moment from 'moment';

import { ListingsViewCardComponent } from '../common';
import { getReservations } from '../actions';

class ListingsCardListComp extends Component {
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
        
        this.props.getReservations((err) => {
            if (err) { 
                Alert.alert('unable to fetch data');
            }
            this.setState({ loadingData: false });
        });
    }

    keyExtractor = (item, index) => item.id;

    listEmptyComponent = () => <View />

    mapListings = () => {
        const { listings } = this.props;
        return _.map(listings, listing => {
            return listing;
        });
    }

    renderCard = (listing) => {
        const { user, date, images, listingTitle, 
            streetAddress, housingType, beds, 
            baths, rentingPrice
        } = listing.item;
        return (
            <TouchableOpacity 
                key={listing.id}
                activeOpacity={0.4} 
                onPress={() => this.props.navigation.navigate('Details', {
                    id: listing.item.id
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
        const listings = this.mapListings();
        return (
            <Container style={{ flex: 1 }}>
                <Header style={{ height: 75 }}>
                    <Left style={{ flex: 1 }}>
                        <Button 
                            transparent
                            style={{ marginLeft: 3 }}
                            onPress={() => this.props.navigation.navigate({ routeName: 'Form', transitionStyle: 'inverted' })}
                        >
                            <MaterialIcons name="library-add" size={30} />
                        </Button>
                    </Left>
                    <Body style={{ flex: 1, alignItems: 'center' }}>
                        <Title>SJSU</Title>
                    </Body>
                    <Right style={{ flex: 1 }}>
                        <Button 
                            transparent
                        >
                            <FontAwesome name="sliders" size={30} />
                        </Button>
                    </Right>
                </Header>

                <FlatList
                    data={listings}
                    ListEmptyComponent={this.listEmptyComponent}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderCard}
                    onEndReachedThreshold={Platform.OS === 'android' ? 0.01 : -0.15}
                    onEndReached={() => this.getData()}
                    ListFooterComponent={this.renderFooter(this.state.loadingData)}
                />
            </Container>
        );
    }
}

const matchStateToProps = (state) => {
    return {
        listings: state.listings
    };
};

const ListingsCardList = connect(matchStateToProps, { getReservations })(ListingsCardListComp);

export { ListingsCardList };
