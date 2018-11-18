import React, { Component } from 'react';
import {
    StyleSheet, View, Text, Alert
} from 'react-native';
import {
    Container, Content, Row, Grid, Button as NbButton, Icon as NbIcon
} from 'native-base';
import { Badge, Button, Divider, Icon } from 'react-native-elements';

import { Carousel } from '../common';
import { app } from '../../firebase-setup';

const images = [
    { key: '0', src: 'http://www.bistiproofpage.com/wp-content/uploads/2018/04/cute-profile-pics-for-whatsapp-images.png' },
    { key: '1', src: 'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg-1024x683.jpg' },
    { key: '2', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTZTrqDBgtLBA_aidPI1coEufPiSM6KxBCWtAl-uJW1F4MN-9b' },
    { key: '3', src: 'https://www.abilitynet.org.uk/sites/abilitynet.org.uk/files/admin/Rhianna_Kinchin.jpg' }
];

//TODO: fix caoursel to display image more
class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.user = this.props.navigation.state.params;
        this.state = {
            badges: [
                'sir speaks a lot', 'user', 'funny', 'dumb', 'attention whore',
                'really really dumb'
            ]
        };
    }

    displayAlert = () => {
        return (
            Alert.alert(
                'Log Out',
                'Are you sure you want to Log out?',
                [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'OK', onPress: () => app.auth().signOut() },
                ],
                { cancelable: false }
            )
        );
    }

    renderBadges = () => {
        return this.state.badges.map(badge => {
            return (
                <Badge 
                    key={badge}
                    containerStyle={styles.badgeStyle} 
                    wrapperStyle={styles.badgeWrapperStyle}
                >
                    <Text style={styles.badgeTextStyle}>{badge}</Text>
                </Badge>
            );
        });
    }

    render() {
        return (
            <Grid style={{ backgroundColor: '#fff' }}>
                <Row style={{ height: 200 }}>
                    <Carousel images={images} shouldCapture />
                </Row>
                <Row>
                    <Content style={[styles.body]}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text adjustsFontSizeToFit style={[styles.priceText, { flex: 4 }]}>Michael Scott</Text>

                            <NbButton 
                                transparent dark
                                onPress={() => this.displayAlert()}
                                style={{ flex: 0 }}
                            >
                                <NbIcon 
                                    type='MaterialCommunityIcons'
                                    name='exit-to-app' 
                                    style={{ fontSize: 32, marginLeft: 0, marginRight: 0 }} 
                                />
                            </NbButton>
                            <NbButton 
                                transparent dark
                                onPress={() => this.props.navigation.navigate('EditProfile')}
                                style={{ flex: 0 }}
                            >
                                <NbIcon 
                                    type='MaterialCommunityIcons' 
                                    name='account-edit' 
                                    style={{ fontSize: 32, marginLeft: 0, marginRight: 0 }} 
                                />
                            </NbButton>
                        </View>

                        <Divider style={{ backgroundColor: 'black', marginBottom: 5 }} />

                        <Text style={styles.descriptionText}>1 Bed, 2 Bath, 1088 soft</Text>
                        <Text style={styles.descriptionText}>Condo, 342 Days on Trulia</Text>
                        <Text style={styles.descriptionText}>Est. Mortgage $52,604</Text>

                        <View style={[styles.badgeContainer]}>
                            {this.renderBadges()}
                        </View>
                        
                        <Text style={styles.descriptionText}>this is a sample of what a student can write about in their description. This can be as long as possible.</Text>

                        <View style={{ flexDirection: 'row' }}>
                            <Button
                                large raised
                                containerViewStyle={{ flex: 1 }}
                                onPress={() => this.displayAlert()}
                                backgroundColor="#FF5722"
                                rightIcon={{ name: 'exit-to-app' }}
                                title='LOG OUT' 
                            />
                            <Button
                                large raised
                                containerViewStyle={{ flex: 1 }}
                                backgroundColor="#2196F3"
                                rightIcon={{ name: 'border-color' }}
                                title='EDIT' 
                            />
                        </View>
                        
                    </Content>
                </Row>
            </Grid>
        );
    }
}

/* 
<Icon 
    name='exit-to-app'
    size={32}
    style={{ flex: 1 }}
    onPress={() => this.displayAlert()}
/>
<Icon 
    name='account-edit'
    type='material-community'
    size={32}
    style={{ flex: 1 }}
    onPress={() => this.props.navigation.navigate('EditProfile')}
/> 
*/

// <Container style={styles.container}>
//     <Container styles={styles.carouselContainer}>
//         <Carousel images={images} shouldCapture />
//     </Container>
    
//     <Content style={styles.body}>
//         <Text style={styles.priceText}>Michael Scott</Text>
//         <Text style={styles.descriptionText}>1 Bed, 2 Bath, 1088 soft</Text>
//         <Text style={styles.descriptionText}>Condo, 342 Days on Trulia</Text>
//         <Text style={styles.descriptionText}>Est. Mortgage $52,604</Text>

//         <Container style={styles.badgeContainer}>
//             {this.renderBadges()}
//         </Container>
//     </Content>
// </Container>

/* <Button
    containerViewStyle={{ marginRight: 0, marginLeft: 0 }}
    buttonStyle={{ marginRight: 0, marginLeft: 0 }}
    textStyle={{ marginRight: 0, marginLeft: 0 }}
    onPress={() => this.displayAlert()}
    backgroundColor="#FF5342"
    icon={{ name: 'exit-to-app', color: 'black', size: 32 }}
/>
<Button
    containerViewStyle={{ marginRight: 0, marginLeft: 0 }}
    buttonStyle={{ marginRight: 0, marginLeft: 0, paddingLeft: 0 }}
    textStyle={{ marginRight: 0, marginLeft: 0 }}
    backgroundColor="#FF6697"
    icon={{ name: 'border-color', color: 'black', size: 32, style: { marginleft: 0 } }}
/> */

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    text: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold'
    },
    body: {
        paddingLeft: 10,
        paddingRight: 10
    },
    badgeStyle: {
        backgroundColor: '#54B0F3',
    },
    badgeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        paddingLeft: 20,
        paddingRight: 20
    },
    badgeTextStyle: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold'
    },
    badgeWrapperStyle: {
        paddingBottom: 5
    },
    carouselContainer: {
        top: 0,
        left: 0,
        right: 0,
        position: 'absolute',
        // flex: 1
        // alignItems: 'stretch',
        // justifyContent: 'flex-start'
    },
    priceText: {
        marginBottom: 1,
        letterSpacing: 1,
        color: '#000000',
        fontSize: 32,
        fontWeight: '400',
    },
    descriptionText: {
        marginBottom: 4,
        color: '#8E8E93',
        fontSize: 16,
        fontWeight: '400',
        letterSpacing: 1,
    },
});

export { UserProfile };
