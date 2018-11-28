import React, { Component } from 'react';
import { Text, Image, StyleSheet, View, TouchableOpacity, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { Container, Content, Header, Left, Body, Right, Icon, Title, Button, Form, Item, Input, Label, Textarea, CardItem } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Entypo, FontAwesome, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Slick from 'react-native-slick';
import { Badge } from 'react-native-elements';

const { width, height } = Dimensions.get('window');

const renderPagination = (index, total, context) => {
  return (
    <View
        style={{
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          bottom: 25,
          left: 0,
          right: 0
        }}
    >
      <View
          style={{
            borderRadius: 7,
            backgroundColor: 'rgba(255,255,255,.15)',
            padding: 3,
            paddingHorizontal: 7
          }}
      >
        <Text style={{ color: '#fff', fontSize: 20 }}>
            {index + 1} / {total}
        </Text>
      </View>
    </View>
  );
};

class ProfileDetailsComponent extends Component {
    render() {
        const {
            uri,
            firstName,
            lastName,
            age,
            female,
            male,
            ethnicity,
            religion,
            academicMajor,
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
            userDescription,
            smoking,
            drinking,
            drugs
        } = this.props;

        return (
            <View>
                <Slick
                    style={styles.wrapper}
                    height={400}
                    dotColor='black'
                    dotStyle={{ width: 10, height: 10, borderRadius: 5, marginLeft: 4, marginRight: 4, marginTop: 3, marginBottom: 3 }}
                    activeDotColor='white'
                    activeDotStyle={{ width: 10, height: 10, borderRadius: 5, marginLeft: 4, marginRight: 4, marginTop: 3, marginBottom: 3 }}
                    showButtons={true}
                    loop={false}
                >
                    {
                      uri.map((item, index) => {
                        return (
                            <View style={slickStyles.slide} key={index} >
                                <Image style={slickStyles.photo} source={{ uri: item }} />
                            </View>
                        );
                      })
                    }
                </Slick>

                 <CardItem bordered>
                    <Body>
                        <Grid style={{ width: '100%' }}>
                            <Row style={{ paddingBottom: 10 }}>
                                <Text style={{ fontFamily: 'titleFont', fontSize: 28, textAlign: 'left' }}> 
                                    <Text style={{ fontFamily: 'titleFont', fontSize: 36, textAlign: 'left' }}>
                                        {firstName}{' '}{lastName}{'  '}
                                    </Text>
                                    {age}
                                </Text>
                            </Row>
                            <Row style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 5 }}>
                                <Col size={10}>
                                    <MaterialIcons name="school" size={25} />
                                </Col>
                                <Col size={90}>             
                                    <Text style={{ fontFamily: 'bodyFont', fontSize: 16, justifyContent: 'center', alignItems: 'center', textAlign: 'left', width: '100%' }}>
                                        {academicMajor}
                                    </Text>
                                </Col>
                            </Row>
                            <Row style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 5 }}>
                                <Col size={10}>
                                    <Ionicons name="md-globe" size={26} style={{ paddingLeft: 2 }} />
                                </Col>
                                <Col size={90}>             
                                    <Text style={{ fontFamily: 'bodyFont', fontSize: 16, justifyContent: 'center', alignItems: 'center', textAlign: 'left', width: '100%' }}>
                                        {ethnicity}
                                    </Text>
                                </Col>
                            </Row>
                            <Row style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 5 }}>
                                <Col size={10}>
                                    <MaterialCommunityIcons name="church" size={25} />
                                </Col>
                                <Col size={90}>             
                                    <Text style={{ fontFamily: 'bodyFont', fontSize: 16, justifyContent: 'center', alignItems: 'center', textAlign: 'left', width: '100%' }}>
                                        {religion}
                                    </Text>
                                </Col>
                            </Row>
                        </Grid>
                    </Body>
                </CardItem>

                <CardItem bordered>
                    <Body>
                        <Grid style={{ width: '100%' }}>
                            <Row style={styles.badgeContainer}>
                                {bold === true ?
                                    <Badge
                                        containerStyle={styles.personalityBadgeStyle}
                                        wrapperStyle={styles.badgeWrapperStyle}
                                    >
                                        <Text style={styles.badgeTextStyle}>Bold</Text>
                                    </Badge>
                                    : null
                                }
                                {cautious === true ?
                                    <Badge
                                        containerStyle={styles.personalityBadgeStyle}
                                        wrapperStyle={styles.badgeWrapperStyle}
                                    >
                                        <Text style={styles.badgeTextStyle}>Cautious</Text>
                                    </Badge>
                                    : null
                                }
                                {creative === true ?
                                    <Badge
                                        containerStyle={styles.personalityBadgeStyle}
                                        wrapperStyle={styles.badgeWrapperStyle}
                                    >
                                        <Text style={styles.badgeTextStyle}>Creative</Text>
                                    </Badge>
                                    : null
                                }
                                {dutiful === true ?
                                    <Badge
                                        containerStyle={styles.personalityBadgeStyle}
                                        wrapperStyle={styles.badgeWrapperStyle}
                                    >
                                        <Text style={styles.badgeTextStyle}>Dutiful</Text>
                                    </Badge>
                                    : null
                                }
                                {easygoing === true ?
                                    <Badge
                                        containerStyle={styles.personalityBadgeStyle}
                                        wrapperStyle={styles.badgeWrapperStyle}
                                    >
                                        <Text style={styles.badgeTextStyle}>Easygoing</Text>
                                    </Badge>
                                    : null
                                }
                                {excitable === true ?
                                    <Badge
                                        containerStyle={styles.personalityBadgeStyle}
                                        wrapperStyle={styles.badgeWrapperStyle}
                                    >
                                        <Text style={styles.badgeTextStyle}>Excitable</Text>
                                    </Badge>
                                    : null
                                }
                                {lively === true ?
                                    <Badge
                                        containerStyle={styles.personalityBadgeStyle}
                                        wrapperStyle={styles.badgeWrapperStyle}
                                    >
                                        <Text style={styles.badgeTextStyle}>Lively</Text>
                                    </Badge>
                                    : null
                                }
                                {playful === true ?
                                    <Badge
                                        containerStyle={styles.personalityBadgeStyle}
                                        wrapperStyle={styles.badgeWrapperStyle}
                                    >
                                        <Text style={styles.badgeTextStyle}>Playful</Text>
                                    </Badge>
                                    : null
                                }
                                {reserved === true ?
                                    <Badge
                                        containerStyle={styles.personalityBadgeStyle}
                                        wrapperStyle={styles.badgeWrapperStyle}
                                    >
                                        <Text style={styles.badgeTextStyle}>Reserved</Text>
                                    </Badge>
                                    : null
                                }
                                {serious === true ?
                                    <Badge
                                        containerStyle={styles.personalityBadgeStyle}
                                        wrapperStyle={styles.badgeWrapperStyle}
                                    >
                                        <Text style={styles.badgeTextStyle}>Serious</Text>
                                    </Badge>
                                    : null
                                }
                                {skeptical === true ?
                                    <Badge
                                        containerStyle={styles.personalityBadgeStyle}
                                        wrapperStyle={styles.badgeWrapperStyle}
                                    >
                                        <Text style={styles.badgeTextStyle}>skeptical</Text>
                                    </Badge>
                                    : null
                                }
                                {willful === true ?
                                    <Badge
                                        containerStyle={styles.personalityBadgeStyle}
                                        wrapperStyle={styles.badgeWrapperStyle}
                                    >
                                        <Text style={styles.badgeTextStyle}>Willful</Text>
                                    </Badge>
                                    : null
                                }
                                {artsAndCrafts === true ?
                                    <Badge
                                        containerStyle={styles.hobbiesBadgeStyle}
                                        wrapperStyle={styles.badgeWrapperStyle}
                                    >
                                        <Text style={styles.badgeTextStyle}>Arts and Crafts</Text>
                                    </Badge>
                                    : null
                                }
                                {boardGames === true ?
                                    <Badge
                                        containerStyle={styles.hobbiesBadgeStyle}
                                        wrapperStyle={styles.badgeWrapperStyle}
                                    >
                                        <Text style={styles.badgeTextStyle}>Board Games</Text>
                                    </Badge>
                                    : null
                                }
                                {cooking === true ?
                                    <Badge
                                        containerStyle={styles.hobbiesBadgeStyle}
                                        wrapperStyle={styles.badgeWrapperStyle}
                                    >
                                        <Text style={styles.badgeTextStyle}>Cooking</Text>
                                    </Badge>
                                    : null
                                }
                                {dance === true ?
                                    <Badge
                                        containerStyle={styles.hobbiesBadgeStyle}
                                        wrapperStyle={styles.badgeWrapperStyle}
                                    >
                                        <Text style={styles.badgeTextStyle}>Dance</Text>
                                    </Badge>
                                    : null
                                }
                                {exercise === true ?
                                    <Badge
                                        containerStyle={styles.hobbiesBadgeStyle}
                                        wrapperStyle={styles.badgeWrapperStyle}
                                    >
                                        <Text style={styles.badgeTextStyle}>Exercise</Text>
                                    </Badge>
                                    : null
                                }
                                {music === true ?
                                    <Badge
                                        containerStyle={styles.hobbiesBadgeStyle}
                                        wrapperStyle={styles.badgeWrapperStyle}
                                    >
                                        <Text style={styles.badgeTextStyle}>Music</Text>
                                    </Badge>
                                    : null
                                }
                                {photography === true ?
                                    <Badge
                                        containerStyle={styles.hobbiesBadgeStyle}
                                        wrapperStyle={styles.badgeWrapperStyle}
                                    >
                                        <Text style={styles.badgeTextStyle}>Photography</Text>
                                    </Badge>
                                    : null
                                }
                                {reading === true ?
                                    <Badge
                                        containerStyle={styles.hobbiesBadgeStyle}
                                        wrapperStyle={styles.badgeWrapperStyle}
                                    >
                                        <Text style={styles.badgeTextStyle}>Reading</Text>
                                    </Badge>
                                    : null
                                }
                                {socializing === true ?
                                    <Badge
                                        containerStyle={styles.hobbiesBadgeStyle}
                                        wrapperStyle={styles.badgeWrapperStyle}
                                    >
                                        <Text style={styles.badgeTextStyle}>Socializing</Text>
                                    </Badge>
                                    : null
                                }
                                {sports === true ?
                                    <Badge
                                        containerStyle={styles.hobbiesBadgeStyle}
                                        wrapperStyle={styles.badgeWrapperStyle}
                                    >
                                        <Text style={styles.badgeTextStyle}>Sports</Text>
                                    </Badge>
                                    : null
                                }
                                {videoGames === true ?
                                    <Badge
                                        containerStyle={styles.hobbiesBadgeStyle}
                                        wrapperStyle={styles.badgeWrapperStyle}
                                    >
                                        <Text style={styles.badgeTextStyle}>Video Games</Text>
                                    </Badge>
                                    : null
                                }
                                {watchingShows === true ?
                                    <Badge
                                        containerStyle={styles.hobbiesBadgeStyle}
                                        wrapperStyle={styles.badgeWrapperStyle}
                                    >
                                        <Text style={styles.badgeTextStyle}>Watching Shows</Text>
                                    </Badge>
                                    : null
                                }
                            </Row>
                            <Row style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 5 }}>
                                <Col size={2.5} />
                                <Col size={10}>
                                    <MaterialCommunityIcons name="smoking" size={25} />
                                </Col>
                                <Col size={21}>             
                                    <Text style={{ fontFamily: 'bodyFont', fontSize: 15, justifyContent: 'center', alignItems: 'center', textAlign: 'left', width: '100%' }}>
                                        {smoking}
                                    </Text>
                                </Col>
                                <Col size={3.5} />
                                <Col size={10}>
                                    <Entypo name="drink" size={25} />
                                </Col>
                                <Col size={20}>             
                                    <Text style={{ fontFamily: 'bodyFont', fontSize: 15, justifyContent: 'center', alignItems: 'center', textAlign: 'left', width: '100%' }}>
                                        {drinking}
                                    </Text>
                                </Col>
                                <Col size={1.5} />
                                <Col size={10}>
                                    <MaterialCommunityIcons name="cannabis" size={25} />
                                </Col>
                                <Col size={21}>             
                                    <Text style={{ fontFamily: 'bodyFont', fontSize: 15, justifyContent: 'center', alignItems: 'center', textAlign: 'left', width: '100%' }}>
                                        {drugs}
                                    </Text>
                                </Col>
                                <Col size={0.5} />
                            </Row>
                        </Grid>
                    </Body>
                </CardItem>

                <CardItem>
                    <Body>
                        <Text style={{ fontFamily: 'bodyFont', textAlign: 'justify', fontSize: 20, paddingTop: 5, paddingBottom: 10, fontWeight: '400' }}>
                            {userDescription}
                        </Text>
                    </Body>
                </CardItem>


            </View>
        );
    }
}


const styles = StyleSheet.create({
    colIcon: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    badgeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        paddingVertical: 5
    },
    personalityBadgeStyle: {
        backgroundColor: '#4FC1E9',
    },
    hobbiesBadgeStyle: {
        backgroundColor: '#A0D468',
    },
    badgeTextStyle: {
        color: 'white',
        fontFamily: 'titleFont',
        fontSize: 14
    },
    badgeWrapperStyle: {
        paddingBottom: 10,
        paddingHorizontal: 2
    },
});

const slickStyles = StyleSheet.create({
  wrapper: {
    color: 'red'
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  photo: {
    width,
    height,
    flex: 1
  }
});

export { ProfileDetailsComponent };
