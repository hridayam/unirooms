import _ from 'lodash';
import React, { Component } from 'react';
import { TouchableOpacity, ActivityIndicator, View, Alert, FlatList, Platform, Text } from 'react-native';
import { Container, Header, Left, Right, Body, Title, Button } from 'native-base';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import moment from 'moment';
import SwitchSelector from 'react-native-switch-selector';

//import { ListingsViewCardComponent } from '../common';
import { getReservations } from '../actions';
import ListingCardFlatListScroller from '../components/ListingCardFlatListScroller';

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

    mapListings = () => {
        const { listings } = this.props;
        return _.map(listings, listing => {
            return listing;
        });
    }

    switchToRoommates = async () => {
        await new Promise(resolve => setTimeout(resolve, 360));
        this.props.navigation.navigate('Roommates');
    }

    render() {
        const listings = this.mapListings();
        return (
            <Container style={{ flex: 1 }}>
                <Header style={{ height: 120, zIndex: -1 }}>
                    <Body style={{ flex: 1, alignItems: 'center', marginTop: 45 }}>
                        <SwitchSelector
                            initial={0}
                            onPress={() => this.switchToRoommates()}
                            textColor={'#1F355D'}
                            selectedColor={'white'}
                            buttonColor={'#1F355D'}
                            borderColor={'#1F355D'}
                            hasPadding
                            animationDuration={325}
                            fontSize={16}
                            options={[
                                { label: 'Rooms', value: 'Rooms' },
                                { label: 'Roommates', value: 'Roommates' }
                            ]} 
                        />
                    </Body>
                </Header>

                <Header transparent style={{ height: 75, marginTop: -120, zIndex: 1 }}>
                    <Body style={{ flex: 1, alignItems: 'center' }}>
                        <Title>SJSU</Title>
                    </Body>
                </Header>

                <Header transparent style={{ height: 75, marginTop: -120, zIndex: 1 }}>
                    <Left style={{ flex: 1 }}>
                        <Button 
                            transparent
                            style={{ marginLeft: 3 }}
                            onPress={() => this.props.navigation.navigate('Form')}
                        >
                            <MaterialIcons name="library-add" size={30} />
                        </Button>
                    </Left>
                    <Body style={{ flex: 1 }} />
                    <Right style={{ flex: 1 }}>
                        <Button 
                            transparent
                        >
                            <FontAwesome name="sliders" size={30} />
                        </Button>
                    </Right>
                </Header>

                <ListingCardFlatListScroller
                    style={{ paddingVertical: 10 }}
                    listings={listings}
                    user={this.props.user}
                    loadingData={this.state.loadingData}
                    getData={this.getData}
                    navigation={this.props.navigation}
                    refreshing={false}
                    onRefresh={() => {}}
                />
            </Container>
        );
    }
}

const matchStateToProps = (state) => {
    return {
        listings: state.listings,
        user: state.auth
    };
};

const ListingsCardList = connect(matchStateToProps, { getReservations })(ListingsCardListComp);

export { ListingsCardList };

/* <FlatList
    data={listings}
    ListEmptyComponent={this.listEmptyComponent}
    keyExtractor={this.keyExtractor}
    renderItem={this.renderCard}
    onEndReachedThreshold={Platform.OS === 'android' ? 0.01 : -0.15}
    onEndReached={() => this.getData()}
    ListFooterComponent={this.renderFooter(this.state.loadingData)}
/> */

    // keyExtractor = (item, index) => item.id;

    // listEmptyComponent = () => <View />

    // mapListings = () => {
    //     const { listings } = this.props;
    //     return _.map(listings, listing => {
    //         return listing;
    //     });
    // }

    // renderCard = (listing) => {
    //     const { user, date, images, listingTitle, 
    //         streetAddress, housingType, beds, 
    //         baths, rentingPrice
    //     } = listing.item;
    //     return (
    //         <TouchableOpacity 
    //             key={listing.id}
    //             activeOpacity={0.4} 
    //             onPress={() => this.props.navigation.navigate('Details', {
    //                 id: listing.item.id,
    //                 liked: this.props.user.favorites.includes(listing.item.id)
    //             })} 
    //         >
    //             <ListingsViewCardComponent 
    //                 posterName={`${user.firstName} ${user.lastName}`}
    //                 postDate={moment(date).format('MMM D, YYYY')}
    //                 posterImageSource='https://i.kym-cdn.com/entries/icons/medium/000/009/754/PhotogenicGuy.jpg'
    //                 imageSource={images[0]} 
    //                 title={listingTitle}
    //                 streetAddress={streetAddress}
    //                 housingType={housingType}
    //                 rentingPrice={rentingPrice}
    //                 beds={beds}
    //                 baths={baths}
    //             />
    //         </TouchableOpacity>
    //     );
    // }

    // renderFooter = (loadingData) => {
    //     if (loadingData) {
    //         return <ActivityIndicator size="large" />;
    //     }
    // }
