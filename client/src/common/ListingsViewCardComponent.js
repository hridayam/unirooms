import React, { Component } from 'react';
import { Text, Image, StyleSheet, View } from 'react-native';
import { Card, CardItem, Thumbnail, Body, Left } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { FontAwesome, Foundation, MaterialCommunityIcons } from '@expo/vector-icons';

class ListingsViewCardComponent extends Component {
    render() {
        const { 
            posterName, 
            postDate, 
            posterImageSource,
            imageSource, 
            title,
            streetAddress,
            housingType,
            rentingPrice,
            beds,
            baths,
        } = this.props;

        return (
            <Card>
                <CardItem bordered>
                    <Left>
                        <Thumbnail source={{ uri: posterImageSource }} />
                        <Body>
                            <Text style={{ fontFamily: 'titleFont', fontSize: 20, paddingBottom: 3, }}>{posterName}</Text>
                            <Text style={{ fontFamily: 'bodyFont', fontSize: 14 }}>Posted {postDate}</Text>
                        </Body>
                    </Left>
                </CardItem>

                <CardItem cardBody bordered>
                    <Image 
                        source={{ uri: imageSource }}
                        style={{ height: 200, width: null, flex: 1 }} 
                    />
                </CardItem>

                <CardItem bordered>
                    <Body>
                        <Grid style={{ width: '100%' }}>
                            <Row style={{ justifyContent: 'center', alignItems: 'center' }}>               
                                <Text style={{ fontFamily: 'titleFont', fontSize: 25, textAlign: 'center' }}>
                                    {title}
                                </Text>
                            </Row>
                            <Row style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 5 }}>               
                                <Text style={{ fontFamily: 'bodyFont', fontSize: 16, textAlign: 'center' }}>
                                    {streetAddress}
                                </Text>
                            </Row>
                        </Grid>
                    </Body>
                </CardItem>

                <CardItem footer bordered>
                    <Grid style={{ width: '100%' }}>
                        <Row>
                            <Col size={25} style={styles.colIcon}>
                                <Row size={85}>
                                    <MaterialCommunityIcons name="home-modern" size={30} />
                                </Row>
                                <Row size={15}>
                                    <Text style={{ fontFamily: 'bodyFont', fontSize: 14 }}>
                                        {housingType}
                                    </Text>
                                </Row>
                            </Col>
                            <Col size={25} style={styles.colIcon}>
                                <Row size={85}>
                                    <Foundation name="pricetag-multiple" size={30} />
                                </Row>
                                <Row size={15}>
                                    <Text style={{ fontFamily: 'bodyFont', fontSize: 14 }}>
                                        ${rentingPrice}/Mo
                                    </Text>
                                </Row>
                            </Col>
                            <Col size={25} style={styles.colIcon}>
                                <Row size={95}>
                                    <FontAwesome name="bed" size={30} />
                                </Row>
                                <Row size={5}>
                                    <Text style={{ fontFamily: 'bodyFont', fontSize: 14 }}>
                                        {beds} Beds
                                    </Text>
                                </Row>
                            </Col>
                            <Col size={25} style={styles.colIcon}>
                                <Row size={95}>
                                    <FontAwesome name="bathtub" size={30} />
                                </Row>
                                <Row size={5}>
                                    <Text style={{ fontFamily: 'bodyFont', fontSize: 14 }}>
                                        {baths} Baths
                                    </Text>
                                </Row>
                            </Col>
                        </Row>
                    </Grid>
                </CardItem>
            </Card>
        );
    }
}


const styles = StyleSheet.create({
  colIcon: {
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export { ListingsViewCardComponent };
