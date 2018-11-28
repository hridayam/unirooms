import React, { Component } from 'react';
import { Text, Image, StyleSheet, View } from 'react-native';
import Slick from 'react-native-slick';
import { moderateScale } from '../common';

class MatcherSlick extends Component {

    renderImages = (images, choice) => {
        const views = [];
        if(!images)
        {
            choice.forEach((image, index) => {
                views.push(
                    <View key={index} style={styles.slide}>
                        <Image style={{height: moderateScale(200, 2), width: moderateScale(300, 2)}} key={image} source={{ uri: image }}/>
                    </View>
                )
            });
        }
        else {
            images.forEach((image, index) => {
                views.push(
                    <View key={index} style={styles.slide}>
                        <Image style={{height: moderateScale(200, 2), width: moderateScale(300, 2)}} key={image} source={{ uri: image }}/>
                    </View>
                )
            });
        }
        return(views);
    }

    render() {
        const {
            imageSource,
            choice
        } = this.props;

        return (
            <Slick style={styles.wrapper, {height: moderateScale(200, 2)}} showsButtons={true} showsPagination={false} scrollEnabled={false}>
                  {
                      this.renderImages(imageSource, choice)
                  }
            </Slick>

        );
    }
}


const styles = StyleSheet.create({
    wrapper: {
    },
    slide: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#92BBD9',
      height: moderateScale(200, 2)
    },
});

export { MatcherSlick };
