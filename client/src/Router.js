import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Icon } from 'native-base';
import { 
	EditProfile,
	ListingDetails,
	ListingForm,
	ListingsView,
	Login,
	Messages,
	Register,
	UserFavorites, 
	UserListings,
	UserProfile,
	Verification,
	Welcome
	} from './screens';

const ListingStack = createStackNavigator({
	Explore: ListingsView,
	Form: ListingForm,
	Details: ListingDetails,
}, { headerMode: 'none', mode: 'modal' });

export default createBottomTabNavigator({
	Favorites: {
		screen: UserFavorites,
		navigationOptions: {
			tabBarLabel: 'Favorites',
			tabBarIcon: ({ tintColor }) => (
				<Icon name="home-heart" type="MaterialCommunityIcons" style={{ color: tintColor }} size={30} />
			)
		}
	},
	YourListings: {
		screen: UserListings,
		navigationOptions: {
			tabBarLabel: 'Your Listings',
			tabBarIcon: ({ tintColor }) => (
				<Icon name="home-account" type="MaterialCommunityIcons" style={{ color: tintColor }} size={30} />
			)
		}
	},
	Explore: {
		screen: ListingStack,
		navigationOptions: {
			tabBarLabel: 'Explore',
			tabBarIcon: ({ tintColor }) => (
				<Icon name="explore" type="MaterialIcons" style={{ color: tintColor }} size={30} />
			)
		},
	},
	Messages: {
		screen: Messages,
		navigationOptions: {
			tabBarLabel: 'Messages',
			tabBarIcon: ({ tintColor }) => (
				<Icon name="ios-chatbubbles" type="Ionicons" style={{ color: tintColor }} size={30} />
			)
		}
	},
	Profile: {
		screen: UserProfile,
		navigationOptions: {
			tabBarLabel: 'Profile',
			tabBarIcon: ({ tintColor }) => (
				<Icon name="face" type="MaterialCommunityIcons" style={{ color: tintColor }} size={30} />
			)
		}
	}
}, {
	initialRouteName: 'Explore',
	order: ['Favorites', 'YourListings', 'Explore', 'Messages', 'Profile'],
	navigationOptions: {
		tabBarVisible: true
	},
	tabBarOptions: {
		activeTintColor: 'midnightblue',
		inactiveTintColor: 'grey',
		style: {
			backgroundColor: 'white'
		}
	}
});

