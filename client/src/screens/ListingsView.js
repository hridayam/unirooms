import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Content, Header, Left, Right, Body, Title, Icon, Button } from 'native-base';
import CardComponent from '../common/CardComponent';

class ListingsView extends Component {
    render() {
        return (
            <Container style={{ flex: 1 }}>
                <Header>
                    <Left style={{ flex: 1 }}>
                        <Button 
                            transparent
                            onPress={() => this.props.navigation.navigate('Form')}
                        >
                            <Icon name="library-add" type="MaterialIcons" />
                        </Button>
                    </Left>
                    <Body style={{ flex: 1, alignItems: 'center' }}>
                        <Title>SJSU</Title>
                    </Body>
                    <Right style={{ flex: 1 }}>
                        <Button transparent>
                            <Icon name="sliders" type="FontAwesome" />
                        </Button>
                    </Right>
                </Header>
 

                <Content>
                    <TouchableOpacity 
                        activeOpacity={0.4} 
                        onPress={() => this.props.navigation.navigate('Details')} 
                    >
                        <CardComponent 
                            posterName='Wade Douglas'
                            postDate='June 19, 2018'
                            posterImageSource='https://i.kym-cdn.com/entries/icons/medium/000/009/754/PhotogenicGuy.jpg'
                            imageSource='https://images.craigslist.org/00x0x_bpgidDrSIlE_600x450.jpg' 
                            title='4br - 2859ft2 - Home for Rent in Aptos' 
                            description='Elegant yet comfortable, sophisticated and effortless, 
                            the achievement of architecture and art reflects the breathtaking 
                            natural setting in the exclusive and private, gated community of 
                            Seascape Uplands. 4 Bedrooms, 3.5 Bathrooms on a highly coveted 6,970 
                            SF lot, offers panoramic views of the shimmering waters of Monterey Bay,
                            and an expansive natural preserve. This modern, "green" home is a 
                            kaleidoscope of wood, glass, stone and light, a place where function 
                            never compromises and creativity never capitulates.'
                        />
                    </TouchableOpacity>

                    <CardComponent 
                        posterName='Wade Douglas'
                        postDate='June 19, 2018'
                        posterImageSource='https://i.kym-cdn.com/entries/icons/medium/000/009/754/PhotogenicGuy.jpg'
                        imageSource='https://images.craigslist.org/00x0x_bpgidDrSIlE_600x450.jpg' 
                        title='4br - 2859ft2 - Home for Rent in Aptos' 
                        description='Elegant yet comfortable, sophisticated and effortless, 
                        the achievement of architecture and art reflects the breathtaking 
                        natural setting in the exclusive and private, gated community of 
                        Seascape Uplands. 4 Bedrooms, 3.5 Bathrooms on a highly coveted 6,970 
                        SF lot, offers panoramic views of the shimmering waters of Monterey Bay,
                        and an expansive natural preserve. This modern, "green" home is a 
                        kaleidoscope of wood, glass, stone and light, a place where function 
                        never compromises and creativity never capitulates.'
                    />

                    <CardComponent 
                        posterName='Wade Douglas'
                        postDate='June 19, 2018'
                        posterImageSource='https://i.kym-cdn.com/entries/icons/medium/000/009/754/PhotogenicGuy.jpg'
                        imageSource='https://images.craigslist.org/00x0x_bpgidDrSIlE_600x450.jpg' 
                        title='4br - 2859ft2 - Home for Rent in Aptos' 
                        description='Elegant yet comfortable, sophisticated and effortless, 
                        the achievement of architecture and art reflects the breathtaking 
                        natural setting in the exclusive and private, gated community of 
                        Seascape Uplands. 4 Bedrooms, 3.5 Bathrooms on a highly coveted 6,970 
                        SF lot, offers panoramic views of the shimmering waters of Monterey Bay,
                        and an expansive natural preserve. This modern, "green" home is a 
                        kaleidoscope of wood, glass, stone and light, a place where function 
                        never compromises and creativity never capitulates.'
                    />
                </Content>
            </Container>
        );
    }
}

export { ListingsView };
