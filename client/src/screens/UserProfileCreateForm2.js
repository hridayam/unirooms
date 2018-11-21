import React, { Component } from 'react';
import { Text, Image, StyleSheet, YellowBox, ImageBackground, TouchableOpacity, View, TextInput } from 'react-native';
import { Container, Content, Header, Left, Body, Right, Icon, Title, Button, Form, Item, Input, Label, Textarea } from 'native-base';
import { Entypo, FontAwesome, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import * as firebase from 'firebase';
import 'firebase/firestore';
import Dialog, { DialogTitle, DialogContent, SlideAnimation } from 'react-native-popup-dialog';
import { Col, Row, Grid } from 'react-native-easy-grid';
import RNPickerSelect from 'react-native-picker-select';
import { ProfileFormCustomButton } from '../common';

class UserProfileCreateForm2 extends Component {
	constructor(props) {
        super(props);
        this.state = {
            slideAnimationDialogSuccess: false,
            slideAnimationDialogFailure: false,
            uri: this.props.navigation.state.params.uri,
            firstName: this.props.navigation.state.params.firstName,
            lastName: this.props.navigation.state.params.lastName,
            age: this.props.navigation.state.params.age,
            female: this.props.navigation.state.params.female,
            male: this.props.navigation.state.params.male,  
            ethnicity: this.props.navigation.state.params.ethnicity,
            academicMajor: this.props.navigation.state.params.academicMajor,
            bold: false,
            cautious: false,
            creative: false,
            dutiful: false,
            easygoing: false,
            excitable: false,
            lively: false,
            playful: false,
            reserved: false,
            serious: false,
            skeptical: false,
            willful: false,
            artsAndCrafts: false,
            boardGames: false,
            cooking: false,
            dance: false,
            exercise: false,
            music: false,
            photography: false,
            reading: false,
            socializing: false,
            sports: false,
            videoGames: false,
            watchingShows: false,
            userDescription: '',


            smoking: "Didn't Say",
            smokingItems: [
                {
                    label: 'Yes',
                    value: 'Yes',
                },
                {
                    label: 'Sometimes',
                    value: 'Sometimes',
                },
                {
                    label: 'No',
                    value: 'No',
                },
            ],
            drinking: "Didn't Say",
            drinkingItems: [
                {
                    label: 'Often',
                    value: 'Often',
                },
                {
                    label: 'Socially',
                    value: 'Socially',
                },
                {
                    label: 'Not at all',
                    value: 'Not at all',
                },
            ],
            drugs: "Didn't Say",
            drugsItems: [
                {
                    label: 'Often',
                    value: 'Often',
                },
                {
                    label: 'Sometimes',
                    value: 'Sometimes',
                },
                {
                    label: 'Never',
                    value: 'Never',
                },
            ],
        };
    }

    render() {
        const { goBack } = this.props.navigation;
        return (
			<Container style={{ flex: 1 }}>
				<Header style={{ height: 75 }}>
                    <Left style={{ flex: 1 }}>
                        <Button 
                            transparent 
                            style={{ marginLeft: 3 }}
                            onPress={() => goBack()}
                        >
                            <Ionicons name="md-arrow-round-back" size={30} />
                        </Button>
                    </Left>
                    <Body style={{ flex: 1, alignItems: 'center' }}>
                        <Title>Your Profile</Title>
                    </Body>
                    <Right style={{ flex: 1 }} />
                </Header>

                <Content>
					<Form>
						<Grid>
                            <Row style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 20 }}>
                                <Text style={{ textAlign: 'center', fontSize: 22, fontWeight: '600' }}>
                                    What Personalities Define You?
                                </Text>
                            </Row>
                            <Row style={{ paddingBottom: 10 }}>
                                <Col size={33}> 
                                    <ProfileFormCustomButton title='Bold' selected={false} color='#69409E' fontSize={14} onPress={() => this.setState({ bold: !this.state.bold })} />
                                </Col>
                                <Col size={33}> 
                                    <ProfileFormCustomButton title='Cautious' selected={false} color='#69409E' fontSize={14} onPress={() => this.setState({ cautious: !this.state.cautious })} />
                                </Col>
                                <Col size={33}> 
                                    <ProfileFormCustomButton title='Creative' selected={false} color='#69409E' fontSize={14} onPress={() => this.setState({ creative: !this.state.creative })} />
                                </Col>
                            </Row>
                             <Row style={{ paddingBottom: 10 }}>
                                <Col size={33}> 
                                    <ProfileFormCustomButton title='Dutiful' selected={false} color='#69409E' fontSize={14} onPress={() => this.setState({ dutiful: !this.state.dutiful })} />
                                </Col>
                                <Col size={33}> 
                                    <ProfileFormCustomButton title='Easygoing' selected={false} color='#69409E' fontSize={14} onPress={() => this.setState({ easygoing: !this.state.easygoing })} />
                                </Col>
                                <Col size={33}> 
                                    <ProfileFormCustomButton title='Excitable' selected={false} color='#69409E' fontSize={14} onPress={() => this.setState({ excitable: !this.state.excitable })} />
                                </Col>
                            </Row>
                             <Row style={{ paddingBottom: 10 }}>
                                <Col size={33}> 
                                    <ProfileFormCustomButton title='Lively' selected={false} color='#69409E' fontSize={14} onPress={() => this.setState({ lively: !this.state.lively })} />
                                </Col>
                                <Col size={33}> 
                                    <ProfileFormCustomButton title='Playful' selected={false} color='#69409E' fontSize={14} onPress={() => this.setState({ playful: !this.state.playful })} />
                                </Col>
                                <Col size={33}> 
                                    <ProfileFormCustomButton title='Reserved' selected={false} color='#69409E' fontSize={14} onPress={() => this.setState({ reserved: !this.state.reserved })} />
                                </Col>
                            </Row>
                             <Row>
                                <Col size={33}> 
                                    <ProfileFormCustomButton title='Serious' selected={false} color='#69409E' fontSize={14} onPress={() => this.setState({ serious: !this.state.serious })} />
                                </Col>
                                <Col size={33}> 
                                    <ProfileFormCustomButton title='Skeptical' selected={false} color='#69409E' fontSize={14} onPress={() => this.setState({ skeptical: !this.state.skeptical })} />
                                </Col>
                                <Col size={33}> 
                                    <ProfileFormCustomButton title='Willful' selected={false} color='#69409E' fontSize={14} onPress={() => this.setState({ willful: !this.state.willful })} />
                                </Col>
                            </Row>

                            <Row style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 30, paddingBottom: 20 }}>
                                <Text style={{ textAlign: 'center', fontSize: 22, fontWeight: '600' }}>
                                    Your Hobbies and Lifestyle
                                </Text>
                            </Row>

                             <Row style={{ paddingBottom: 10 }}>
                                <Col size={33}> 
                                    <ProfileFormCustomButton title='Arts and Crafts' selected={false} color='#2C806F' fontSize={14} onPress={() => this.setState({ artsAndCrafts: !this.state.artsAndCrafts })} />
                                </Col>
                                <Col size={33}> 
                                    <ProfileFormCustomButton title='Board Games' selected={false} color='#2C806F' fontSize={14} onPress={() => this.setState({ boardGames: !this.state.boardGames })} />
                                </Col>
                                <Col size={33}> 
                                    <ProfileFormCustomButton title='Cooking' selected={false} color='#2C806F' fontSize={14} onPress={() => this.setState({ cooking: !this.state.cooking })} />
                                </Col>
                            </Row>
                             <Row style={{ paddingBottom: 10 }}>
                                <Col size={33}> 
                                    <ProfileFormCustomButton title='Dance' selected={false} color='#2C806F' fontSize={14} onPress={() => this.setState({ dance: !this.state.dance })} />
                                </Col>
                                <Col size={33}> 
                                    <ProfileFormCustomButton title='Exercise' selected={false} color='#2C806F' fontSize={14} onPress={() => this.setState({ exercise: !this.state.exercise })} />
                                </Col>
                                <Col size={33}> 
                                    <ProfileFormCustomButton title='Music' selected={false} color='#2C806F' fontSize={14} onPress={() => this.setState({ music: !this.state.music })} />
                                </Col>
                            </Row>
                             <Row style={{ paddingBottom: 10 }}>
                                <Col size={33}> 
                                    <ProfileFormCustomButton title='Photography' selected={false} color='#2C806F' fontSize={11} onPress={() => this.setState({ photography: !this.state.photography })} />
                                </Col>
                                <Col size={33}> 
                                    <ProfileFormCustomButton title='Reading' selected={false} color='#2C806F' fontSize={14} onPress={() => this.setState({ reading: !this.state.reading })} />
                                </Col>
                                <Col size={33}> 
                                    <ProfileFormCustomButton title='Socializing' selected={false} color='#2C806F' fontSize={12} onPress={() => this.setState({ socializing: !this.state.socializing })} />
                                </Col>
                            </Row>
                             <Row style={{ paddingBottom: 15 }}>
                                <Col size={33}> 
                                    <ProfileFormCustomButton title='Sports' selected={false} color='#2C806F' fontSize={14} onPress={() => this.setState({ sports: !this.state.sports })} />
                                </Col>
                                <Col size={33}> 
                                    <ProfileFormCustomButton title='Video Games' selected={false} color='#2C806F' fontSize={14} onPress={() => this.setState({ videoGames: !this.state.videoGames })} />
                                </Col>
                                <Col size={33}> 
                                    <ProfileFormCustomButton title='Watching Shows' selected={false} color='#2C806F' fontSize={14} onPress={() => this.setState({ watchingShows: !this.state.watchingShows })} />
                                </Col>
                            </Row>

                            <Row style={{ paddingBottom: 15 }}>
                                <Col size={5} />
                                <Col size={15} style={styles.colIcon}>
                                   <MaterialCommunityIcons name="smoking" size={30} />
                                </Col>
                                <Col size={5} />
                                <Col size={70}>
                                  <RNPickerSelect
                                    placeholder={{
                                      label: 'Smoking',
                                      value: null,
                                    }}
                                    style={{ ...pickerSelectStyles }}
                                    items={this.state.smokingItems}
                                    onValueChange={(value) => {
                                      this.setState({
                                          smoking: value,
                                      });
                                    }}
                                  />
                                </Col>
                                <Col size={5} />
                            </Row>

                            <Row style={{ paddingBottom: 15 }}>
                                <Col size={5} />
                                <Col size={15} style={styles.colIcon}>
                                   <Entypo name="drink" size={30} />
                                </Col>
                                <Col size={5} />
                                <Col size={70}>
                                  <RNPickerSelect
                                    placeholder={{
                                      label: 'Drinking',
                                      value: null,
                                    }}
                                    style={{ ...pickerSelectStyles }}
                                    items={this.state.drinkingItems}
                                    onValueChange={(value) => {
                                      this.setState({
                                          drinking: value,
                                      });
                                    }}
                                  />
                                </Col>
                                <Col size={5} />
                            </Row>

                            <Row>
                                <Col size={5} />
                                <Col size={15} style={styles.colIcon}>
                                   <MaterialCommunityIcons name="cannabis" size={30} />
                                </Col>
                                <Col size={5} />
                                <Col size={70}>
                                  <RNPickerSelect
                                    placeholder={{
                                      label: 'Drugs',
                                      value: null,
                                    }}
                                    style={{ ...pickerSelectStyles }}
                                    items={this.state.drugsItems}
                                    onValueChange={(value) => {
                                      this.setState({
                                          drugs: value,
                                      });
                                    }}
                                  />
                                </Col>
                                <Col size={5} />
                            </Row>

                            <Row style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 30, paddingBottom: 10 }}>
                                <Text style={{ textAlign: 'center', fontSize: 22, fontWeight: '600' }}>
                                    About Me
                                </Text>
                            </Row>
                            <Row>
                                <Col size={5} />
                                <Col size={90}>
                                    <Textarea
                                        style={{ borderRadius: 5, paddingRight: 10, paddingLeft: 10, paddingTop: 15, paddingBottom: 15, fontSize: 18 }}
                                        rowSpan={8} 
                                        bordered 
                                        returnKeyType='done'
                                        blurOnSubmit
                                        placeholder="A little bit about you..."
                                        onChangeText={(text) => this.setState({ userDescription: text })}
                                    />
                                </Col>
                                <Col size={5} />
                            </Row>


                            <Dialog
                                onDismiss={() => {
                                  this.setState({ slideAnimationDialogSuccess: false });
                                  this.props.navigation.navigate('Explore');
                                }}
                                onTouchOutside={() => {
                                  this.setState({ slideAnimationDialogSuccess: false });
                                  this.props.navigation.navigate('Explore');
                                }}
                                visible={this.state.slideAnimationDialogSuccess}
                                dialogTitle={<DialogTitle title="Succesfully created profile!" />}
                                dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
                                >
                                <DialogContent style={{ justifyContent: 'center', alignItems: 'center', marginTop: 25 }}>
                                  <MaterialCommunityIcons name="check-circle-outline" style={{ color: '#4BB543' }} size={75} />
                                </DialogContent>
                            </Dialog>
                            <Dialog
                                onDismiss={() => {
                                  this.setState({ slideAnimationDialogFailure: false });
                                }}
                                onTouchOutside={() => {
                                  this.setState({ slideAnimationDialogFailure: false });
                                }}
                                visible={this.state.slideAnimationDialogFailure}
                                dialogTitle={<DialogTitle title="Please fill in About Me form!" />}
                                dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
                            >
                                <DialogContent style={{ justifyContent: 'center', alignItems: 'center', marginTop: 25 }}>
                                  <MaterialCommunityIcons name="alert-circle-outline" style={{ color: '#cc0000' }} size={75} />
                                </DialogContent>
                            </Dialog>
                            <Row style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 30 }}>
                                 <Col size={100} style={{ paddingHorizontal: 20 }} >
                                 {this.state.userDescription === '' ?  
                                    <Button
                                        block
                                        onPress={() => this.setState({ slideAnimationDialogFailure: true })}
                                    >
                                        <Text style={{ color: 'white', fontSize: 22 }} >
                                          Complete
                                        </Text>
                                    </Button>
                                    :
                                    <Button 
                                        block
                                        onPress={() => this.setState({ slideAnimationDialogSuccess: true })}
                                        //onPress={() => this.addToDatabase()} Have to add all the user data to the current user
                                    >
                                        <Text style={{ color: 'white', fontSize: 22 }} >
                                          Complete
                                        </Text>
                                    </Button>
                                  }
                                </Col>
                            </Row>
						</Grid>
					</Form>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
  colIcon: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  uploadedImage: {
    borderRadius: 8,
    height: 110,
    width: 110,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  deleteImage: {
    height: 50,
    width: 50,
    position: 'absolute'
  },
  genderButton: {
  	borderRadius: 8,
    height: 80,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  maleColor: {
  	backgroundColor: '#304bff'
  },
  femaleColor: {
    backgroundColor: '#ff5bc0'
  }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 18,
        paddingVertical: 15,
        backgroundColor: 'white',
        color: 'black',
        borderBottomColor: '#dfdfdf',
        borderBottomWidth: 1,
        textAlign: 'center'
    },
});

export { UserProfileCreateForm2 };
