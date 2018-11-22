import React, { Component } from 'react';
import { Image, StyleSheet, ScrollView } from 'react-native';
import { Container, Content, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon } from 'native-base';
import { Divider } from 'react-native-elements';
import { Carousel } from '../common';
import { Rslick } from '../common';

// const cards = [
//   {
//     text: 'Card One',
//     name: 'One',
//     image: require('../resources/one.jpg'),
//     imageT: require('../resources/one.jpg'),
//     imageR: require('../resources/one.jpg'),
//   }
// ];

const images = [
    { key: '0', src: 'http://www.bistiproofpage.com/wp-content/uploads/2018/04/cute-profile-pics-for-whatsapp-images.png' },
    { key: '1', src: 'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg-1024x683.jpg' },
    { key: '2', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTZTrqDBgtLBA_aidPI1coEufPiSM6KxBCWtAl-uJW1F4MN-9b' },
    { key: '3', src: 'https://www.abilitynet.org.uk/sites/abilitynet.org.uk/files/admin/Rhianna_Kinchin.jpg' }
];

/*
complete the UI, react-
when you swipe right
-it should add to the users likings
   >check where it is swiping right
   >
-
*/

export default class Matcher extends Component {
  render() {
    return (
        <Rslick />
      );
  }
}

const styles = StyleSheet.create({
    body: {
        paddingLeft: 10,
        paddingRight: 10
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
    badgeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        paddingLeft: 20,
        paddingRight: 20
    }
});

export { Matcher };
