import React, { Component } from 'react';
import SideSwipe from 'react-native-sideswipe';
import { StyleSheet, Dimensions } from 'react-native';

import { CarouselImage } from './';

const { width } = Dimensions.get('window');

class Carousel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0,
            images: this.props.images
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            images: nextProps.images,
            currentIndex: 0
        });
    }

    render() {
        const { images } = this.state;
        const offset = 0;
        return (
            <SideSwipe
                data={images}
                shouldCapture={() => this.props.shouldCapture}
                style={[styles.fill, { width }, this.props.styles]}
                itemWidth={CarouselImage.WIDTH}
                threshold={CarouselImage.WIDTH / 2}
                useVelocityForIndex={false}
                contentOffset={offset}
                extractKey={item => item.key}
                onIndexChange={index => this.setState({ currentIndex: index })}
                renderItem={({ itemIndex, currentIndex, item, animatedValue }) => (
                    <CarouselImage
                        image={item}
                        index={itemIndex}
                        currentIndex={currentIndex}
                        animatedValue={animatedValue}
                    />
                )}
            />
        );
    }
}

const styles = StyleSheet.create({
    fill: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1
    }
});

export { Carousel };
