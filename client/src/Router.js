import React, { Component } from 'react';
import {
	createStackNavigator, createTabNavigator,
	createSwitchNavigator, createMaterialTopTabNavigator
} from 'react-navigation';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import { Icon } from 'native-base';
import { Platform } from 'react-native';
import { connect } from 'react-redux';

import TabBarComponent from './components/TabBarComponent';
import {
	ListingDetails,
	ListingForm,
	ListingsCardList,
	ListingsFilter,
	Login,
	Messages,
	FriendsList,
	Register,
	UserFavorites,
	UserListings,
	UserListingDetails,
	UserProfileCreateForm1,
	UserProfileCreateForm2,
	UserProfileDetails,
	UserProfileEditForm1,
	UserProfileEditForm2,
	Verification,
	Welcome,
	Matcher
} from './screens';
import { reloadUser } from './actions';
import { app } from '../firebase-setup';

const ListingStack = createStackNavigator({
	Explore: ListingsCardList,
	Form: ListingForm,
	Details: ListingDetails,
	Filter: ListingsFilter,
}, { headerMode: 'none' });

const MatcherStack = createStackNavigator({
	Matcher
}, { headerMode: 'none' });

const exploreSwitch = createSwitchNavigator({
	Rooms: ListingStack,
	Roommates: MatcherStack
});

const createProfileStack = createStackNavigator({
	CreateForm1: UserProfileCreateForm1,
	CreateForm2: UserProfileCreateForm2,
}, { headerMode: 'none' });

const UserFavoritesStack = createStackNavigator({
	Favorites: UserFavorites,
	Details: ListingDetails,
}, { headerMode: 'none' });

const userListingsStack = createStackNavigator({
	Listings: UserListings,
	Form: ListingForm,
	Details: UserListingDetails,
}, { headerMode: 'none' });


const AuthStack = createStackNavigator({
	Welcome,
	auth: createSwitchNavigator({
		Login, Register
	})
}, {
	headerMode: 'none'
});

const ProfileStack = createStackNavigator({
	//CreateForm1: UserProfileCreateForm1,
	//CreateForm2: UserProfileCreateForm2,
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
		screen: UserFavoritesStack,
		navigationOptions: {
			tabBarLabel: 'Favorites',
			tabBarIcon: ({ tintColor }) => (
				<Icon name="home-heart" type="MaterialCommunityIcons" style={{ color: tintColor }} size={34} />
			)
		}
	},
	YourListings: {
		screen: userListingsStack,
		navigationOptions: {
			tabBarLabel: 'Your Listings',
			tabBarIcon: ({ tintColor }) => (
				<Icon name="home-account" type="MaterialCommunityIcons" style={{ color: tintColor }} size={34} />
			)
		}
	},
	Explore: {
		screen: exploreSwitch,
		navigationOptions: {
			tabBarLabel: 'Explore',
			tabBarIcon: ({ tintColor }) => (
				<Icon name="explore" type="MaterialIcons" style={{ color: tintColor }} size={34} />
			)
		},
	},
	Messages: {
		screen: MessageStack,
		navigationOptions: {
			tabBarLabel: 'Messages',
			tabBarIcon: ({ tintColor }) => (
				<Icon name="ios-chatbubbles" type="Ionicons" style={{ color: tintColor }} size={34} />
			)
		}
	},
	Profile: {
		screen: ProfileStack,
		navigationOptions: {
			tabBarLabel: 'Profile',
			tabBarIcon: ({ tintColor }) => (
				<Icon name="face" type="MaterialCommunityIcons" style={{ color: tintColor }} size={34} />
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
		activeTintColor: '#E5A823',
		inactiveTintColor: '#0055A2',
		style: {
			backgroundColor: 'white',
			height: 55
		},
		showLabel: false
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

	componentDidMount() {
		if (app.auth().currentUser) {
			this.props.reloadUser(app.auth().currentUser.uid);
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ isLoggedIn: nextProps.loggedIn, isVerified: nextProps.verified });
	}

	routeToDisplay = () => {
		if (!this.state.isLoggedIn) {
			return 'AuthStack';
		}

		if (!this.state.isVerified) {
			return 'Verification';
		}

		if (this.props.firstTimeUser) {
			return 'createProfileStack';
		}

		return 'MainNavigator';
	};

	render() {
		const Nav = createSwitchNavigator({
			AuthStack,
			Verification,
			MainNavigator,
			createProfileStack
		}, {
			initialRouteName: this.routeToDisplay()
		});

		// initialRouteName: !this.state.isLoggedIn ? 'AuthStack' :
		// 		this.state.isVerified ? 'MainNavigator' : 'Verification',

		return (
			<Nav />
		);
	}
}

const mapStateToProps = (state) => {
	return {
		firstTimeUser: state.auth.firstTimeUser
	};
};

export default connect(mapStateToProps, { reloadUser })(Router);
