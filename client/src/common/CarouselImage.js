import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');
const width = screenWidth;

class CarouselImage extends Component {
    static WIDTH = width;

    render() {
        const { animatedValue, image, index } = this.props;

        return (
            <Animated.View style={styles.container}>
                <Animated.Image
                    style={[
                        styles.image, {
                            transform: [{
                                scale: animatedValue.interpolate({
                                    inputRange: [index - 1, index, index + 1],
                                    outputRange: [1, 1, 1],
                                    extrapolate: 'clamp',
                                }),
                            }, {
                                rotate: animatedValue.interpolate({
                                    inputRange: [index - 1, index, index + 1],
                                    outputRange: ['0deg', '0deg', '0deg'],
                                    extrapolate: 'clamp',
                                }),
                            }],
                        },
                    ]}
                    source={{ uri: image.src }}
                />
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width,
        justifyContent: 'center',
        overflow: 'visible'
    },
    image: {
        width,
        //height: width - ((height / width) * 10),
        height: width * (3 / 4)
    },
});

export { CarouselImage };
