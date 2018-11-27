import React, { Component } from 'react';
import { 
	createStackNavigator, createTabNavigator,
	createSwitchNavigator, createMaterialTopTabNavigator 
} from 'react-navigation';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import { Icon } from 'native-base';
import { Platform } from 'react-native';

import TabBarComponent from './components/TabBarComponent';
import {
	ListingDetails,
	ListingForm,
	ListingsCardList,
	Login,
	Messages,
	FriendsList,
	Register,
	UserFavorites,
	UserListings,
	UserProfileCreateForm1,
	UserProfileCreateForm2,
	UserProfileDetails,
	UserProfileEditForm1,
	UserProfileEditForm2,
	Verification,
	Welcome,
	Matcher
} from './screens';

const ListingStack = createStackNavigator({
	Explore: ListingsCardList,
	Form: ListingForm,
	Details: ListingDetails,
}, { headerMode: 'none' });

const MatcherStack = createStackNavigator({
	Matcher
}, { headerMode: 'none' });

const exploreSwitch = createSwitchNavigator({
	Rooms: ListingStack,
	Roommates: MatcherStack 
});

const AuthStack = createStackNavigator({
	Welcome,
	auth: createSwitchNavigator({
		Login, Register
	})
}, {
	headerMode: 'none',
	mode: 'modal'
});

const ProfileStack = createStackNavigator({
	// CreateForm1: UserProfileCreateForm1,
	// CreateForm2: UserProfileCreateForm2,
	Profile: UserProfileDetails,
	ProfileEdit1: UserProfileEditForm1,
	ProfileEdit2: UserProfileEditForm2,
}, { headerMode: 'none' });

const MessageStack = createStackNavigator({
	FriendsList,
	Messages
}, { headerMode: 'none' });

const MainNavigator = createBottomTabNavigator({
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
		screen: exploreSwitch,
		navigationOptions: {
			tabBarLabel: 'Explore',
			tabBarIcon: ({ tintColor }) => (
				<Icon name="explore" type="MaterialIcons" style={{ color: tintColor }} size={30} />
			)
		},
	},
	Messages: {
		screen: MessageStack,
		navigationOptions: {
			tabBarLabel: 'Messages',
			tabBarIcon: ({ tintColor }) => (
				<Icon name="ios-chatbubbles" type="Ionicons" style={{ color: tintColor }} size={30} />
			)
		}
	},
	Profile: {
		screen: ProfileStack,
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
	tabBarComponent: Platform.OS === 'android' ? TabBarComponent : BottomTabBar,
	tabBarOptions: {
		activeTintColor: '#1F355D',
		inactiveTintColor: 'grey',
		style: {
			backgroundColor: 'white',
			height: 55
		}
	}
});

class Router extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: false,
			isVerified: false
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ isLoggedIn: nextProps.loggedIn, isVerified: nextProps.verified });
	}

	render() {
		const Nav = createSwitchNavigator({
			AuthStack,
			Verification,
			MainNavigator
		}, {
			initialRouteName: !this.state.isLoggedIn ? 'AuthStack' :
				this.state.isVerified ? 'MainNavigator' : 'Verification',
		});

		return (
			<Nav />
		);
	}
}

export default Router;
