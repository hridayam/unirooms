import _ from 'lodash';
import React, { Component } from 'react';
import { AppRegistery, StyleSheet, Image } from 'react-native';
import { Content, Row, Grid, Button as NbButton, Icon as NbIcon, Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body } from 'native-base';
import { Carousel } from '../common';
import { Badge, Button, Divider, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { MatcherSlick } from '../common';

import { app } from '../../firebase-setup';
import { addLike, addDisLike, getUsers, getLikes } from '../actions';

// Display data
// update the data on swipe

//Update matches on database
// send user id
// retrieve user id's and run the algorithm


// once the swipe happens, update the user information
//figure out how to update the image
// update this data in the card


const cards = [
  {
    otherUser: 'name 1',
    uID: 'A',
    age: 12,
    major: 'Comp science',
    description: 'this is a sample of what a student can write about in their description. This can be as long as possible.',
    image: 'source it'
},
{
    otherUser: 'name 2',
    uID: 'B',
    age: 16,
    major: 'Comp science',
    description: 'this is a sample of what a student can write about in their description. This can be as long as possible.',
    image: 'source it'
}
];

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
        this.props.addDisLike(otherId);
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
                      <CardItem style={{ backgroundColor: '#00FFFF' }}>
                          <Content style={{height: 250}}>
                              <View style={{ flexDirection: 'row' }}>
                                  <Text adjustsFontSizeToFit style={[styles.priceText, { flex: 4 }]}>{item.code}</Text>
                              </View>

                              <Divider style={{ backgroundColor: 'black', marginBottom: 5 }} />

                              <Text style={styles.descriptionText}>1 Bed, 2 Bath, 1088 soft</Text>
                              <Text style={styles.descriptionText}>Condo, 342 Days on Trulia</Text>
                              <Text style={styles.descriptionText}>Est. Mortgage $52,604</Text>

                              <Text style={styles.descriptionText}>this is a sample of what a student can write about in their description. This can be as long as possible.</Text>
                          </Content>
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
  }
})

const mapstateToProps = (state) => {
    return {
        matcherUsers: state.matcherUsers
    }
}

const Matcher = connect(mapstateToProps, { getUsers, getLikes })(MatcherComp);

export { Matcher };
