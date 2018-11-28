import React, { Component } from 'react';
import { Text, Image, StyleSheet, ImageBackground, TouchableOpacity, View } from 'react-native';
import { Container, Content, Header, Left, Body, Right, Icon, Title, Button, Form, Item, Input, Label } from 'native-base';
import { Entypo, FontAwesome, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Dialog, { DialogTitle, DialogContent, SlideAnimation } from 'react-native-popup-dialog';
import { Col, Row, Grid } from 'react-native-easy-grid';
import RNPickerSelect from 'react-native-picker-select';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { connect } from 'react-redux';

import { ImageSelector } from '../common';
import { createReservation } from '../actions';
import { firebase, app } from '../../firebase-setup';

class comp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slideAnimationDialogSuccess: false,
            slideAnimationDialogFailure: false,
            uri: [],
            blobs: [],
            listingTitle: '',
            rentingPrice: '',
            streetAddress: '',
            streetAddressLatitude: '',
            streetAddressLongitude: '',
            listingDescription: '',
            housingType: null,
            housingTypeItems: [
                {
                    label: 'Apartment',
                    value: 'Apartment',
                },
                {
                    label: 'Condo',
                    value: 'Condo',
                },
                {
                    label: 'Co-op',
                    value: 'Co-op',
                },
                {
                    label: 'House',
                    value: 'House',
                },
                {
                    label: 'Studio',
                    value: 'Studio',
                },
                {
                    label: 'Townhouse',
                    value: 'Townhouse',
                }
            ],
            squarefeet: '',
            Beds: null,
            bedsItems: [
                {
                    label: '0',
                    value: '0',
                },
                {
                    label: '1',
                    value: '1',
                },
                {
                    label: '2',
                    value: '2',
                },
                {
                    label: '3',
                    value: '3',
                },
                {
                    label: '4',
                    value: '4',
                },
                {
                    label: '5',
                    value: '5',
                }
            ],
            Baths: null,
            bathsItems: [
                {
                    label: '0',
                    value: '0',
                },
                {
                    label: '1',
                    value: '1',
                },
                {
                    label: '2',
                    value: '2',
                },
                {
                    label: '3',
                    value: '3',
                },
                {
                    label: '4',
                    value: '4',
                },
                {
                    label: '5',
                    value: '5',
                }
            ],
            laundry: null,
            laundryItems: [
                {
                    label: 'In Unit',
                    value: 'In Unit',
                },
                {
                    label: 'Not in Unit',
                    value: 'Not in Unit',
                }
            ],
            parking: null,
            parkingItems: [
                {
                    label: 'Attached Garage',
                    value: 'Attached Garage',
                },
                {
                    label: 'Street Parking',
                    value: 'Street Parking',
                },
                {
                    label: 'Shared Parking',
                    value: 'Shared Parking',
                },
                {
                    label: 'No Parking',
                    value: 'No Parking',
                }
            ],
            airConditioning: null,
            airConditioningItems: [
                {
                    label: 'Yes',
                    value: 'Yes',
                },
                {
                    label: 'No',
                    value: 'No',
                }
            ],
            pets: null,
            petsItems: [
                {
                    label: 'Yes',
                    value: 'Yes',
                },
                {
                    label: 'No',
                    value: 'No',
                }
            ],
        };
    }

    onRemove = (key) => {
        const { uri, blobs } = this.state;
        console.log(key, uri.length);
        if (key > uri.length) {
            return;
        }
        blobs.splice(key, 1);
        uri.splice(key, 1);
        this.setState({ uri, blobs });
    }

    setImage = (uri, base64) => {
        const newArray = this.state.uri.concat(uri);
        const newBlobArray = this.state.blobs.concat(base64);
        this.setState({ 
            uri: newArray,
            blobs: newBlobArray
        });
    }

    addToDatabase() {
        const today = new Date();
        const { streetAddressLatitude, streetAddressLongitude } = this.state;
        //const dateText = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();
        //console.log(streetAddressLatitude, streetAddressLongitude);
        const listingData = { 
            info: {
                userId: app.auth().currentUser.uid,
                date: today,
                listingTitle: this.state.listingTitle,
                rentingPrice: this.state.rentingPrice,
                streetAddress: this.state.streetAddress,
                listingDescription: this.state.listingDescription,
                housingType: this.state.housingType,
                squarefeet: this.state.squarefeet,
                beds: this.state.beds,
                baths: this.state.baths,
                laundry: this.state.laundry,
                parking: this.state.parking,
                airConditioning: this.state.airConditioning,
                pets: this.state.pets,
                location: new firebase.firestore.GeoPoint(streetAddressLatitude, streetAddressLongitude),
                images: []
            },
            images: this.state.blobs,
        };

        this.props.createReservation(listingData, (err, data) => {
            if (err) this.setState({ slideAnimationDialogFailure: true });
            console.log(`added data = ${data}`);
            this.setState({ slideAnimationDialogSuccess: true });
        });
    }

    renderImageSelectors = () => {
        const rows = [];
        const { uri } = this.state;

        for (let i = 0; i < 6; i++) {
            rows.push(
                <ImageSelector 
                    key={i} id={i} square
                    uri={uri[i] ? uri[i] : null} 
                    setImage={this.setImage} 
                    onRemove={this.onRemove}
                />
            );
        }
        return (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {rows}
            </View>
        );
    }

    render() {
        const { goBack } = this.props.navigation;

        return (
            <Container style={{ flex: 1 }}>
                <Header style={{ height: 75, backgroundColor: '#0055A2', zIndex: -1 }}>
                    <Body style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'headerFont', fontSize: 26, color: '#E5A823' }}>Add Listing</Text>
                    </Body>
                </Header>

                <Header transparent style={{ height: 75, marginTop: -75, zIndex: 1 }}>
                    <Left style={{ flex: 1 }}>
                        <Button 
                            transparent 
                            style={{ marginLeft: 3 }}
                            onPress={() => goBack()}
                        >
                            <Ionicons name="md-arrow-round-back" size={30} color='white' />
                        </Button>
                    </Left>
                    <Body style={{ flex: 1, alignItems: 'center' }} />
                    <Right style={{ flex: 1 }} />
                </Header>

                <Content>
                    <Form>
                        <Grid style={{ width: '100%' }}>
                            <Row style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 20 }}>
                                <Text style={{ textAlign: 'center',  fontFamily: 'titleFont', fontSize: 22 }}>
                                    Housing Images
                                </Text>
                            </Row>
                            <Row>
                                {this.renderImageSelectors()}
                            </Row>
                            <Row style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 30, paddingBottom: 10 }}>
                                <Text style={{ textAlign: 'center', fontFamily: 'titleFont', fontSize: 22 }}>
                                    Basic Details
                                </Text>
                            </Row>
                            <Row>
                                <Col size={15} style={styles.colIcon}>
                                   <MaterialCommunityIcons name="page-layout-header" size={30} />
                                </Col>
                                <Col size={75} >
                                  <Item floatingLabel>
                                    <Label>Listing Title</Label>
                                    <Input 
                                      multiline 
                                      returnKeyType='done'
                                      blurOnSubmit
                                      onChangeText={(text) => this.setState({ listingTitle: text })}
                                    />
                                  </Item>
                                </Col>
                                <Col size={10} />
                            </Row>
                            <Row>
                                <Col size={15} style={styles.colIcon}>
                                   <Foundation name="pricetag-multiple" size={30} />
                                </Col>
                                <Col size={75} >
                                  <Item floatingLabel>
                                    <Label>Renting Price Per Month</Label>
                                    <Input 
                                      keyboardType='numeric'
                                      returnKeyType='done'
                                      onChangeText={(text) => this.setState({ rentingPrice: text })}
                                    />
                                  </Item>
                                </Col>
                                <Col size={10} />
                            </Row>
                            <Row>
                                <Col size={15} style={styles.colIcon}>
                                   <Entypo name="address" size={30} />
                                </Col>
                                <Col size={3} />
                                <Col size={73} >
                                    <GooglePlacesAutocomplete
                                        currentLocation={false}
                                        placeholder='Street Address'
                                        placeholderTextColor='#5d5d5d'
                                        minLength={1}
                                        autoFocus={false}
                                        returnKeyType={'done'}
                                        listViewDisplayed={false}
                                        fetchDetails={true}
                                        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                                            this.setState({
                                                streetAddress: data.description, // selected address
                                                streetAddressLatitude: details.geometry.location.lat,
                                                streetAddressLongitude: details.geometry.location.lng,
                                                //coordinates: `${details.geometry.location.lat},${details.geometry.location.lng}` // selected coordinates
                                            });
                                        }}

                                        query={{
                                            // available options: https://developers.google.com/places/web-service/autocomplete
                                            key: 'AIzaSyAYfOlov39x2fpfij05iE5PIxcKflK1sSg',
                                            language: 'en', // language of the results
                                            types: 'address' // default: 'geocode'
                                        }}

                                        styles={{
                                                textInputContainer: {
                                                backgroundColor: 'rgba(0,0,0,0)',
                                                borderTopWidth: 0,
                                                borderBottomWidth: 0
                                            },
                                            textInput: {
                                                marginLeft: 0,
                                                marginRight: 0,
                                                height: '100%',
                                                color: 'black',
                                                fontSize: 18,
                                                borderBottomColor: '#D3D3D3',
                                                borderBottomWidth: 1
                                            }
                                        }}
                                    />
                                </Col>
                                <Col size={9} />
                            </Row>
                            <Row>
                                <Col size={15} style={styles.colIcon}>
                                   <Ionicons name="ios-information-circle" size={30} />
                                </Col>
                                <Col size={75} >
                                  <Item floatingLabel>
                                    <Label>Listing Description</Label>
                                    <Input 
                                      multiline
                                      returnKeyType='done'
                                      blurOnSubmit
                                      onChangeText={(text) => this.setState({ listingDescription: text })} 
                                    />
                                  </Item>
                                </Col>
                                <Col size={10} />
                            </Row>

                            <Row style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 30, paddingBottom: 10 }}>
                                <Text style={{ textAlign: 'center',  fontFamily: 'titleFont', fontSize: 22 }}>
                                    Features
                                </Text>
                            </Row>
                            <Row>
                                <Col size={15} style={styles.colIcon}>
                                   <MaterialCommunityIcons name="home-modern" size={30} />
                                </Col>
                            <Col size={4} />
                                <Col size={71} >
                                  <RNPickerSelect
                                    placeholder={{
                                      label: 'Housing Type',
                                      value: null,
                                    }}
                                    style={{ ...pickerSelectStyles }}
                                    items={this.state.housingTypeItems}
                                    onValueChange={(value) => {
                                      this.setState({
                                          housingType: value,
                                      });
                                    }}
                                  />
                                </Col>
                                <Col size={10} />
                            </Row>
                            <Row>
                                <Col size={15} style={styles.colIcon}>
                                   <Entypo name="ruler" size={30} />
                                </Col>
                                <Col size={75} >
                                  <Item label>
                                    <Input 
                                      placeholder="Square Feet"
                                      placeholderTextColor="#d3d3d3"
                                      keyboardType='numeric'
                                      returnKeyType='done'
                                      onChangeText={(text) => this.setState({ squarefeet: text })}
                                    />
                                  </Item>
                                </Col>
                                <Col size={10} />
                            </Row>
                            <Row>
                                <Col size={15} style={styles.colIcon}>
                                   <FontAwesome name="bed" size={30} />
                                </Col>
                                <Col size={4} />
                                <Col size={71} >
                                  <RNPickerSelect
                                    placeholder={{
                                      label: 'Beds',
                                      value: null,
                                    }}
                                    style={{ ...pickerSelectStyles }}
                                    items={this.state.bedsItems}
                                    onValueChange={(value) => {
                                      this.setState({
                                          beds: value,
                                      });
                                    }}
                                  />
                                </Col>
                                <Col size={10} />
                            </Row>
                            <Row>
                                <Col size={15} style={styles.colIcon}>
                                   <FontAwesome name="bathtub" size={30} />
                                </Col>
                                <Col size={4} />
                                <Col size={71} >
                                  <RNPickerSelect
                                    placeholder={{
                                      label: 'Baths',
                                      value: null,
                                    }}
                                    style={{ ...pickerSelectStyles }}
                                    items={this.state.bathsItems}
                                    onValueChange={(value) => {
                                      this.setState({
                                          baths: value,
                                      });
                                    }}
                                  />
                                </Col>
                                <Col size={10} />
                            </Row>
                            <Row>
                                <Col size={15} style={styles.colIcon}>
                                   <MaterialIcons name="local-laundry-service" size={30} />
                                </Col>
                                <Col size={4} />
                                <Col size={71} >
                                  <RNPickerSelect
                                    placeholder={{
                                      label: 'Laundry',
                                      value: null,
                                    }}
                                    style={{ ...pickerSelectStyles }}
                                    items={this.state.laundryItems}
                                    onValueChange={(value) => {
                                      this.setState({
                                          laundry: value,
                                      });
                                    }}
                                  />
                                </Col>
                                <Col size={10} />
                            </Row>
                            <Row>
                                <Col size={15} style={styles.colIcon}>
                                  <MaterialCommunityIcons name="parking" size={30} />
                                </Col>
                                <Col size={4} />
                                <Col size={71} >
                                  <RNPickerSelect
                                    placeholder={{
                                      label: 'Parking',
                                      value: null,
                                    }}
                                    style={{ ...pickerSelectStyles }}
                                    items={this.state.parkingItems}
                                    onValueChange={(value) => {
                                      this.setState({
                                          parking: value,
                                      });
                                    }}
                                  />
                                </Col>
                                <Col size={10} />
                            </Row>
                            <Row>
                                <Col size={15} style={styles.colIcon}>
                                   <MaterialCommunityIcons name="air-conditioner" size={30} />
                                </Col>
                                <Col size={4} />
                                <Col size={71} >
                                  <RNPickerSelect
                                    placeholder={{
                                      label: 'Air Conditioning',
                                      value: null,
                                    }}
                                    style={{ ...pickerSelectStyles }}
                                    items={this.state.airConditioningItems}
                                    onValueChange={(value) => {
                                      this.setState({
                                          airConditioning: value,
                                      });
                                    }}
                                  />
                                </Col>
                                <Col size={10} />
                            </Row>
                            <Row>
                                <Col size={15} style={styles.colIcon}>
                                   <MaterialIcons name="pets" size={30} />
                                </Col>
                                <Col size={4} />
                                <Col size={71} >
                                  <RNPickerSelect
                                    placeholder={{
                                      label: 'Pets',
                                      value: null,
                                    }}
                                    style={{ ...pickerSelectStyles }}
                                    items={this.state.petsItems}
                                    onValueChange={(value) => {
                                      this.setState({
                                          pets: value,
                                      });
                                    }}
                                  />
                                </Col>
                                <Col size={10} />
                            </Row>
                            <Dialog
                                onDismiss={() => {
                                  this.setState({ slideAnimationDialogSuccess: false });
                                  this.props.navigation.navigate('Explore');
                                }}
                                onTouchOutside={() => {
                                  this.setState({ slideAnimationDialogSuccess: false });
                                  this.props.navigation.navigate('Explore');
                                }}
                                visible={this.state.slideAnimationDialogSuccess}
                                dialogTitle={<DialogTitle title="Post successful!" />}
                                dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
                                >
                                <DialogContent style={{ justifyContent: 'center', alignItems: 'center', marginTop: 25 }}>
                                  <MaterialCommunityIcons name="check-circle-outline" style={{ color: '#4BB543' }} size={75} />
                                </DialogContent>
                            </Dialog>
                            <Dialog
                                onDismiss={() => {
                                  this.setState({ slideAnimationDialogFailure: false });
                                }}
                                onTouchOutside={() => {
                                  this.setState({ slideAnimationDialogFailure: false });
                                }}
                                visible={this.state.slideAnimationDialogFailure}
                                dialogTitle={<DialogTitle title="       Please fill in all forms!
                                    At least one image required!" />}
                                dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
                            >
                                <DialogContent style={{ justifyContent: 'center', alignItems: 'center', marginTop: 25 }}>
                                  <MaterialCommunityIcons name="alert-circle-outline" style={{ color: '#cc0000' }} size={75} />
                                </DialogContent>
                            </Dialog>
                            <Row style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 30 }}>
                                <Col size={100} style={{ paddingHorizontal: 20 }} >
                                 {this.state.uri.length === 0 ||
                                  this.state.listingTitle === '' ||
                                  this.state.rentingPrice === '' ||
                                  this.state.streetAddress === '' ||
                                  this.state.listingDescription === '' ||
                                  this.state.housingType === null ||
                                  this.state.squarefeet === '' ||
                                  this.state.beds === null ||
                                  this.state.baths === null ||
                                  this.state.laundry === null ||
                                  this.state.parking === null ||
                                  this.state.airConditioning === null ||
                                  this.state.pets === null ? 
                                    <Button
                                        block
                                        onPress={() => this.setState({ slideAnimationDialogFailure: true })}
                                    >
                                        <Text style={{ color: 'white',  fontFamily: 'titleFont', fontSize: 22 }} >
                                          Post
                                        </Text>
                                    </Button>
                                    :
                                    <Button 
                                        block
                                        onPress={() => this.addToDatabase()}
                                    >
                                        <Text style={{ color: 'white',  fontFamily: 'titleFont', fontSize: 22 }} >
                                          Post
                                        </Text>
                                    </Button>
                                  }
                                </Col>
                            </Row>
                        </Grid>
                    </Form>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
  colIcon: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  uploadedImage: {
    borderRadius: 8,
    height: 110,
    width: 110,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  deleteImage: {
    height: 50,
    width: 50,
    position: 'absolute'
  },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 18,
        paddingVertical: 15,
        backgroundColor: 'white',
        color: 'black',
        borderBottomColor: '#dfdfdf',
        borderBottomWidth: 1
    },
});

const ListingForm = connect(null, { createReservation })(comp);

export { ListingForm };
