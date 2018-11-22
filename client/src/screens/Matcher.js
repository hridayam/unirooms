import React, { Component } from 'react';
import { AppRegistery, StyleSheet, Image } from 'react-native';
import { Content, Row, Grid, Button as NbButton, Icon as NbIcon, Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body } from 'native-base';
import { Carousel } from '../common';
import { Badge, Button, Divider, Icon } from 'react-native-elements';
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
                  <Slick style={styles.wrapper, {height: 250}} showsButtons={true} showsPagination={false} scrollEnabled={false}>
                        <View style={styles.slide}>
                            <Image style={{height: 250, width: 350}} source={require('../resources/d.png')} />
                        </View>
                        <View style={styles.slide}>
                          <Image style={{height: 250, width: 350}} source={require('../resources/p.jpg')} />
                        </View>
                  </Slick>
                </CardItem>
                <CardItem style={{ backgroundColor: '#00FFFF' }}>
                    <Content style={{height: 250}}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text adjustsFontSizeToFit style={[styles.priceText, { flex: 4 }]}>Michael Scott</Text>
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
  wrapper: {
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
    height: 250
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
})

export { Matcher };
