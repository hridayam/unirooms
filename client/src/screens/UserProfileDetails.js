import React, { Component } from 'react';
import { Text, Image, StyleSheet, YellowBox, ImageBackground, TouchableOpacity, View } from 'react-native';
import { Container, Content, Header, Left, Body, Right, Icon, Title, Button, Form, Item, Input, Label } from 'native-base';
import { ImagePicker, Permissions } from 'expo';
import { Entypo, FontAwesome, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Dialog, { DialogTitle, DialogContent, ScaleAnimation } from 'react-native-popup-dialog';
import { ProfileDetailsComponent } from '../common';

class UserProfileDetails extends Component {
    constructor(props) {
      super(props);
      this.state = {
        scaleAnimationDialog: false,
      };
    }
    render() {
        return (
          <Container style={{ flex: 1 }}>
            <Header transparent style={{ height: 75, zIndex: 1 }}>
                <Left style={{ flex: 1 }} />
                <Body style={{ flex: 1 }} />
                <Right style={{ flex: 1 }}>
                    <Button 
                        style={{ 
                          marginTop: 20, 
                          marginRight: 10, 
                          height: 50, 
                          backgroundColor: 'white', 
                          borderColor: 'black', 
                          borderWidth: 1, 
                          //borderRadius: 25, for circle
                          borderRadius: 10,
                          alignItems: 'center', 
                          justifyContent: 'center'
                        }}
                        onPress={() => this.setState({ scaleAnimationDialog: true })}
                    >
                        <MaterialCommunityIcons name="settings" size={40} color='black' />
                    </Button>
                </Right>
            </Header>

            <Content style={{ marginTop: -75, zIndex: -1 }}>
              <ProfileDetailsComponent
                uri={['https://www.robotbutt.com/wp-content/uploads/2015/08/College-Student-Thumbs-Up-e1440734712137.jpg', 
                'https://st.depositphotos.com/2931363/5142/i/950/depositphotos_51425941-stock-photo-student-reading-book-against-the.jpg']}
                firstName='John'
                lastName='Doe'
                age='22'
                female={false}
                male={true}
                ethnicity='White/Caucasian'
                religion='Christian'
                academicMajor='Computer Engineering'
                bold={true}
                cautious={false}
                creative={true}
                dutiful={true}
                easygoing={true}
                excitable={false}
                lively={false}
                playful={true}
                reserved={false}
                serious={false}
                skeptical={false}
                willful={true}
                artsAndCrafts={false}
                boardGames={false}
                cooking={true}
                dance={false}
                exercise={true}
                music={true}
                photography={true}
                reading={false}
                socializing={true}
                sports={true}
                videoGames={true}
                watchingShows={true}
                userDescription="Hi, my name is John Doe and I would like to find a roommate. Hi, my name is John Doe and I would like to find a roommate. Hi, my name is John Doe and I would like to find a roommate. Hi, my name is John Doe and I would like to find a roommate."
                smoking="Didn't Say"
                drinking="Didn't Say"
                drugs="Didn't Say"
              />
            </Content>

            <Dialog
              onDismiss={() => {
                this.setState({ scaleAnimationDialog: false });
              }}  
              onTouchOutside={() => {
                this.setState({ scaleAnimationDialog: false });
              }}
              visible={this.state.scaleAnimationDialog}
              dialogAnimation={
                new ScaleAnimation({ toValue: 0, animationDuration: 500, useNativeDriver: true })
              }
            >
              <DialogContent>
                <Button 
                  style={{ 
                    width: 250,
                    backgroundColor: 'white',
                    borderColor: 'black',
                    borderWidth: 1,
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 25
                  }}
                >
                  <Text style={{ fontSize: 18, fontWeight: '600' }}>
                    Edit Profile
                  </Text>
                </Button>
                <Button 
                  style={{ 
                    width: 250,
                    backgroundColor: 'white',
                    borderColor: '#cc0000',
                    borderWidth: 1,
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 25
                  }}
                >
                  <Text style={{ fontSize: 18, fontWeight: '600', color: '#cc0000' }}>
                    Log Out
                  </Text>
                </Button>
              </DialogContent>
            </Dialog>

          </Container>
        );
    }
}

export { UserProfileDetails };
