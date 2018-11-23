import React, { Component } from 'react';
import { 
    View, StyleSheet, Dimensions, Platform, Alert
} from 'react-native';
import { Avatar } from 'react-native-elements';
import { ImagePicker, Permissions } from 'expo';
import PropTypes from 'prop-types';

import { scale, verticalScale, moderateScale } from './Scaling';

let { width } = Dimensions.get('window');
const margin = moderateScale(10);
width /= 3;
width -= (margin * 2);
const padding = 5;
const contentWidth = width - (2 * padding);
const crossComponentSize = contentWidth * (3 / 10);

class ImageSelector extends Component {
    state = {
        uri: null
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ uri: nextProps.uri });
    }

    onImageSelectorPress = async () => {
        if (Platform.OS === 'ios') {
            const status = await this.requestPerms();
            if (status === 'granted') {
                this.openImageSelector();
            }
        } else {
            this.openImageSelector();
        }
    }

    openImageSelector = async () => {
        const { uri, cancelled, base64 } = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'Images',
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
            base64: true
        });
        if (cancelled) { 
            return;
        }
        //this.setState({ uri });
        this.props.setImage(uri, base64);
    }

    removeImage = () => {
        return (
            Alert.alert(
                'Remove Image',
                'Are you sure you want to remove this Image?',
                [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'OK', 
                        onPress: () => {
                            this.setState({ uri: null });
                            this.props.onRemove(this.props.id);
                        }
                    },
                ],
                { cancelable: false }
            )
        );
    }

    // only run this for iOS. Returns permission status: success, denied
    requestPerms = async () => {
        const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
        if (status === 'denied') {
            Alert.alert('Please give us permissions to access the camera roll');
        }
        return status;
    }

    render() {
        const { uri } = this.state;
        return (
            <View style={[styles.containerStyle, this.props.square ? styles.square : {}]}>
                {
                    this.state.uri === null ? 
                    <Avatar
                        icon={{ name: 'add-circle-outline', size: width / 3, color: '#fff' }}
                        rounded
                        overlayContainerStyle={[
                            { backgroundColor: '#EEEEEE', borderRadius: contentWidth / 2 },
                            this.props.square ? styles.square : {}
                        ]}
                        onPress={this.onImageSelectorPress}
                        containerStyle={styles.AvatarContainerStyle}
                    /> :
                    <Avatar 
                        source={{ uri }}
                        overlayContainerStyle={[
                            { borderRadius: contentWidth / 2 },
                            this.props.square ? styles.square : {}
                        ]}
                        onPress={this.removeImage}
                        avatarStyle={[
                            { borderRadius: contentWidth / 2, height: contentWidth, width: contentWidth },
                            this.props.square ? styles.square : {}
                        ]}
                        containerStyle={styles.AvatarContainerStyle}
                    />
                }
                {
                    this.state.uri ?
                    <Avatar
                        icon={{ name: 'times', size: crossComponentSize - moderateScale(5), type: 'font-awesome', color: '#fff' }}
                        overlayContainerStyle={{ 
                            backgroundColor: 'red', 
                            borderRadius: crossComponentSize / 2 
                        }}
                        onPress={this.removeImage}
                        containerStyle={[
                            styles.crossSignContainerStyle,
                            this.props.square ? styles.crossSignContainerSquaredStyle : {}
                        ]}
                    />
                    :
                    <View />
                }
            </View>
        );
    }
}

ImageSelector.propTypes = {
    uri: PropTypes.string,
    id: PropTypes.number.isRequired,
    onRemove: PropTypes.func.isRequired,
    setImage: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderColor: '#000',
        padding,
        height: width,
        width,
        borderRadius: width / 2,
        margin
    },
    buttonContainerViewStyle: {
        marginLeft: 0, 
        marginRight: 0,
    },
    buttonStyle: {
        height: (width / 3) - 10
    },
    AvatarContainerStyle: {
        top: 0, 
        right: 0, 
        left: 0, 
        bottom: 0, 
        position: 'relative',
        height: contentWidth,
        width: contentWidth,
        borderRadius: contentWidth / 2
    },
    crossSignContainerStyle: {
        top: 0, 
        right: 0, 
        position: 'absolute',
        height: crossComponentSize,
        width: crossComponentSize
    }, 
    crossSignContainerSquaredStyle: {
        top: -crossComponentSize / 4,
        right: -crossComponentSize / 4,
    },
    square: {
        borderRadius: width / 15
    }
});

export { ImageSelector };
