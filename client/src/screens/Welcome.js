import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { icon } from '../common/images';

class Welcome extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                        <Image
                            style={{ 
                                width: 300, 
                                height: 250,
                                resizeMode: 'contain' 
                            }}
                            source={icon} 
                        />
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate('Login')}
                    >
                        <Text style={styles.buttonText}>Log In</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate('Register')}
                    >
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    logoContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoText: {
        marginVertical: 15,
        fontSize: 18,
        color: 'rgba(255, 255, 255, 0.7)'
    },
    container: {
        backgroundColor: '#455a64',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    button: {
        width: 300,
        backgroundColor: '#1c313a',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    }
});

export { Welcome };
