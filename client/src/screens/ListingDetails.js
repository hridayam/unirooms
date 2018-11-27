import React, { Component } from 'react';
import { Text, Image, View, Dimensions, StyleSheet } from 'react-native';
import { Container, Content, Header, Left, Body, Right, Icon, Title, Button, Thumbnail, Card, CardItem } from 'native-base';
import { Entypo, FontAwesome, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Dialog, { DialogTitle, DialogContent, ScaleAnimation } from 'react-native-popup-dialog';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Slick from 'react-native-slick';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import moment from 'moment';

const { width } = Dimensions.get('window');

const renderPagination = (index, total, context) => {
  return (
    <View 
        style={{
          position: 'absolute',
          bottom: 10,
          right: 10
        }}
    >
        <Text style={{ color: 'black', fontSize: 18, fontWeight: '500' }}>
            <Text style={{ color: 'white', fontSize: 24, fontWeight: '500' }}>
                {index + 1}
            </Text>
            /{total}
        </Text>
    </View>
  );
};

class ListingDetailsComp extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isFavorited: false,
        scaleAnimationDialog: false
      };
    }

    renderImages = () => {
        const imagesView = [];
        const { images } = this.props.listing;
        images.forEach((image, i) => {
            imagesView.push(
                <View key={i} style={styles.slide}>
                    <Image style={styles.image} source={{ uri: image }} />
                </View>
            );
        });
        return (imagesView);
    };

    render() {
        const { goBack } = this.props.navigation;
        const { user, date, listingTitle, 
            streetAddress, housingType, beds, 
            baths, rentingPrice, listingDescription, location,
            parking, pets, squarefeet, laundry, airConditioning
        } = this.props.listing;
        const { latitude, longitude } = location;
        const userName = `${user.firstName} ${user.lastName}`;
        const displayDate = moment(date).format('MMM D, YYYY');

        return (
            <Container style={{ flex: 1 }}>
                <Header style={{ height: 75 }}>
                    <Left style={{ flex: 1 }}>
                        <Button 
                            transparent
                            style={{ marginLeft: 3 }}
                            onPress={() => goBack()}
                        >
                            <Ionicons name="md-arrow-round-back" size={30} />
                        </Button>
                    </Left>
                    <Body style={{ flex: 1, alignItems: 'center' }}>
                        <Title>Details</Title>
                    </Body>
                    <Right style={{ flex: 1 }}>
                        {
                            this.state.isFavorited === false ?
                                 <Button 
                                    transparent
                                    onPress={() => this.setState({ scaleAnimationDialog: true, isFavorited: true })}
                                >
                                    <FontAwesome name="heart-o" size={30} />
                                </Button>
                            :
                            <Button 
                                transparent
                                onPress={() => this.setState({ isFavorited: false })}
                            >
                                <FontAwesome name="heart" size={30} style={{ color: '#cc0000' }} />
                            </Button>
                        }
                    </Right>
                </Header>

                <Content>
                    <View>
                        <Card transparent>
                            <CardItem>
                                <Left>
                                    <Thumbnail source={{ uri: 'https://i.kym-cdn.com/entries/icons/medium/000/009/754/PhotogenicGuy.jpg' }} />
                                    <Body>
                                        <Text style={{ fontSize: 20, paddingBottom: 3, fontWeight: '600' }}>
                                            {userName}
                                        </Text>
                                        <Text note>Posted {displayDate}</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                        </Card>
                    
                        <Slick 
                            height={240}
                            renderPagination={renderPagination}
                            paginationStyle={{ bottom: -23, left: null, right: 10 }} 
                            showsButtons
                            loop={false}
                        >
                            {this.renderImages()}
                        </Slick>

                        <Card transparent>
                            <CardItem>
                                <Grid style={{ width: '100%' }}>
                                    <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Text 
                                            style={{ 
                                                fontSize: 25, 
                                                fontWeight: '600', 
                                                textAlign: 'center', 
                                                width: '100%' 
                                            }}
                                        >
                                            {listingTitle}
                                        </Text>
                                    </Row>
                                    <Row style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 5 }}>               
                                        <Text note style={{ textAlign: 'center' }}>
                                            {streetAddress}
                                        </Text>
                                    </Row>
                                    <Row style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 5 }}>
                                        <Text note style={{ fontWeight: '900', textAlign: 'center' }}>
                                            ${rentingPrice} Per Month
                                        </Text>
                                    </Row>
                                </Grid>
                            </CardItem>

                            <CardItem>
                                <Body style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text note style={{ textAlign: 'justify' }}>
                                        {listingDescription}
                                    </Text>
                                </Body>
                            </CardItem>

                            <CardItem>
                                <Body>
                                    <Body>
                                        <Text style={styles.seperatorTitle}>
                                            Features
                                        </Text>
                                    </Body>
                                </Body>
                            </CardItem>

                            <CardItem>
                                <Body>
                                    <Body>
                                        <Grid style={{ width: '100%' }}>
                                            <Col size={50}>
                                                <Row style={{ paddingBottom: 10 }}>
                                                    <Col size={10} />
                                                    <Col size={30} style={styles.colIcon}>
                                                        <MaterialCommunityIcons name="home-modern" size={30} />
                                                    </Col>
                                                    <Col size={60} style={styles.colDetail}>
                                                        <Text style={{ fontSize: 15, fontWeight: '600' }}>Type</Text>
                                                        <Text style={{ fontSize: 12 }}>{housingType}</Text>
                                                    </Col>
                                                </Row>
                                                <Row style={{ paddingBottom: 10 }}>
                                                    <Col size={10} />
                                                    <Col size={30} style={styles.colIcon}>
                                                        <FontAwesome name="bed" size={30} />
                                                    </Col>
                                                    <Col size={60} style={styles.colDetail}>
                                                        <Text style={{ fontSize: 15, fontWeight: '600' }}>Beds</Text>
                                                        <Text style={{ fontSize: 12 }}>{beds}</Text>
                                                    </Col>
                                                </Row>
                                                <Row style={{ paddingBottom: 10 }}>
                                                    <Col size={10} />
                                                    <Col size={30} style={styles.colIcon}>
                                                        <MaterialIcons name="local-laundry-service" size={30} />
                                                    </Col>
                                                    <Col size={60} style={styles.colDetail}>
                                                        <Text style={{ fontSize: 15, fontWeight: '600' }}>Laundry</Text>
                                                        <Text style={{ fontSize: 12 }}>{laundry}</Text>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col size={10} />
                                                    <Col size={30} style={styles.colIcon}>
                                                        <MaterialCommunityIcons name="air-conditioner" size={30} />
                                                    </Col>
                                                    <Col size={60} style={styles.colDetail}>
                                                        <Text style={{ fontSize: 15, fontWeight: '600' }}>A/C</Text>
                                                        <Text style={{ fontSize: 12 }}>{airConditioning}</Text>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col size={50}>
                                                <Row style={{ paddingBottom: 10 }}>
                                                    <Col size={10} />
                                                    <Col size={30} style={styles.colIcon}>
                                                        <Entypo name="ruler" size={30} />
                                                    </Col>
                                                    <Col size={60} style={styles.colDetail}>
                                                        <Text style={{ fontSize: 15, fontWeight: '600' }}>SqFt</Text>
                                                        <Text style={{ fontSize: 12 }}>{squarefeet}</Text>
                                                    </Col>
                                                </Row>
                                                <Row style={{ paddingBottom: 10 }}>
                                                    <Col size={10} />
                                                    <Col size={30} style={styles.colIcon}>
                                                        <FontAwesome name="bathtub" size={30} />
                                                    </Col>
                                                    <Col size={60} style={styles.colDetail}>
                                                        <Text style={{ fontSize: 15, fontWeight: '600' }}>Baths</Text>
                                                        <Text style={{ fontSize: 12 }}>{baths}</Text>
                                                    </Col>
                                                </Row>
                                                <Row style={{ paddingBottom: 10 }}>
                                                    <Col size={10} />
                                                    <Col size={30} style={styles.colIcon}>
                                                        <MaterialCommunityIcons name="parking" size={30} />
                                                    </Col>
                                                    <Col size={60} style={styles.colDetail}>
                                                        <Text style={{ fontSize: 15, fontWeight: '600' }}>Parking</Text>
                                                        <Text style={{ fontSize: 12 }}>{parking}</Text>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col size={10} />
                                                    <Col size={30} style={styles.colIcon}>
                                                        <MaterialIcons name="pets" size={30} />
                                                    </Col>
                                                    <Col size={60} style={styles.colDetail}>
                                                        <Text style={{ fontSize: 15, fontWeight: '600' }}>Pets</Text>
                                                        <Text style={{ fontSize: 12 }}>{pets}</Text>
                                                    </Col>
                                                </Row>

                                            </Col>
                                        </Grid>
                                    </Body>
                                </Body>
                            </CardItem>

                            <CardItem>
                                <Body>
                                    <Body>
                                        <Text style={styles.seperatorTitle}>
                                            Location
                                        </Text>
                                    </Body>
                                </Body>
                            </CardItem>

                            <CardItem style={{ height: 350, top: 5 }}>
                                <MapView
                                    style={StyleSheet.absoluteFillObject}
                                    initialRegion={{
                                        latitude,
                                        longitude,
                                        latitudeDelta: 0.0922,
                                        longitudeDelta: 0.0421
                                    }}
                                >
                                    <MapView.Marker
                                        coordinate={{
                                            latitude,
                                            longitude
                                        }}
                                        title={'Title'}
                                        description={'Street/Description'}
                                    /> 
                                </MapView>
                            </CardItem>
                        </Card>
                    </View>
                </Content>

                <Dialog
                    onDismiss={() => {
                      this.setState({ scaleAnimationDialog: false });
                    }}
                    onTouchOutside={() => {
                      this.setState({ scaleAnimationDialog: false });
                    }}
                    visible={this.state.scaleAnimationDialog}
                    dialogTitle={<DialogTitle title="Added to your Favorites!" />}
                    dialogAnimation={
                        new ScaleAnimation({ toValue: 0, animationDuration: 500, useNativeDriver: true })
                    }
                >
                    <DialogContent style={{ justifyContent: 'center', alignItems: 'center', marginTop: 25 }}>
                      <MaterialCommunityIcons name="home-heart" style={{ color: '#cc0000' }} size={75} />
                    </DialogContent>
                </Dialog>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    image: {
        width,
        flex: 1
    },
    colIcon: {
        justifyContent: 'space-evenly'
    },
        colDetail: {
        alignItems: 'flex-start', 
    },
        seperatorTitle: {
        fontSize: 22, 
        fontWeight: '600', 
        justifyContent: 'center', 
        textAlign: 'center', 
        paddingTop: 10
    }

});

const mapStateToProps = (state, props) => {
    const { id } = props.navigation.state.params;
    return {
        listing: state.listings[id]
    };
};

const ListingDetails = connect(mapStateToProps)(ListingDetailsComp);

export { ListingDetails };
