import React, { Component } from 'react';
import {
    Text,
    View,
    Dimensions
} from 'react-native';
import { Header } from 'react-native-elements';

import { ImageSelector } from '../common';

const { width } = Dimensions.get('window');

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uri: []
        };
    }

    onRemove = (key) => {
        const { uri } = this.state;
        console.log(key, uri.length);
        if (key > uri.length) {
            return;
        }
        uri.splice(key, 1);
        this.setState({ uri });
    }

    setImage = (uri) => {
        const newArray = this.state.uri.concat(uri);
        this.setState({ uri: newArray });
    }

    renderImageSelectors = () => {
        const rows = [];
        const { uri } = this.state;

        for (let i = 0; i < 6; i++) {
            rows.push(
                <ImageSelector 
                    key={i} id={i}
                    uri={uri[i] ? uri[i] : null} 
                    setImage={this.setImage} 
                    onRemove={this.onRemove}
                />
            );
        }
        return (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {rows}
            </View>
        );
    }

    render() {
        return (
            <View>
                <Header
                    backgroundColor="#fff"
                    leftComponent={<Text style={{ fontWeight: '400', fontSize: 25 }}>Edit Profile</Text>}
                    rightComponent={{ icon: 'x', type: 'feather', size: 25 }}
                />
                {this.renderImageSelectors()}
            </View>
        );
    }
}

export { EditProfile };
