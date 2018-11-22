import React, { Component } from 'react';
import { AppRegistery, StyleSheet, Image } from 'react-native';
import { Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon } from 'native-base';
import { Carousel } from '../common';
import Slick from 'react-native-slick';


const cards = [
  {
    text: 'Card One',
    name: 'One'
  }
];

const images = [
    { key: '0', src: 'http://www.bistiproofpage.com/wp-content/uploads/2018/04/cute-profile-pics-for-whatsapp-images.png' },
    { key: '1', src: 'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg-1024x683.jpg' },
    { key: '2', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTZTrqDBgtLBA_aidPI1coEufPiSM6KxBCWtAl-uJW1F4MN-9b' },
    { key: '3', src: 'https://www.abilitynet.org.uk/sites/abilitynet.org.uk/files/admin/Rhianna_Kinchin.jpg' }
];

export default class Matcher extends Component {
  render() {
    return (
      <Container>
        <View>
          <DeckSwiper
            dataSource={cards}
            renderItem={item =>
              <Card style={{ elevation: 3}}>
                <CardItem cardBody>
                  <Slick style={styles.wrapper, {height: 500}} showsButtons={true} autoplayDirection={false} autoplay={false} loadMinimal={true}>
                        <View style={styles.slide1}>
                            <Image style={{ height: 300, flex: 1 }} source='http://www.bistiproofpage.com/wp-content/uploads/2018/04/cute-profile-pics-for-whatsapp-images.png' />
                        </View>
                        <View style={styles.slide2}>
                          <Text style={styles.text}>Beautiful</Text>
                        </View>
                        <View style={styles.slide3}>
                          <Text style={styles.text}>And simple</Text>
                        </View>
                  </Slick>
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
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
})

export { Matcher };
