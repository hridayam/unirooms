import React, { Component } from 'react';
import {
  StyleSheet,
  Text
} from 'react-native';
import { Container } from 'native-base';

import Carousel from '../common/Carousel';

const images = [
    { key: '0', src: 'http://www.bistiproofpage.com/wp-content/uploads/2018/04/cute-profile-pics-for-whatsapp-images.png' },
    { key: '1', src: 'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg-1024x683.jpg' },
    { key: '2', src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTZTrqDBgtLBA_aidPI1coEufPiSM6KxBCWtAl-uJW1F4MN-9b' },
    { key: '3', src: 'https://www.abilitynet.org.uk/sites/abilitynet.org.uk/files/admin/Rhianna_Kinchin.jpg' }
];

//TODO: fix caoursel to display image more
class UserProfile extends Component {
    state = {
        currentIndex: 0
    }

    render() {
        return (
            <Container style={styles.container}>
                <Carousel images={images} />
                <Container style={styles.body}>
                    <Text>lol</Text>
                </Container>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold'
    },
    fill: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1
    },
    body: {
        flex: 2
    }
});

export { UserProfile };
