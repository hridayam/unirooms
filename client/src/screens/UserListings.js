import React, { Component } from 'react';
import { Text, Image, StyleSheet, YellowBox, ImageBackground, TouchableOpacity, View } from 'react-native';
import { Container, Content, Header, Left, Body, Right, Icon, Title, Button, Form, Item, Input, Label } from 'native-base';
import { ImagePicker, Permissions } from 'expo';
import { Entypo, FontAwesome, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Dialog, { DialogTitle, DialogContent, ScaleAnimation } from 'react-native-popup-dialog';

class UserListings extends Component {
    render() {
        return (
            <Container style={{ flex: 1 }}>
                <Header style={{ height: 75 }}>
                    <Left style={{ flex: 1 }} />
                    <Body style={{ flex: 1, alignItems: 'center' }}>
                        <Title>Your Listings</Title>
                    </Body>
                    <Right style={{ flex: 1 }}>
                        <Button 
                            transparent
                        >
                            <MaterialCommunityIcons name="square-edit-outline" size={30} />
                        </Button>
                    </Right>
                </Header>
            </Container>
        );
    }
}

export { UserListings };
