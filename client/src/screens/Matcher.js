import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { DeckSwiper, Card, Left, 
    CardItem, Body, Thumbnail
} from 'native-base';

const cards = [
    {
        text: 'Card One',
        name: 'One',
        image: require('../../assets/icon.png')
    }, {
        text: 'Card Two',
        name: 'Two',
        image: require('../../assets/icon.png')
    }
];

class Matcher extends Component {
    render() {
        return (
            <View>
                <DeckSwiper
                    dataSource={cards}
                    renderItem={item =>
                        <Card style={{ elevation: 3 }}>
                            <CardItem>
                                <Left>
                                    <Thumbnail source={item.image} />
                                    <Body>
                                        <Text>{item.text}</Text>
                                        <Text note>NativeBase</Text>
                                    </Body>
                                </Left>
                            </CardItem>

                            <CardItem cardBody>
                                <Image style={{ height: 300, flex: 1 }} source={item.image} />
                            </CardItem>
                            
                            <CardItem>
                                { //<Icon name="heart" style={{ color: '#ED4A6A' }} />
                                }
                                <Text>{item.name}</Text>
                            </CardItem>
                        </Card>
                    }
                />
            </View>
        );
    }
}

export { Matcher };
