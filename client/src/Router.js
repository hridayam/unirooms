import React, { Component } from 'react';
import { createBottomTabNavigator, createStackNavigator,
	createSwitchNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import { Icon } from 'native-base';
import {
	EditProfile,
	ListingDetails,
	ListingForm,
	ListingsView,
	Login,
	Messages,
	FriendsList,
	Register,
	UserFavorites,
	UserListings,
	UserProfile,
	Verification,
	Welcome,
	Matcher
} from './screens';

const ListingStack = createStackNavigator({
	Explore: ListingsView,
	Form: ListingForm,
	Details: ListingDetails,
}, { headerMode: 'none', mode: 'modal' });

const ExploreTopNav = createMaterialTopTabNavigator({
	Listings: {
		screen: ListingStack,
		headerMode: 'none'
	},
	Matcher
}, { swipeEnabled: false });

const AuthStack = createStackNavigator({
	Welcome,
	auth: createSwitchNavigator({
		Login, Register
	})
}, {
	headerMode: 'none',
	mode: 'modal'
});

const MessageStack = createStackNavigator({
	// FriendsList,
	Messages
});

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
		screen: ExploreTopNav,
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
