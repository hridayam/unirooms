import React, { Component } from 'react';
import { Text, Image, StyleSheet, YellowBox, ImageBackground, TouchableOpacity, View, Dimensions, ScrollView } from 'react-native';
import { Container, Content, Header, Left, Body, Right, Icon, Title, Button, Form, Item, Input, Label } from 'native-base';
import { ImagePicker, Permissions } from 'expo';
import { Entypo, FontAwesome, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import 'firebase/firestore';
import { Col, Row, Grid } from 'react-native-easy-grid';
import SelectMultiple from 'react-native-select-multiple';

const distance = ['Less than 1 mile', '1 - 5 miles', '5 - 10 miles', '10 - 15 miles', '15+ miles'];
const rentingPrice = ['$0 - $500', '$500 - $1,000', '$1,000 - $1,500', '$1,500 - $2,000', '$2,000+'];
const housingType = ['Apartment', 'Condo', 'Co-op', 'House', 'Studio', 'Townhouse'];
const squareFeet = ['0 - 2000', '2000 - 4000', '4000 - 6000', '6000+'];
const beds = ['0', '1', '2', '3', '4', '5'];
const baths = ['0', '1', '2', '3', '4', '5'];
const laundry = ['In Unit', 'Not in Unit'];
const parking = ['Attached Garage', 'Street Parking', 'Shared Parking', 'No Parking'];
const airConditioning = ['Yes', 'No'];
const pets = ['Yes', 'No'];

class ListingsFilter extends Component {
	constructor(props) {
        super(props);
        this.state = {
			distanceFilters: [],
			rentingPriceFilters: [],
			housingTypeFilters: [],
			squareFeetFilters: [],
			bedsFilters: [],
			bathsFilters: [],
			laundryFilters: [],
			parkingFilters: [],
			airConditioningFilters: [],
			petsFilters: []
		};
	}

	onDistanceChange = (distanceFilters) => {
		this.setState({ distanceFilters });
	}
	onRentingPriceChange = (rentingPriceFilters) => {
		this.setState({ rentingPriceFilters });
	}
	onHousingTypeChange = (housingTypeFilters) => {
		this.setState({ housingTypeFilters });
	}
	onSquareFeetChange = (squareFeetFilters) => {
		this.setState({ squareFeetFilters });
	}
	onBedsChange = (bedsFilters) => {
		this.setState({ bedsFilters });
	}
	onBathsChange = (bathsFilters) => {
		this.setState({ bathsFilters });
	}
	onLaundryChange = (laundryFilters) => {
		this.setState({ laundryFilters });
	}
	onParkingChange = (parkingFilters) => {
		this.setState({ parkingFilters });
	}
	onAirConditioningChange = (airConditioningFilters) => {
		this.setState({ airConditioningFilters });
	}
	onPetsChange = (petsFilters) => {
		this.setState({ petsFilters });
	}

	passFiltersOntoListings() {
	    this.props.navigation.navigate('Explore', { 
	        distanceFilters: this.state.distanceFilters,
			rentingPriceFilters: this.state.rentingPriceFilters,
			housingTypeFilters: this.state.housingTypeFilters,
			squareFeetFilters: this.state.squareFeetFilters,
			bedsFilters: this.state.bedsFilters,
			bathsFilters: this.state.bathsFilters,
			laundryFilters: this.state.laundryFilters,
			parkingFilters: this.state.parkingFilters,
			airConditioningFilters: this.state.airConditioningFilters,
			petsFilters: this.state.petsFilters
	    });
    }

    render() {
        return (
            <Container style={{ flex: 1 }}>
                <Header style={{ height: 75, backgroundColor: '#0055A2' }}>
                    <Body style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'headerFont', fontSize: 26, color: '#E5A823', marginLeft: 10 }}>Listing Preferences</Text>
                    </Body>
                </Header>

                <Header transparent style={{ height: 75, marginTop: -75 }}>
                    <Left style={{ flex: 1 }}>
                        <Button 
                            transparent 
                            style={{ marginLeft: 3 }}
                            onPress={() => this.passFiltersOntoListings()}
                        >
                            <Ionicons name="md-arrow-round-back" size={30} color='white' />
                        </Button>
                    </Left>
                    <Body style={{ flex: 1, alignItems: 'center' }} />
                    <Right style={{ flex: 1 }} />
                </Header>
                <ScrollView>
	                <Grid style={{ width: '100%' }}>
		                <Row style={{ backgroundColor: '#F1F1F1', alignItems: 'center', height: 40 }}>
		                	<Text style={{ fontFamily: 'titleFont', fontSize: 18, color: 'black', textAlign: 'left', marginLeft: 10 }}>Distance from school</Text>
		                </Row>
		                <Row style={{ flex: 0 }}>
				            <SelectMultiple
					        	items={distance}
					        	labelStyle={{ fontFamily: 'bodyFont', fontSize: 16 }}
					        	selectedLabelStyle={{ fontFamily: 'titleFont', fontSize: 16, color: 'black' }}
					        	selectedItems={this.state.distanceFilters}
					        	onSelectionsChange={this.onDistanceChange} 
					        />
				        </Row>
				         <Row style={{ backgroundColor: '#F1F1F1', alignItems: 'center', height: 40 }}>
		                	<Text style={{ fontFamily: 'titleFont', fontSize: 18, color: 'black', textAlign: 'left', marginLeft: 10 }}>Price per month</Text>
		                </Row>
				        <Row style={{ flex: 0 }}>
					        <SelectMultiple
					        	items={rentingPrice}
					        	labelStyle={{ fontFamily: 'bodyFont', fontSize: 16 }}
					        	selectedLabelStyle={{ fontFamily: 'titleFont', fontSize: 16, color: 'black' }}
					        	selectedItems={this.state.rentingPriceFilters}
					        	onSelectionsChange={this.onRentingPriceChange} 
					        />
				        </Row>
				        <Row style={{ backgroundColor: '#F1F1F1', alignItems: 'center', height: 40 }}>
		                	<Text style={{ fontFamily: 'titleFont', fontSize: 18, color: 'black', textAlign: 'left', marginLeft: 10 }}>Housing Type</Text>
		                </Row>
		                <Row style={{ flex: 0 }}>
					        <SelectMultiple
					        	items={housingType}
					        	labelStyle={{ fontFamily: 'bodyFont', fontSize: 16 }}
					        	selectedLabelStyle={{ fontFamily: 'titleFont', fontSize: 16, color: 'black' }}
					        	selectedItems={this.state.housingTypeFilters}
					        	onSelectionsChange={this.onHousingTypeChange} 
					        />
					    </Row>
				        <Row style={{ backgroundColor: '#F1F1F1', alignItems: 'center', height: 40 }}>
		                	<Text style={{ fontFamily: 'titleFont', fontSize: 18, color: 'black', textAlign: 'left', marginLeft: 10 }}>Square Feet</Text>
		                </Row>
		                <Row style={{ flex: 0 }}>
					        <SelectMultiple
					        	items={squareFeet}
					        	labelStyle={{ fontFamily: 'bodyFont', fontSize: 16 }}
					        	selectedLabelStyle={{ fontFamily: 'titleFont', fontSize: 16, color: 'black' }}
					        	selectedItems={this.state.squareFeetFilters}
					        	onSelectionsChange={this.onSquareFeetChange} 
					        />
					    </Row>
				        <Row style={{ backgroundColor: '#F1F1F1', alignItems: 'center', height: 40 }}>
		                	<Text style={{ fontFamily: 'titleFont', fontSize: 18, color: 'black', textAlign: 'left', marginLeft: 10 }}>Beds</Text>
		                </Row>
		                <Row style={{ flex: 0 }}>
					        <SelectMultiple
					        	items={beds}
					        	labelStyle={{ fontFamily: 'bodyFont', fontSize: 16 }}
					        	selectedLabelStyle={{ fontFamily: 'titleFont', fontSize: 16, color: 'black' }}
					        	selectedItems={this.state.bedsFilters}
					        	onSelectionsChange={this.onBedsChange} 
					        />
					    </Row>
				        <Row style={{ backgroundColor: '#F1F1F1', alignItems: 'center', height: 40 }}>
		                	<Text style={{ fontFamily: 'titleFont', fontSize: 18, color: 'black', textAlign: 'left', marginLeft: 10 }}>Baths</Text>
		                </Row>
		                <Row style={{ flex: 0 }}>
					        <SelectMultiple
					        	items={baths}
					        	labelStyle={{ fontFamily: 'bodyFont', fontSize: 16 }}
					        	selectedLabelStyle={{ fontFamily: 'titleFont', fontSize: 16, color: 'black' }}
					        	selectedItems={this.state.bathsFilters}
					        	onSelectionsChange={this.onBathsChange} 
					        />
					    </Row>
				        <Row style={{ backgroundColor: '#F1F1F1', alignItems: 'center', height: 40 }}>
		                	<Text style={{ fontFamily: 'titleFont', fontSize: 18, color: 'black', textAlign: 'left', marginLeft: 10 }}>Laundry</Text>
		                </Row>
		                <Row style={{ flex: 0 }}>
					        <SelectMultiple
					        	items={laundry}
					        	labelStyle={{ fontFamily: 'bodyFont', fontSize: 16 }}
					        	selectedLabelStyle={{ fontFamily: 'titleFont', fontSize: 16, color: 'black' }}
					        	selectedItems={this.state.laundryFilters}
					        	onSelectionsChange={this.onLaundryChange} 
					        />
					    </Row>
				        <Row style={{ backgroundColor: '#F1F1F1', alignItems: 'center', height: 40 }}>
		                	<Text style={{ fontFamily: 'titleFont', fontSize: 18, color: 'black', textAlign: 'left', marginLeft: 10 }}>Parking</Text>
		                </Row>
		                <Row style={{ flex: 0 }}>
					        <SelectMultiple
					        	items={parking}
					        	labelStyle={{ fontFamily: 'bodyFont', fontSize: 16 }}
					        	selectedLabelStyle={{ fontFamily: 'titleFont', fontSize: 16, color: 'black' }}
					        	selectedItems={this.state.parkingFilters}
					        	onSelectionsChange={this.onParkingChange} 
					        />
					    </Row>
				        <Row style={{ backgroundColor: '#F1F1F1', alignItems: 'center', height: 40 }}>
		                	<Text style={{ fontFamily: 'titleFont', fontSize: 18, color: 'black', textAlign: 'left', marginLeft: 10 }}>Air Conditioning</Text>
		                </Row>
		                <Row style={{ flex: 0 }}>
					        <SelectMultiple
					        	items={airConditioning}
					        	labelStyle={{ fontFamily: 'bodyFont', fontSize: 16 }}
					        	selectedLabelStyle={{ fontFamily: 'titleFont', fontSize: 16, color: 'black' }}
					        	selectedItems={this.state.airConditioningFilters}
					        	onSelectionsChange={this.onAirConditioningChange} 
					        />
					    </Row>
				        <Row style={{ backgroundColor: '#F1F1F1', alignItems: 'center', height: 40 }}>
		                	<Text style={{ fontFamily: 'titleFont', fontSize: 18, color: 'black', textAlign: 'left', marginLeft: 10 }}>Pets</Text>
		                </Row>
		                <Row style={{ flex: 0 }}>
					        <SelectMultiple
					        	items={pets}
					        	labelStyle={{ fontFamily: 'bodyFont', fontSize: 16 }}
					        	selectedLabelStyle={{ fontFamily: 'titleFont', fontSize: 16, color: 'black' }}
					        	selectedItems={this.state.petsFilters}
					        	onSelectionsChange={this.onPetsChange} 
					        />
					    </Row>
			        </Grid>
		        </ScrollView>
            </Container>

        );
    }
}

export { ListingsFilter };
