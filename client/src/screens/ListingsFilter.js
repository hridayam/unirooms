import React, { Component } from 'react';
import { Text, Image, StyleSheet, YellowBox, ImageBackground, TouchableOpacity, View, Dimensions, ScrollView } from 'react-native';
import { Container, Content, Header, Left, Body, Right, Icon, Title, Button, Form, Item, Input, Label } from 'native-base';
import { ImagePicker, Permissions } from 'expo';
import { Entypo, FontAwesome, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import 'firebase/firestore';
import Dialog, { DialogTitle, DialogContent, SlideAnimation } from 'react-native-popup-dialog';
import { Col, Row, Grid } from 'react-native-easy-grid';
import RNPickerSelect from 'react-native-picker-select';
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
            <Text>Filter</Text>
        );
    }
}

export { ListingsFilter };
