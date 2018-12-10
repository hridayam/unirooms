import _ from 'lodash';
import React, { Component } from 'react';
import { AppRegistery, StyleSheet, Image, Alert, Dimensions } from 'react-native';
import { Content, Button, Icon, Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body } from 'native-base';
import { connect } from 'react-redux';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Entypo, Ionicons, MaterialCommunityIcons, MaterialIcons, Foundation } from '@expo/vector-icons';
import Modal from 'react-native-modal';

import { app } from '../../firebase-setup';
import { addLike, addDisLike, getUsers, getLikes } from '../actions';
import { moderateScale, MatcherSlick } from '../common';


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
    constructor(props) {
        super(props);
        this.state = {
            visibleModal: false
        };
    }

//     updateUserData = (otherItem, users) => {
//         //delete the previous uId from the users
//         let i = 0;
//         var BreakException = {};
//         try {
//             users.forEach(u => {
//                 if (u.id === otherItem.id) {
//                     users.splice(i, 1);
//                     throw BreakException;
//                 }
//                 i++;
//             });
//         }
//         catch (e){
//             if (e !== BreakException) throw e;
//         }
// //        const index = _.findIndex(users, {id: id});
//         console.log(index);
//     }

    componentDidMount() {
        this.props.getUsers();
    }

    onLeftSwipe(otherItem, users) {
        this.props.addDisLike(otherItem.id);
    }

    onRightSwipe(otherItem, users) {
        this.props.addLike(otherItem.id, err => {
            if (err) {
                return;
            } 
            this.props.getLikes(otherItem.id, (matched, err) => {
                if (matched) {
                    Alert.alert('Matched!', 'Head to messages to get to know each other');
                }
            });
        });
    }

    createUsersArray = () => {
        const { matcherUsers } = this.props;
        return _.map(matcherUsers, user => {
            return user;
        });
    }

    render() {
      const users = this.createUsersArray();
      console.log(users);
      return (
        <Container style={{ flex: 1 }}>
          <Modal
              animationIn='slideInDown'
              animationOut='slideOutUp'
              animationInTiming={500}   
              animationOutTiming={500}
              isVisible={this.state.visibleModal === true}
              style={{ justifyContent: 'flex-start', margin: 0 }}
              onBackdropPress={() => { this.setState({ visibleModal: false }); }}
          >
              <View style={styles.modalContent}>
                  <Grid>
                      <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
                          <Button
                              transparent
                              style={{
                                  width: '100%',
                                  height: '100%',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  flexDirection: 'column'
                              }}
                              onPress={() => {
                                  this.setState({ visibleModal: false });
                                  this.props.navigation.navigate('Rooms');
                              }}
                          >
                              <Ionicons name="ios-home" size={60} color='#E5A823' />
                              <Text style={{ fontFamily: 'headerFont', fontSize: 40, color: '#E5A823' }}>
                                  Rooms
                              </Text>
                          </Button>
                      </Row>
                      <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
                          <Button
                              transparent
                              style={{
                                  width: '100%',
                                  height: '100%',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  flexDirection: 'column'
                              }}
                              onPress={() => {
                                  this.setState({ visibleModal: false });
                              }}
                          >
                              <Foundation name="torsos-all" size={60} color='#E5A823' />
                              <Text style={{ fontFamily: 'headerFont', fontSize: 40, color: '#E5A823' }}>
                                  Roommmates
                              </Text>
                          </Button>
                      </Row>
                      <Row>
                          <Button
                              transparent
                              style={{
                                  width: '100%',
                                  height: '100%',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  flexDirection: 'column'
                              }}
                              onPress={() => {
                                  this.setState({ visibleModal: false });
                              }}
                          >
                              <Ionicons name="ios-close" size={40} color='#E5A823' style={{ marginTop: 80 }} />
                              <Text style={{ fontFamily: 'headerFont', fontSize: 22, color: '#E5A823' }}>
                                  Cancel
                              </Text>
                          </Button>
                      </Row>
                  </Grid>
              </View>
          </Modal>

          <Header style={{ height: 95, backgroundColor: '#0055A2', zIndex: -1 }} />

          <Header transparent style={{ height: 75, marginTop: -95, zIndex: 1 }}>
              <Body style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontFamily: 'headerFont', fontSize: 26, color: '#E5A823' }}>San Jose State</Text>
              </Body>
          </Header>

          <Header transparent style={{ height: 75, marginTop: -95 }}>
              <Body style={{ flex: 1, alignItems: 'center', marginTop: 50, zIndex: 2 }}>
                  <Button 
                      transparent 
                      style={{ width: 100, height: 80, alignItems: 'center', justifyContent: 'center' }}
                      onPress={() => this.setState({ visibleModal: true })}
                  >
                      <Ionicons name="ios-arrow-down" size={25} color='#E5A823' style={{ marginTop: 15 }} />
                  </Button>
              </Body>
          </Header>

          <DeckSwiper
            ref={(c) => this._deckSwiper = c}
            dataSource={users}
            onSwipeRight={(item) => this.onRightSwipe(item, users)}
            onSwipeLeft={(item) => this.onLeftSwipe(item, users)}
            renderItem={item =>
                
            <Card key={item.id} style={{ elevation: 3 }}>
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
      </Container>
    );
  }
}

const styles = StyleSheet.create({
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
    },
    modalContent: {
        backgroundColor: '#0055A2',
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)'
    }
});

const mapstateToProps = (state) => {
    return {
        matcherUsers: state.matcherUsers
    };
};

const Matcher = connect(mapstateToProps, { getUsers, getLikes, addDisLike, addLike })(MatcherComp);

export { Matcher };
