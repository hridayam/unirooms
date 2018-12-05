import React, { Component } from 'react';
import { Text } from 'react-native';
import { Container, Content, Header, Left, Body, Right, Button } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Dialog, { DialogContent, ScaleAnimation } from 'react-native-popup-dialog';
import { connect } from 'react-redux';

import { ProfileDetailsComponent } from '../common';
import { logoutUser } from '../actions';

class UserProfileDetailsComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scaleAnimationDialog: false,
        };
    }

    render() {
        const {
            images = [
                'https://www.robotbutt.com/wp-content/uploads/2015/08/College-Student-Thumbs-Up-e1440734712137.jpg',
                'https://st.depositphotos.com/2931363/5142/i/950/depositphotos_51425941-stock-photo-student-reading-book-against-the.jpg'
            ],
            firstName = 'John',
            lastName = 'Doe',
            age = '22',
            gender = '',
            ethnicity = 'White/Caucasian',
            religion = 'Christian',
            academicMajor = 'Computer Engineering',
            personality = [],
            lifestyle = [],
            description = 'No description added..',
            smoking = 'Didn\'t Say',
            drinking = 'Didn\'t Say',
            drugs = 'Didn\'t Say'
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
                            backgroundColor: '#0055A2', 
                            borderColor: 'white', 
                            borderWidth: 1, 
                            //borderRadius: 25, for circle
                            borderRadius: 10,
                            alignItems: 'center',
                            justifyContent: 'center'
                            }}
                            onPress={() => this.setState({ scaleAnimationDialog: true })}
                        >
                            <MaterialCommunityIcons name="settings" size={40} color='#E5A823' />
                        </Button>
                    </Right>
                </Header>

                <Content style={{ marginTop: -75, zIndex: -1 }}>
                    <ProfileDetailsComponent
                        matcher={false}
                        uri={images}
                        firstName={firstName}
                        lastName={lastName}
                        age={age}
                        female={gender === 'female' ? true : false}
                        male={gender === 'male' ? true : false}
                        ethnicity={ethnicity}
                        religion={religion}
                        academicMajor={academicMajor}
                        bold={bold}
                        cautious={cautious}
                        creative={creative}
                        dutiful={dutiful}
                        easygoing={easygoing}
                        excitable={excitable}
                        lively={lively}
                        playful={playful}
                        reserved={reserved}
                        serious={serious}
                        skeptical={skeptical}
                        willful={willful}
                        artsAndCrafts={artsAndCrafts}
                        boardGames={boardGames}
                        cooking={cooking}
                        dance={dance}
                        exercise={exercise}
                        music={music}
                        photography={photography}
                        reading={reading}
                        socializing={socializing}
                        sports={sports}
                        videoGames={videoGames}
                        watchingShows={watchingShows}
                        userDescription={description}
                        smoking={smoking}
                        drinking={drinking}
                        drugs={drugs}
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
                            onPress={() => {
                                this.setState({ scaleAnimationDialog: false });
                                this.props.navigation.navigate('ProfileEdit1');
                            }}
                        >
                            <Text style={{ fontFamily: 'titleFont', fontSize: 18 }}>
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
                            onPress={async () => {
                                this.setState({ scaleAnimationDialog: false });
                                await new Promise(resolve => setTimeout(resolve, 100));
                                this.props.logoutUser();
                            }}
                        >
                            <Text style={{ fontFamily: 'titleFont', fontSize: 18, color: '#cc0000' }}>
                                Log Out
                            </Text>
                        </Button>
                    </DialogContent>
                </Dialog>
            </Container>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    return {
        user: auth
    };
};

const UserProfileDetails = connect(mapStateToProps, { logoutUser })(UserProfileDetailsComp);

export { UserProfileDetails };
