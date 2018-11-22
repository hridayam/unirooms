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
                            <Text style={{ fontSize: 20, paddingBottom: 3, fontWeight: '600' }}>{posterName}</Text>
                            <Text note>Posted {postDate}</Text>
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
                        <Grid>
                            <Row style={{ justifyContent: 'center', alignItems: 'center' }}>               
                                <Text style={{ fontSize: 25, fontWeight: '600', textAlign: 'center', width: '100%' }}>
                                    {title}
                                </Text>
                            </Row>
                            <Row style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 5 }}>               
                                <Text note style={{ textAlign: 'center', width: '100%' }}>
                                    {streetAddress}
                                </Text>
                            </Row>
                        </Grid>
                    </Body>
                </CardItem>

                <CardItem footer bordered>
                    <Grid>
                        <Row>
                            <Col size={25} style={styles.colIcon}>
                                <Row size={85}>
                                    <MaterialCommunityIcons name="home-modern" size={30} />
                                </Row>
                                <Row size={15}>
                                    <Text note>
                                        {housingType}
                                    </Text>
                                </Row>
                            </Col>
                            <Col size={25} style={styles.colIcon}>
                                <Row size={85}>
                                    <Foundation name="pricetag-multiple" size={30} />
                                </Row>
                                <Row size={15}>
                                    <Text note>
                                        ${rentingPrice}/Mo
                                    </Text>
                                </Row>
                            </Col>
                            <Col size={25} style={styles.colIcon}>
                                <Row size={95}>
                                    <FontAwesome name="bed" size={30} />
                                </Row>
                                <Row size={5}>
                                    <Text note>
                                        {beds} Beds
                                    </Text>
                                </Row>
                            </Col>
                            <Col size={25} style={styles.colIcon}>
                                <Row size={95}>
                                    <FontAwesome name="bathtub" size={30} />
                                </Row>
                                <Row size={5}>
                                    <Text note>
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
