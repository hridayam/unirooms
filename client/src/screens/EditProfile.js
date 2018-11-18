import React, { Component } from 'react';
import {
    Text, View,
    StyleSheet
} from 'react-native';
import { Header } from 'react-native-elements';
import { Content, Textarea } from 'native-base'; 

import { ImageSelector, scale, verticalScale, moderateScale } from '../common';

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
            <Content style={styles.container}>
                <Header
                    backgroundColor="#fff"
                    leftComponent={<Text style={{ fontWeight: '400', fontSize: 25 }}>Edit Profile</Text>}
                    rightComponent={{ icon: 'x', type: 'feather', size: 25 }}
                />
                {this.renderImageSelectors()}

                <Text style={styles.headingStyle}>About me</Text>
                <Textarea 
                    rowSpan={5} 
                    placeholderTextColor='#BDBDBD' 
                    bordered placeholder="A little about you..." 
                    style={styles.textAreaStyle}
                />
            </Content>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FAFAFA'
    },
    headingStyle: {
        color: '#BDBDBD',
        marginLeft: moderateScale(20),
        marginTop: moderateScale(30),
        fontSize: moderateScale(15),
        fontWeight: '400'
    },
    textAreaStyle: {
        color: '#212121',
        backgroundColor: '#FFFFFF',
        paddingLeft: moderateScale(20),
        paddingTop: moderateScale(10),
        paddingRight: moderateScale(20),
        fontSize: moderateScale(15),
        fontWeight: '400'
    }
});

export { EditProfile };
