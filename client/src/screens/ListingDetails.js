import React, { Component } from 'react';
import { Text, Image, View, Dimensions, StyleSheet } from 'react-native';
import { Container, Content, Header, Left, Body, Right, Icon, Title, Button, Thumbnail, Card, CardItem } from 'native-base';
import { Entypo, FontAwesome, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Slick from 'react-native-slick';
import { MapView } from 'expo';

const { width } = Dimensions.get('window');

const renderPagination = (index, total, context) => {
  return (
    <View style={{ position: 'absolute', bottom: 10, right: 10 }}>
      <Text style={{ color: 'grey' }}>
        <Text style={{ color: 'white', fontSize: 20 }}>
            {index + 1}
        </Text>
        /{total}
      </Text>
    </View>
  );
};

class ListingDetails extends Component {
    render() {
        const { goBack } = this.props.navigation;

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
                    <Right style={{ flex: 1 }} />
                </Header>

                <Content>
                    <View>
                        <Card transparent>
                            <CardItem>
                                <Left>
                                    <Thumbnail source={{ uri: 'https://i.kym-cdn.com/entries/icons/medium/000/009/754/PhotogenicGuy.jpg' }} />
                                    <Body>
                                        <Text style={{ fontSize: 20, paddingBottom: 3, fontWeight: '600' }}>Wade Douglas</Text>
                                        <Text note>Posted June 19, 2018</Text>
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
                            <View style={styles.slide}>
                                <Image style={styles.image} source={{ uri: 'https://images.craigslist.org/00x0x_bpgidDrSIlE_600x450.jpg' }} />
                            </View>
                            <View style={styles.slide}>
                                <Image style={styles.image} source={{ uri: 'https://cdn.freshome.com/wp-content/uploads/2018/01/living-room-intro.jpg' }} />
                            </View>
                            <View style={styles.slide}>
                                <Image style={styles.image} source={{ uri: 'https://www.thelodgeac.com/-/media/ttc/rch/the-lodge-at-ashford/main-carousel/mobile/ld-deluxeroom-001-1024x576.jpg' }} />
                            </View>
                            <View style={styles.slide}>
                                <Image style={styles.image} source={{ uri: 'https://www.knowwherecoffee.com/wp-content/uploads/2018/07/Modern-Bathroom-and-Toilet-Designs.jpg' }} />
                            </View>
                        </Slick>

                        <Card transparent>
                            <CardItem>
                                <Grid>
                                    <Row style={{ justifyContent: 'center', alignItems: 'center' }}>               
                                        <Text style={{ fontSize: 25, fontWeight: '600', textAlign: 'center', width: '100%' }}>
                                            Home for Rent in Aptos
                                        </Text>
                                    </Row>
                                    <Row style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 5 }}>               
                                        <Text note style={{ textAlign: 'center', width: '100%' }}>
                                            325 Homewood Court Rahway, NJ 07065
                                        </Text>
                                    </Row>
                                    <Row style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 5 }}>
                                        <Text note style={{ fontWeight: '900', textAlign: 'center' }}>
                                            $1000 Per Month
                                        </Text>
                                    </Row>
                                </Grid>
                            </CardItem>

                            <CardItem>
                                <Body>
                                    <Text note style={{ textAlign: 'justify' }}>
                                        Elegant yet comfortable, sophisticated and effortless, 
                                        the achievement of architecture and art reflects the breathtaking 
                                        natural setting in the exclusive and private, gated community of 
                                        Seascape Uplands. 4 Bedrooms, 3.5 Bathrooms on a highly coveted 6,970 
                                        SF lot, offers panoramic views of the shimmering waters of Monterey Bay,
                                        and an expansive natural preserve. This modern, "green" home is a 
                                        kaleidoscope of wood, glass, stone and light, a place where function 
                                        never compromises and creativity never capitulates.
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
                                        <Grid>
                                            <Col>
                                                <Row style={{ paddingBottom: 10 }}>
                                                    <Col size={30} style={styles.colIcon}>
                                                        <MaterialCommunityIcons name="home-modern" size={30} />
                                                    </Col>
                                                    <Col size={70} style={styles.colDetail}>
                                                        <Text style={{ fontSize: 15, fontWeight: '600' }}>Type</Text>
                                                        <Text style={{ fontSize: 12 }}>Apartment</Text>
                                                    </Col>
                                                </Row>
                                                <Row style={{ paddingBottom: 10 }}>
                                                    <Col size={30} style={styles.colIcon}>
                                                        <FontAwesome name="bed" size={30} />
                                                    </Col>
                                                    <Col size={70} style={styles.colDetail}>
                                                        <Text style={{ fontSize: 15, fontWeight: '600' }}>Beds</Text>
                                                        <Text style={{ fontSize: 12 }}>1</Text>
                                                    </Col>
                                                </Row>
                                                <Row style={{ paddingBottom: 10 }}>
                                                    <Col size={30} style={styles.colIcon}>
                                                        <MaterialIcons name="local-laundry-service" size={30} />
                                                    </Col>
                                                    <Col size={70} style={styles.colDetail}>
                                                        <Text style={{ fontSize: 15, fontWeight: '600' }}>Laundry</Text>
                                                        <Text style={{ fontSize: 12 }}>In Unit</Text>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col size={30} style={styles.colIcon}>
                                                        <MaterialCommunityIcons name="air-conditioner" size={30} />
                                                    </Col>
                                                    <Col size={70} style={styles.colDetail}>
                                                        <Text style={{ fontSize: 15, fontWeight: '600' }}>A/C</Text>
                                                        <Text style={{ fontSize: 12 }}>Yes</Text>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col>
                                                <Row style={{ paddingBottom: 10 }}>
                                                    <Col size={30} style={styles.colIcon}>
                                                        <Entypo name="ruler" size={30} />
                                                    </Col>
                                                    <Col size={70} style={styles.colDetail}>
                                                        <Text style={{ fontSize: 15, fontWeight: '600' }}>SqFt</Text>
                                                        <Text style={{ fontSize: 12 }}>2,432</Text>
                                                    </Col>
                                                </Row>
                                                <Row style={{ paddingBottom: 10 }}>
                                                    <Col size={30} style={styles.colIcon}>
                                                        <FontAwesome name="bathtub" size={30} />
                                                    </Col>
                                                    <Col size={70} style={styles.colDetail}>
                                                        <Text style={{ fontSize: 15, fontWeight: '600' }}>Baths</Text>
                                                        <Text style={{ fontSize: 12 }}>1</Text>
                                                    </Col>
                                                </Row>
                                                <Row style={{ paddingBottom: 10 }}>
                                                    <Col size={30} style={styles.colIcon}>
                                                        <MaterialCommunityIcons name="parking" size={30} />
                                                    </Col>
                                                    <Col size={70} style={styles.colDetail}>
                                                        <Text style={{ fontSize: 15, fontWeight: '600' }}>Parking</Text>
                                                        <Text style={{ fontSize: 12 }}>Attached Garage</Text>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col size={30} style={styles.colIcon}>
                                                        <MaterialIcons name="pets" size={30} />
                                                    </Col>
                                                    <Col size={70} style={styles.colDetail}>
                                                        <Text style={{ fontSize: 15, fontWeight: '600' }}>Pets</Text>
                                                        <Text style={{ fontSize: 12 }}>Small Dogs and Cats</Text>
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
                                        latitude: 37.78825,
                                        longitude: -122.4324,
                                        latitudeDelta: 0.0922,
                                        longitudeDelta: 0.0421
                                    }}
                                >
                                    <MapView.Marker
                                        coordinate={{
                                            latitude: 37.757885,
                                            longitude: -122.47069
                                        }}
                                        title={'Title'}
                                        description={'Street/Description'}
                                    /> 
                                </MapView>
                            </CardItem>
                        </Card>
                    </View>
                </Content>
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

export { ListingDetails };
