import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, H1, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon } from 'native-base';
const cards = [
  {
    text: 'Card One',
    name: 'One',
    image: require('../resources/cardOne.jpg')
  },
  {
    text: 'Card Two',
    name: 'Two',
    image: require('../resources/cardTwo.jpg')
  },
  {
    text: 'Card Three',
    name: 'Three',
    image: require('../resources/cardThree.jpg')
  }
];

export default class Carasoul extends Component {

  render() {
    return (
      <Container>
        <View>
          <DeckSwiper
            dataSource={cards}
            renderItem={item =>
              <Card style={{ elevation: 3 , margin: 0, padding: 0}}>
                <CardItem cardBody>
                  <Image style={{ width: 160, height: 240, flex: 1 }} source={item.image} />
                </CardItem>
              </Card>
            }
          />
        </View>
      </Container>
    );
  }
}

export { Carasoul };
