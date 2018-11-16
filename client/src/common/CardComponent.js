import React, { Component } from 'react';
import { Text, Image } from 'react-native';
import { Card, CardItem, Thumbnail, Body, Left } from 'native-base';

class CardComponent extends Component {
    render() {
        const {
            posterName,
            postDate,
            posterImageSource,
            imageSource,
            title,
            description
        } = this.props;

        return (
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={{ uri: posterImageSource }} />
                        <Body>
                            <Text>{posterName}</Text>
                            <Text note>Posted {postDate}</Text>
                        </Body>
                    </Left>
                </CardItem>

                <CardItem cardBody>
                    <Image
                        source={{ uri: imageSource }}
                        style={{ height: 200, width: null, flex: 1 }}
                    />
                </CardItem>

                <CardItem>
                    <Body>
                        <Text style={{ fontSize: 25, fontWeight: '900' }}>
                            {title}
                        </Text>
                        <Text>
                            {description}
                        </Text>
                    </Body>
                </CardItem>
            </Card>
        );
    }
}

export { CardComponent };
