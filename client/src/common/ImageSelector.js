import React, { Component } from 'react';
import { 
    View, StyleSheet, Dimensions, Platform, Alert
} from 'react-native';
import { Avatar } from 'react-native-elements';
import { ImagePicker, Permissions } from 'expo';

let { width } = Dimensions.get('window');
const margin = 10;
width /= 3;
width -= (margin * 2);
const padding = 5;
const contentWidth = width - (2 * padding);

class ImageSelector extends Component {
    state = {
        uri: null
    }

    onImageSelectorPress = async () => {
        if (Platform.OS === 'ios') {
            const status = await this.requestPerms();
            if (status === 'granted') {
                this.openImageSlector();
            }
        } else {
            this.openImageSlector();
        }
    }

    openImageSlector = async () => {
        const { uri, cancelled } = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'Images',
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1
        });
        if (cancelled) { 
            return;
        }
        this.setState({ uri });
    }

    removeImage = () => {
        return (
            Alert.alert(
                'Remove Image',
                'Are you sure you want to remove this Image?',
                [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'OK', onPress: () => this.setState({ uri: null }) },
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
            <View style={styles.containerStyle}>
                {
                    this.state.uri === null ? 
                    <Avatar
                        icon={{ name: 'add', size: width * (3 / 4), color: '#000' }}
                        rounded
                        overlayContainerStyle={{ backgroundColor: '#F0F0F0', borderRadius: contentWidth / 2 }}
                        onPress={this.onImageSelectorPress}
                        containerStyle={styles.AvatarContainerStyle}
                    /> :
                    <Avatar 
                        source={{ uri }}
                        overlayContainerStyle={{ borderRadius: contentWidth / 2 }}
                        onPress={this.removeImage}
                        avatarStyle={{ borderRadius: contentWidth / 2, height: contentWidth, width: contentWidth }}
                        containerStyle={styles.AvatarContainerStyle}
                    />
                }
                {
                    this.state.uri ?
                    <Avatar
                        icon={{ name: 'x', type: 'feather', color: '#000' }}
                        rounded small
                        overlayContainerStyle={{ backgroundColor: '#fff' }}
                        onPress={this.removeImage}
                        containerStyle={{ top: 0, right: 0, position: 'absolute' }}
                    />
                    :
                    <View />
                }
                    
                
            </View>
        );
    }
}

/* <Button
    containerViewStyle={styles.buttonContainerViewStyle}
    backgroundColor="#F0F0F0"
    buttonStyle={styles.buttonStyle}
    icon={{ name: 'add', size: width / 5, color: '#000' }}
    onPress={this.onImageSelectorPress}
/> */

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
    }
});

export { ImageSelector };
