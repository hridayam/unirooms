import _ from 'lodash';
import React, { Component } from 'react';
import { AppRegistery, StyleSheet, Image } from 'react-native';
import { Content, Button as NbButton, Icon as NbIcon, Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body } from 'native-base';
import { Carousel } from '../common';
import { Badge, Button, Divider, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { MatcherSlick } from '../common';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Entypo, FontAwesome, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import { app } from '../../firebase-setup';
import { addLike, addDisLike, getUsers, getLikes } from '../actions';
import { moderateScale } from '../common';

// Display data
// update the data on swipe

//Update matches on database
// send user id
// retrieve user id's and run the algorithm


// once the swipe happens, update the user information
//figure out how to update the image
// update this data in the card


const images = [
    'http://www.bistiproofpage.com/wp-content/uploads/2018/04/cute-profile-pics-for-whatsapp-images.png',
    'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg-1024x683.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTZTrqDBgtLBA_aidPI1coEufPiSM6KxBCWtAl-uJW1F4MN-9b',
    'https://www.abilitynet.org.uk/sites/abilitynet.org.uk/files/admin/Rhianna_Kinchin.jpg'
];

class MatcherComp extends Component {

    onRightSwipe(otherId) {
        addLike(otherId, err => {
            if (err)
            {
                return;
            }
            else {
                this.props.getLikes(otherId);
            }
        });
        //getLikes(otherId);
    }

    onLeftSwipe(otherId) {
        addDisLike(otherId);
    }

    componentDidMount() {
        console.log('mounted');
        this.props.getUsers();
    }

    createUsersArray = () => {
        const { matcherUsers } = this.props;
        return _.map(matcherUsers, user => {
            return user;
        })
    }

  render() {
      const users = this.createUsersArray();
      console.log(users);
    return (
      <Container>
        <View>
            <DeckSwiper
                    ref={(c) => this._deckSwiper = c}
                    dataSource={users}
                    onSwipeRight={(item) => this.onRightSwipe(item.id)}
                    onSwipeLeft={(item) => this.onLeftSwipe(item.id)}
                    renderItem={item =>
                    <Card style={{ elevation: 3}}>
                      <CardItem cardBody>
                        <MatcherSlick
                            imageSource={item.images}
                            choice={images}
                        />
                      </CardItem>
                      <CardItem bordered>
                         <Body>
                             <Grid style={{ width: '100%' }}>
                                 <Row style={{ paddingBottom: 10 }} onPress={() => {console.log('it printinnng!!!!!!!!!!!!!!!')}}>
                                     <Text style={{ fontSize: 28, fontWeight: '600', textAlign: 'left' }}>
                                         <Text style={{ fontSize: moderateScale(25, 2), fontWeight: '600', textAlign: 'left' }}>
                                             {item.firstName}{' '}{item.lastName}{'  '}
                                         </Text>
                                         <Text style={{ fontSize: moderateScale(25, 2), fontWeight: '600', textAlign: 'left' }}>
                                             {item.age}
                                         </Text>

                                     </Text>
                                 </Row>
                                 <Row style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 5 }}>
                                     <Col size={10}>
                                         <MaterialIcons name="school" size={25} />
                                     </Col>
                                     <Col size={90}>
                                         <Text style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'left', width: '100%' }}>
                                             {item.academicMajor}
                                         </Text>
                                     </Col>
                                 </Row>
                                 <Row style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 5 }}>
                                     <Col size={10}>
                                         <Ionicons name="md-globe" size={26} style={{ paddingLeft: 2 }} />
                                     </Col>
                                     <Col size={90}>
                                         <Text style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'left', width: '100%' }}>
                                             {item.ethnicity}
                                         </Text>
                                     </Col>
                                 </Row>
                                 <Row style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 5 }}>
                                     <Col size={10}>
                                         <MaterialCommunityIcons name="church" size={25} />
                                     </Col>
                                     <Col size={90}>
                                         <Text style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'left', width: '100%' }}>
                                             {item.religion}
                                         </Text>
                                     </Col>
                                 </Row>
                             </Grid>
                         </Body>
                     </CardItem>
                     <CardItem bordered>
                         <Body>
                             <Grid style={{ width: '100%' }}>
                                 <Row style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 5 }}>
                                     <Col size={2.5} />
                                     <Col size={10}>
                                         <MaterialCommunityIcons name="smoking" size={25} />
                                     </Col>
                                     <Col size={20}>
                                         <Text style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'left', width: '100%' }}>
                                             {item.smoking}
                                         </Text>
                                     </Col>
                                     <Col size={2.5} />
                                     <Col size={10}>
                                         <Entypo name="drink" size={25} />
                                     </Col>
                                     <Col size={20}>
                                         <Text style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'left', width: '100%' }}>
                                             {item.drinking}
                                         </Text>
                                     </Col>
                                     <Col size={2.5} />
                                     <Col size={10}>
                                         <MaterialCommunityIcons name="cannabis" size={25} />
                                     </Col>
                                     <Col size={20}>
                                         <Text style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'left', width: '100%' }}>
                                             {item.drugs}
                                         </Text>
                                     </Col>
                                     <Col size={2.5} />
                                 </Row>
                             </Grid>
                         </Body>
                     </CardItem>
                    </Card>
                    }
                    />
        </View>
      </Container>
    );
  }
}

var styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
},
colIcon: {
    justifyContent: 'center',
    alignItems: 'center'
},
badgeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    paddingVertical: 5
},
personalityBadgeStyle: {
    backgroundColor: '#4FC1E9',
},
hobbiesBadgeStyle: {
    backgroundColor: '#A0D468',
},
badgeTextStyle: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold'
},
badgeWrapperStyle: {
    paddingBottom: 10,
    paddingHorizontal: 2
}
})

const mapstateToProps = (state) => {
    return {
        matcherUsers: state.matcherUsers
    }
}

const Matcher = connect(mapstateToProps, { getUsers, getLikes })(MatcherComp);

export { Matcher };
