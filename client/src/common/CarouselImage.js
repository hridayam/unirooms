import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const width = screenWidth;
const height = screenHeight;

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
      alignItems: 'center',
      overflow: 'visible',
    },
    image: Platform.select({
        ios: {
          width,
          height: width - ((height / width) * 10),
        },
        android: {
          width,
          height: width - ((height / width) * 10),
        },
    })
});

export default CarouselImage;
