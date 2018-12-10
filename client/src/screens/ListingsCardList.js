import _ from 'lodash';
import React, { Component } from 'react';
import { TouchableOpacity, ActivityIndicator, View, Alert, FlatList, Platform, Text, StyleSheet, Dimensions } from 'react-native';
import { Container, Header, Left, Right, Body, Title, Button } from 'native-base';
import { FontAwesome, MaterialIcons, Ionicons, Foundation } from '@expo/vector-icons';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import moment from 'moment';
import Modal from 'react-native-modal';

//import { ListingsViewCardComponent } from '../common';
import { getReservations } from '../actions';
import ListingCardFlatListScroller from '../components/ListingCardFlatListScroller';

class ListingsCardListComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingData: true,
            visibleModal: false
        };
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

    render() {
        const listings = this.mapListings();
        return (
            <Container style={{ flex: 1 }}>
                <Modal
                    animationIn='slideInDown'
                    animationOut='slideOutUp'
                    animationInTiming={500}   
                    animationOutTiming={500}
                    isVisible={this.state.visibleModal === true}
                    style={{ justifyContent: 'flex-start', margin: 0 }}
                    onBackdropPress={() => { this.setState({ visibleModal: false }); }}
                >
                    <View style={styles.modalContent}>
                        <Grid>
                            <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Button
                                    transparent
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'column'
                                    }}
                                    onPress={() => {
                                        this.setState({ visibleModal: false });
                                    }}
                                >
                                    <Ionicons name="ios-home" size={60} color='#E5A823' />
                                    <Text style={{ fontFamily: 'headerFont', fontSize: 40, color: '#E5A823' }}>
                                        Rooms
                                    </Text>
                                </Button>
                            </Row>
                            <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Button
                                    transparent
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'column'
                                    }}
                                    onPress={() => {
                                        this.setState({ visibleModal: false });
                                        this.props.navigation.navigate('Roommates');
                                    }}
                                >
                                    <Foundation name="torsos-all" size={60} color='#E5A823' />
                                    <Text style={{ fontFamily: 'headerFont', fontSize: 40, color: '#E5A823' }}>
                                        Roommmates
                                    </Text>
                                </Button>
                            </Row>
                            <Row>
                                <Button
                                    transparent
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'column'
                                    }}
                                    onPress={() => {
                                        this.setState({ visibleModal: false });
                                    }}
                                >
                                    <Ionicons name="ios-close" size={40} color='#E5A823' style={{ marginTop: 80 }} />
                                    <Text style={{ fontFamily: 'headerFont', fontSize: 22, color: '#E5A823' }}>
                                        Cancel
                                    </Text>
                                </Button>
                            </Row>
                        </Grid>
                    </View>
                </Modal>

                <Header style={{ height: 95, backgroundColor: '#0055A2', top: 0, right: 0, bottom: 0, left: 0, zIndex: -1 }} />

                <Header transparent style={{ height: 75, marginTop: -95, top: 0, right: 0, bottom: 0, left: 0, zIndex: 1 }}>
                    <Body style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontFamily: 'headerFont', fontSize: 26, color: '#E5A823' }}>San Jose State</Text>
                    </Body>
                </Header>

                <Header transparent style={{ height: 75, marginTop: -95, top: 0, right: 0, bottom: 0, left: 0, zIndex: 2 }}>
                    <Left style={{ flex: 1 }}>
                        <Button
                            transparent
                            style={{ marginLeft: 3 }}
                            onPress={() => this.props.navigation.navigate('Form')}
                        >
                            <MaterialIcons name="library-add" size={30} color='white' />
                        </Button>
                    </Left>
                    <Body style={{ flex: 1, alignItems: 'center', marginTop: 50, zIndex: 2 }}>
                        <Button 
                            transparent 
                            style={{ width: 100, height: 80, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => this.setState({ visibleModal: true })}
                        >
                            <Ionicons name="ios-arrow-down" size={25} color='#E5A823' style={{ marginTop: 15 }} />
                        </Button>
                    </Body>
                    <Right style={{ flex: 1 }}>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate('Filter')}
                        >
                            <FontAwesome name="sliders" size={30} color='white' />
                        </Button>
                    </Right>
                </Header>

                <ListingCardFlatListScroller
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

const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: '#0055A2',
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)'
    }
});

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
