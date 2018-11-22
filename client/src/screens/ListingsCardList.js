import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Content, Header, Left, Right, Body, Title, Icon, Button } from 'native-base';
import { ListingsViewCardComponent } from '../common';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

class ListingsCardList extends Component {
    render() {
        return (
            <Container style={{ flex: 1 }}>
                <Header style={{ height: 75 }}>
                    <Left style={{ flex: 1 }}>
                        <Button 
                            transparent
                            style={{ marginLeft: 3 }}
                            onPress={() => this.props.navigation.navigate({ routeName: 'Form', transitionStyle: 'inverted' })}
                        >
                            <MaterialIcons name="library-add" size={30} />
                        </Button>
                    </Left>
                    <Body style={{ flex: 1, alignItems: 'center' }}>
                        <Title>SJSU</Title>
                    </Body>
                    <Right style={{ flex: 1 }}>
                        <Button 
                            transparent
                        >
                            <FontAwesome name="sliders" size={30} />
                        </Button>
                    </Right>
                </Header>

                <Content>
                    <TouchableOpacity 
                        activeOpacity={0.4} 
                        onPress={() => this.props.navigation.navigate('Details')} 
                    >
                        <ListingsViewCardComponent 
                            posterName='Wade Douglas'
                            postDate='June 19, 2018'
                            posterImageSource='https://i.kym-cdn.com/entries/icons/medium/000/009/754/PhotogenicGuy.jpg'
                            imageSource='https://images.craigslist.org/00x0x_bpgidDrSIlE_600x450.jpg' 
                            title='Home for Rent in Aptos' 
                            streetAddress='325 Homewood Court Rahway, NJ 07065'
                            housingType='Apartment'
                            rentingPrice='1000'
                            beds='3'
                            baths='2'
                        />
                    </TouchableOpacity>

                    <ListingsViewCardComponent 
                        posterName='Wade Douglas'
                        postDate='June 19, 2018'
                        posterImageSource='https://i.kym-cdn.com/entries/icons/medium/000/009/754/PhotogenicGuy.jpg'
                        imageSource='https://images.craigslist.org/00x0x_bpgidDrSIlE_600x450.jpg' 
                        title='Home for Rent in Aptos'
                        streetAddress='325 Homewood Court Rahway, NJ 07065'
                        housingType='Apartment'
                        rentingPrice='1000'
                        beds='3'
                        baths='2'
                    />

                    <ListingsViewCardComponent 
                        posterName='Wade Douglas'
                        postDate='June 19, 2018'
                        posterImageSource='https://i.kym-cdn.com/entries/icons/medium/000/009/754/PhotogenicGuy.jpg'
                        imageSource='https://images.craigslist.org/00x0x_bpgidDrSIlE_600x450.jpg' 
                        title='Home for Rent in Aptos'
                        streetAddress='325 Homewood Court Rahway, NJ 07065'
                        housingType='Apartment'
                        rentingPrice='1000'
                        beds='3'
                        baths='2'
                    />
                </Content>
            </Container>
        );
    }
}

export { ListingsCardList };
