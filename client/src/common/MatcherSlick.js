import React, { Component } from 'react';
import { Text, Image, StyleSheet, View } from 'react-native';
import Slick from 'react-native-slick';

class MatcherSlick extends Component {

    renderImages = (images, choice) => {
        const views = [];
        if(!images)
        {
            choice.forEach(image => {
                views.push(
                    <View style={styles.slide}>
                        <Image style={{height: 250, width: 350}} key={image} source={{ uri: image }}/>
                    </View>
                )
            });
        }
        else {
            images.forEach(image => {
                views.push(
                    <View style={styles.slide}>
                        <Image style={{height: 250, width: 350}} key={image} source={{ uri: image }}/>
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
            <Slick style={styles.wrapper, {height: 250}} showsButtons={true} showsPagination={false} scrollEnabled={false}>
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
      height: 250
    },
});

export { MatcherSlick };
