import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
    Container, Content, Row, Grid, Button as NbButton, Icon as NbIcon
} from 'native-base';
import { Badge, Button, Divider, Icon } from 'react-native-elements';
import { Carousel } from '../common';

export default class Matcher extends Component {

    constructor(props) {
        super(props);
        this.state = {
            images: this.props.images
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            images: nextProps.images,
        });
    }

  render() {
      const { images } = this.state;
    return (
        <Container>
            <Carousel images={images} shouldCapture />
            <Content style={[styles.body]}>
                <View style={{ flexDirection: 'row' }}>
                    <Text adjustsFontSizeToFit style={[styles.priceText, { flex: 4 }]}>Michael Scott</Text>
                </View>

                <Divider style={{ backgroundColor: 'black', marginBottom: 5 }} />

                <Text style={styles.descriptionText}>1 Bed, 2 Bath, 1088 soft</Text>
                <Text style={styles.descriptionText}>Condo, 342 Days on Trulia</Text>
                <Text style={styles.descriptionText}>Est. Mortgage $52,604</Text>

                <Text style={styles.descriptionText}>this is a sample of what a student can write about in their description. This can be as long as possible.</Text>
            </Content>
        </Container>
    );
  }
}
