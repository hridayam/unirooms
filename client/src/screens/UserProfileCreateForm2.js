import React, { Component } from 'react';
import { Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Container, Content, Header, Left, Body, Right, Title, Button, Form, Textarea } from 'native-base';
import { Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Dialog, { DialogTitle, DialogContent, SlideAnimation } from 'react-native-popup-dialog';
import { Col, Row, Grid } from 'react-native-easy-grid';
import RNPickerSelect from 'react-native-picker-select';
import { connect } from 'react-redux';

import { ProfileFormCustomButton } from '../common';
import { updateUserData } from '../actions';

class UserProfileCreateForm2Comp extends Component {
	constructor(props) {
        super(props);

        const { 
            personality, 
            lifestyle, 
            description = '',
            smoking = 'Didn\'t say',
            drinking = 'Didn\'t say',
            drugs = 'Didn\'t say'
        } = this.props.user;

        const data = {};

        personality.forEach(val => {
            data[val] = true;
        });

        lifestyle.forEach(val => {
            data[val] = true;
        });

        const {
            bold = false,
            cautious = false,
            creative = false,
            dutiful = false,
            easygoing = false,
            excitable = false,
            lively = false,
            playful = false,
            reserved = false,
            serious = false,
            skeptical = false,
            willful = false,
            artsAndCrafts = false,
            boardGames = false,
            cooking = false,
            dance = false,
            exercise = false,
            music = false,
            photography = false,
            reading = false,
            socializing = false,
            sports = false,
            videoGames = false,
            watchingShows = false,
        } = data;

        this.state = {
            slideAnimationDialogSuccess: false,
            slideAnimationDialogFailure: false,
            uploadingData: false,
            bold,
            cautious,
            creative,
            dutiful,
            easygoing,
            excitable,
            lively,
            playful,
            reserved,
            serious,
            skeptical,
            willful,
            artsAndCrafts,
            boardGames,
            cooking,
            dance,
            exercise,
            music,
            photography,
            reading,
            socializing,
            sports,
            videoGames,
            watchingShows,
            userDescription: description,


            smoking,
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
            drinking,
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
            drugs,
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

    completeUserCreation = () => {
        const {
            uri, blobs, firstName, lastName, male, female, age, ethnicity, academicMajor, religion
        } = this.props;
        const {
            bold, cautious, creative, dutiful, easygoing, excitable, lively,
            playful, reserved, serious, skeptical, willful,
            artsAndCrafts, boardGames, cooking,
            dance, exercise, music,
            photography, reading, socializing, sports,
            videoGames, watchingShows, userDescription,
            smoking, drinking, drugs
        } = this.state;

        const personalitiesData = {
            bold, cautious, creative, dutiful,
            easygoing, excitable, lively, playful,
            reserved, serious, skeptical, willful
        };
        const lifestyleData = {
            artsAndCrafts, boardGames, cooking, dance, exercise, 
            music, photography, reading, socializing, sports, 
            videoGames, watchingShows
        };
        
        // creating array of personalities
        const personality = [];
        Object.keys(personalitiesData).forEach(key => {
            if (personalitiesData[key]) {
                personality.push(key);
            }
        });

        // creating array of lifestyle
        const lifestyle = [];
        Object.keys(lifestyleData).forEach(key => {
            if (lifestyleData[key]) {
                lifestyle.push(key);
            }
        });

        const data = {
            info: {
                firstName,
                lastName,
                gender: male ? 'male' : 'female',
                age, 
                ethnicity,
                religion,
                academicMajor,
                personality,
                lifestyle,
                description: userDescription,
                smoking,
                drinking,
                drugs
            },
            images: blobs,
            id: this.props.user.id
        };

        this.setState({ uploadingData: true });
        this.props.updateUserData(data, (err) => {
            if (err) {
                this.setState({ slideAnimationDialogFailure: true });
                return;
            }
            this.setState({ slideAnimationDialogSuccess: true, uploadingData: false });
        });
    };

    render() {
        const { goBack } = this.props.navigation;

        const {
            bold, cautious, creative, dutiful,
            easygoing, excitable, lively, playful, 
            reserved, serious, skeptical, willful, artsAndCrafts,
            boardGames, cooking, dance, exercise, music, photography, reading,
            socializing, sports, videoGames, watchingShows,
            userDescription, smoking, drinking, drugs
        } = this.state;
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
                                    <ProfileFormCustomButton title='Bold' selected={bold} color='#69409E' fontSize={14} onPress={() => this.setState({ bold: !this.state.bold })} />
                                </Col>
                                <Col size={33}> 
                                    <ProfileFormCustomButton title='Cautious' selected={cautious} color='#69409E' fontSize={14} onPress={() => this.setState({ cautious: !this.state.cautious })} />
                                </Col>
                                <Col size={33}> 
                                    <ProfileFormCustomButton title='Creative' selected={creative} color='#69409E' fontSize={14} onPress={() => this.setState({ creative: !this.state.creative })} />
                                </Col>
                            </Row>
                             <Row style={{ paddingBottom: 10 }}>
                                <Col size={33}> 
                                    <ProfileFormCustomButton title='Dutiful' selected={dutiful} color='#69409E' fontSize={14} onPress={() => this.setState({ dutiful: !this.state.dutiful })} />
                                </Col>
                                <Col size={33}> 
                                    <ProfileFormCustomButton title='Easygoing' selected={easygoing} color='#69409E' fontSize={14} onPress={() => this.setState({ easygoing: !this.state.easygoing })} />
                                </Col>
                                <Col size={33}> 
                                    <ProfileFormCustomButton title='Excitable' selected={excitable} color='#69409E' fontSize={14} onPress={() => this.setState({ excitable: !this.state.excitable })} />
                                </Col>
                            </Row>
                             <Row style={{ paddingBottom: 10 }}>
                                <Col size={33}> 
                                    <ProfileFormCustomButton title='Lively' selected={lively} color='#69409E' fontSize={14} onPress={() => this.setState({ lively: !this.state.lively })} />
                                </Col>
                                <Col size={33}> 
                                    <ProfileFormCustomButton title='Playful' selected={playful} color='#69409E' fontSize={14} onPress={() => this.setState({ playful: !this.state.playful })} />
                                </Col>
                                <Col size={33}> 
                                    <ProfileFormCustomButton title='Reserved' selected={reserved} color='#69409E' fontSize={14} onPress={() => this.setState({ reserved: !this.state.reserved })} />
                                </Col>
                            </Row>
                             <Row>
                                <Col size={33}> 
                                    <ProfileFormCustomButton title='Serious' selected={serious} color='#69409E' fontSize={14} onPress={() => this.setState({ serious: !this.state.serious })} />
                                </Col>
                                <Col size={33}> 
                                    <ProfileFormCustomButton title='Skeptical' selected={skeptical} color='#69409E' fontSize={14} onPress={() => this.setState({ skeptical: !this.state.skeptical })} />
                                </Col>
                                <Col size={33}> 
                                    <ProfileFormCustomButton title='Willful' selected={willful} color='#69409E' fontSize={14} onPress={() => this.setState({ willful: !this.state.willful })} />
                                </Col>
                            </Row>

                            <Row style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 30, paddingBottom: 20 }}>
                                <Text style={{ textAlign: 'center', fontSize: 22, fontWeight: '600' }}>
                                    Your Hobbies and Lifestyle
                                </Text>
                            </Row>

                             <Row style={{ paddingBottom: 10 }}>
                                <Col size={33}> 
                                    <ProfileFormCustomButton title='Arts and Crafts' selected={artsAndCrafts} color='#2C806F' fontSize={14} onPress={() => this.setState({ artsAndCrafts: !this.state.artsAndCrafts })} />
                                </Col>
                                <Col size={33}> 
                                    <ProfileFormCustomButton title='Board Games' selected={boardGames} color='#2C806F' fontSize={14} onPress={() => this.setState({ boardGames: !this.state.boardGames })} />
                                </Col>
                                <Col size={33}> 
                                    <ProfileFormCustomButton title='Cooking' selected={cooking} color='#2C806F' fontSize={14} onPress={() => this.setState({ cooking: !this.state.cooking })} />
                                </Col>
                            </Row>
                             <Row style={{ paddingBottom: 10 }}>
                                <Col size={33}> 
                                    <ProfileFormCustomButton title='Dance' selected={dance} color='#2C806F' fontSize={14} onPress={() => this.setState({ dance: !this.state.dance })} />
                                </Col>
                                <Col size={33}> 
                                    <ProfileFormCustomButton title='Exercise' selected={exercise} color='#2C806F' fontSize={14} onPress={() => this.setState({ exercise: !this.state.exercise })} />
                                </Col>
                                <Col size={33}> 
                                    <ProfileFormCustomButton title='Music' selected={music} color='#2C806F' fontSize={14} onPress={() => this.setState({ music: !this.state.music })} />
                                </Col>
                            </Row>
                             <Row style={{ paddingBottom: 10 }}>
                                <Col size={33}> 
                                    <ProfileFormCustomButton title='Photography' selected={photography} color='#2C806F' fontSize={11} onPress={() => this.setState({ photography: !this.state.photography })} />
                                </Col>
                                <Col size={33}> 
                                    <ProfileFormCustomButton title='Reading' selected={reading} color='#2C806F' fontSize={14} onPress={() => this.setState({ reading: !this.state.reading })} />
                                </Col>
                                <Col size={33}> 
                                    <ProfileFormCustomButton title='Socializing' selected={socializing} color='#2C806F' fontSize={12} onPress={() => this.setState({ socializing: !this.state.socializing })} />
                                </Col>
                            </Row>
                             <Row style={{ paddingBottom: 15 }}>
                                <Col size={33}> 
                                    <ProfileFormCustomButton title='Sports' selected={sports} color='#2C806F' fontSize={14} onPress={() => this.setState({ sports: !this.state.sports })} />
                                </Col>
                                <Col size={33}> 
                                    <ProfileFormCustomButton title='Video Games' selected={videoGames} color='#2C806F' fontSize={14} onPress={() => this.setState({ videoGames: !this.state.videoGames })} />
                                </Col>
                                <Col size={33}> 
                                    <ProfileFormCustomButton title='Watching Shows' selected={watchingShows} color='#2C806F' fontSize={14} onPress={() => this.setState({ watchingShows: !this.state.watchingShows })} />
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
                                    value={smoking}
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
                                    value={drinking}
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
                                    value={drugs}
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
                                        value={userDescription}
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
                                        disabled={this.state.uploadingData}
                                        onPress={() => this.completeUserCreation()} Have to add all the user data to the current user
                                    >
                                        {
                                            this.state.uploadingData ? 
                                            <ActivityIndicator size='large' /> :
                                            <Text style={{ color: 'white', fontSize: 22 }} >
                                                Complete
                                            </Text>
                                        }
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

const mapStateToProps = (state, props) => {
    const { 
        uri, blobs, firstName,
        lastName, male, female,
        age, ethnicity, academicMajor, religion
    } = props.navigation.state.params;

    return {
        uri, 
        blobs, 
        firstName, 
        lastName, 
        male, 
        female, 
        age, 
        ethnicity, 
        academicMajor,
        religion,
        user: state.auth
    };
};

const UserProfileCreateForm2 = connect(mapStateToProps, { updateUserData })(UserProfileCreateForm2Comp);

export { UserProfileCreateForm2 };
