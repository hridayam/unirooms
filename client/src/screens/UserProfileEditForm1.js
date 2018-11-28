import React, { Component } from 'react';
import { Text, Image, StyleSheet, YellowBox, ImageBackground, TouchableOpacity, View, Dimensions } from 'react-native';
import { Container, Content, Header, Left, Body, Right, Icon, Title, Button, Form, Item, Input, Label } from 'native-base';
import { ImagePicker, Permissions } from 'expo';
import { Entypo, FontAwesome, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import 'firebase/firestore';
import Dialog, { DialogTitle, DialogContent, SlideAnimation } from 'react-native-popup-dialog';
import { Col, Row, Grid } from 'react-native-easy-grid';
import RNPickerSelect from 'react-native-picker-select';
import { connect } from 'react-redux';

import { ImageSelector } from '../common';

class UserProfileEditForm1Comp extends Component {
    constructor(props) {
        super(props);
        const { 
            images = [], 
            firstName = '', 
            lastName = '', age = '', 
            gender = '', 
            ethnicity = null, 
            academicMajor = null,
            religion = null
        } = this.props.user;
        this.state = {
            slideAnimationDialogFailure: false,
            uri: images,
            blobs: [],
            firstName,
            lastName,
            age,
            female: gender === 'female' ? true : false,
            male: gender === 'male' ? true : false,
            ethnicity,
            ethnicityItems: [
                {
                    label: 'Asian',
                    value: 'Asian',
                },
                {
                    label: 'Arab',
                    value: 'Arab',
                },
                {
                    label: 'Black/African-descent',
                    value: 'Black/African-descent',
                },
                {
                    label: 'Hispanic/Latino',
                    value: 'Hispanic/Latino',
                },
                {
                    label: 'Native American',
                    value: 'Native American',
                },
                {
                    label: 'Pacific Islander',
                    value: 'Pacific Islander',
                },
                {
                    label: 'South Asian',
                    value: 'South Asian',
                },
                {
                    label: 'White/Caucasian',
                    value: 'White/Caucasian',
                },
                {
                    label: 'Other',
                    value: 'Other',
                },
            ],
            religion,
            religionItems: [
                {
                    label: 'Buddhist',
                    value: 'Buddhist',
                },
                {
                    label: 'Christian',
                    value: 'Christian',
                },
                {
                    label: 'Catholic',
                    value: 'Catholic',
                },
                {
                    label: 'Hindu',
                    value: 'Hindu',
                },
                {
                    label: 'Jewish',
                    value: 'Jewish',
                },
                {
                    label: 'Muslim',
                    value: 'Muslim',
                },
                {
                    label: 'Sikh',
                    value: 'Sikh',
                },
                {
                    label: 'Shinto',
                    value: 'Shinto',
                },
                {
                    label: 'Spiritual but not religious',
                    value: 'Spiritual but not religious',
                },
                {
                    label: 'Neither religious nor spiritual',
                    value: 'Neither religious nor spiritual',
                },
                {
                    label: 'Other',
                    value: 'Other',
                },
            ],
            academicMajor,
            academicMajorItems: [
                {
                    label: 'Aerospace Engineering',
                    value: 'Aerospace Engineering',
                },
                {
                    label: 'African American Studies',
                    value: 'African American Studies',
                },
                {
                    label: 'American Studies',
                    value: 'American Studies',
                },
                {
                    label: 'Anthropology',
                    value: 'Anthropology',
                },
                {
                    label: 'Art and Art History',
                    value: 'Art and Art History',
                },
                {
                    label: 'Aviation',
                    value: 'Aviation',
                },
                {
                    label: 'Behavioral Sciences',
                    value: 'Behavioral Sciences',
                },
                {
                    label: 'Biological Sciences',
                    value: 'Biological Sciences',
                },
                {
                    label: 'Biomedical Engineering',
                    value: 'Biomedical Engineering',
                },
                {
                    label: 'Business',
                    value: 'Business',
                },
                {
                    label: 'Chemical and Materials Engineering',
                    value: 'Chemical and Materials Engineering',
                },
                {
                    label: 'Chicana and Chicano Studies',
                    value: 'Chicana and Chicano Studies',
                },
                {
                    label: 'Child and Adolescent Development',
                    value: 'Child and Adolescent Development',
                },
                {
                    label: 'Civil and Environmental Engineering',
                    value: 'Civil and Environmental Engineering',
                },
                {
                    label: 'Communication Studies',
                    value: 'Communication Studies',
                },
                {
                    label: 'Computer Engineering',
                    value: 'Computer Engineering',
                },
                {
                    label: 'Computer Science',
                    value: 'Computer Science',
                },
                {
                    label: 'Creative Arts',
                    value: 'Creative Arts',
                },
                {
                    label: 'Dance',
                    value: 'Dance',
                },
                {
                    label: 'Design',
                    value: 'Design',
                },
                {
                    label: 'Economics',
                    value: 'Economics',
                },
                {
                    label: 'Education',
                    value: 'Education',
                },
                {
                    label: 'Electrical Engineering',
                    value: 'Electrical Engineering',
                },
                {
                    label: 'English and Comparative Literature',
                    value: 'English and Comparative Literature',
                },
                {
                    label: 'Environmental Studies',
                    value: 'Environmental Studies',
                },
                {
                    label: 'Film and Theatre',
                    value: 'Film and Theatre',
                },
                {
                    label: 'General Engineering',
                    value: 'General Engineering',
                },
                {
                    label: 'Geography',
                    value: 'Geography',
                },
                {
                    label: 'Geology',
                    value: 'Geology',
                },
                {
                    label: 'Global Studies',
                    value: 'Global Studies',
                },
                {
                    label: 'Health Science and Recreation',
                    value: 'Health Science and Recreation',
                },
                {
                    label: 'Hospitality, Tourism and Event Management',
                    value: 'Hospitality, Tourism and Event Management',
                },
                {
                    label: 'Industrial and Systems Engineering',
                    value: 'Industrial and Systems Engineering',
                },
                {
                    label: 'Interdisciplinary Studies',
                    value: 'Interdisciplinary Studies',
                },
                {
                    label: 'Jewish Studies',
                    value: 'Jewish Studies',
                },
                {
                    label: 'Journalism and Mass Communications',
                    value: 'Journalism and Mass Communications',
                },
                {
                    label: 'Justice Studies',
                    value: 'Justice Studies',
                },
                {
                    label: 'Kinesiology',
                    value: 'Kinesiology',
                },
                {
                    label: 'Linguistics and Language Development',
                    value: 'Linguistics and Language Development',
                },
                {
                    label: 'Mathematics and Statistics',
                    value: 'Mathematics and Statistics',
                },
                {
                    label: 'Mechanical Engineering',
                    value: 'Mechanical Engineering',
                },
                {
                    label: 'Medical Product Development Management',
                    value: 'Medical Product Development Management',
                },
                {
                    label: 'Meteorology and Climate Science',
                    value: 'Meteorology and Climate Science',
                },
                {
                    label: 'Middle East Studies',
                    value: 'Middle East Studies',
                },
                {
                    label: 'Marine Science',
                    value: 'Marine Science',
                },
                {
                    label: 'Music and Dance',
                    value: 'Music and Dance',
                },
                {
                    label: 'Nursing',
                    value: 'Nursing',
                },
                {
                    label: 'Nutrition, Food Science, and Packaging',
                    value: 'Nutrition, Food Science, and Packaging',
                },
                {
                    label: 'Occupational Therapy',
                    value: 'Occupational Therapy',
                },
                {
                    label: 'Philosophy',
                    value: 'Philosophy',
                },
                {
                    label: 'Physics and Astronomy',
                    value: 'Physics and Astronomy',
                },
                {
                    label: 'Political Science',
                    value: 'Political Science',
                },
                {
                    label: 'Psychology',
                    value: 'Psychology',
                },
                {
                    label: 'Recreation',
                    value: 'Recreation',
                },
                {
                    label: 'Social Work',
                    value: 'Social Work',
                },
                {
                    label: 'Science Education',
                    value: 'Science Education',
                },
                {
                    label: 'Sociology and Interdisciplinary Social Sciences',
                    value: 'Sociology and Interdisciplinary Social Sciences',
                },
                {
                    label: 'Technology',
                    value: 'Technology',
                },
                {
                    label: 'Undergraduate Studies',
                    value: 'Undergraduate Studies',
                },
                {
                    label: 'Women, Gender and Sexuality Studies',
                    value: 'Women, Gender and Sexuality Studies',
                },
                {
                    label: 'World Languages and Literatures',
                    value: 'World Languages and Literatures',
                },
            ],

        };
    }

    onRemove = (key) => {
        const { uri, blobs } = this.state;
        console.log(key, uri.length);
        if (key > uri.length) {
            return;
        }
        blobs.splice(key, 1);
        uri.splice(key, 1);
        this.setState({ uri, blobs });
    }

    setImage = (uri, base64) => {
        const newArray = this.state.uri.concat(uri);
        const newBlobArray = this.state.blobs.concat(base64);
        this.setState({ 
            uri: newArray,
            blobs: newBlobArray
        });
    }

    goToUserProfileEdit2() {
        console.log(this.state.religion);
        this.props.navigation.navigate('ProfileEdit2', { 
            uri: this.state.uri,
            blobs: this.state.blobs,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            male: this.state.male,
            female: this.state.female,
            age: this.state.age,
            ethnicity: this.state.ethnicity,
            academicMajor: this.state.academicMajor,
            religion: this.state.religion
        });
    }

    renderImageSelectors = () => {
        const rows = [];
        const { uri } = this.state;

        for (let i = 0; i < 6; i++) {
            rows.push(
                <ImageSelector 
                    key={i} id={i}
                    uri={uri[i] ? uri[i] : null} 
                    setImage={this.setImage} 
                    onRemove={this.onRemove}
                />
            );
        }
        return (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {rows}
            </View>
        );
    }

    render() {
        const { goBack } = this.props.navigation;
        const { firstName, lastName, age, ethnicity, religion, academicMajor } = this.state;

        if (!this.props.user) {
            return (
                <Text>Loading</Text>
            );
        }
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
                        <Title>Edit Profile</Title>
                    </Body>
                    <Right style={{ flex: 1 }} />
                </Header>
                
                <Content>
                    <Form>
                        <Grid style={{ width: '100%' }}>
                            <Row style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 20 }}>
                              <Text style={{ textAlign: 'center', fontSize: 22, fontWeight: '600' }}>
                                  Profile Images
                              </Text>
                            </Row>
                            <Row>
                                {this.renderImageSelectors()}
                            </Row>

                            <Row style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 20 }}>
                              <Text style={{ textAlign: 'center', fontSize: 22, fontWeight: '600' }}>
                                  General Information
                              </Text>
                            </Row>
                            <Row style={{ paddingBottom: 15 }}>
                                <Col size={10} />
                                <Col size={80} style={styles.colIcon}>
                                    <Item rounded>
                                        <Text>     </Text>
                                        <MaterialCommunityIcons name="account" size={30} />
                                        <Input
                                            placeholder='First Name'
                                            value={firstName}
                                            blurOnSubmit
                                            returnKeyType='done'
                                            autoCapitalize='words'
                                            onChangeText={(text) => this.setState({ firstName: text })}
                                        />
                                     </Item>
                                </Col>
                                <Col size={10} />
                            </Row>
                            <Row style={{ paddingBottom: 15 }}>
                                <Col size={10} />
                                <Col size={80} style={styles.colIcon}>
                                    <Item rounded>
                                        <Text>     </Text>
                                        <MaterialCommunityIcons name="account" size={30} />
                                        <Input
                                            placeholder='Last Name'
                                            value={lastName}
                                            blurOnSubmit
                                            returnKeyType='done'
                                            autoCapitalize='words'
                                            onChangeText={(text) => this.setState({ lastName: text })}
                                        />
                                     </Item>
                                </Col>
                                <Col size={10} />
                            </Row>
                            <Row style={{ paddingBottom: 15 }}>
                                <Col size={10} />
                                <Col size={35} style={styles.colIcon}>  
                                    {this.state.male === false || this.state.female === true ? 
                                        <Button bordered dark style={styles.genderButton} onPress={() => this.setState({ male: true, female: false })}>
                                            <Foundation name="male" size={50} />
                                        </Button>
                                        :
                                        <Button bordered dark style={[styles.genderButton, styles.maleColor]} onPress={() => this.setState({ male: false })}>
                                            <Foundation name="male" size={50} color="white" />
                                        </Button>
                                    }
                                </Col>
                                <Col size={13} />
                                <Col size={35} style={styles.colIcon}>
                                    {this.state.female === false || this.state.male === true ? 
                                        <Button bordered dark style={styles.genderButton} onPress={() => this.setState({ female: true, male: false })}>
                                            <Foundation name="female" size={50} />
                                        </Button>
                                        :
                                        <Button bordered dark style={[styles.genderButton, styles.femaleColor]} onPress={() => this.setState({ female: false })}>
                                            <Foundation name="female" size={50} color="white" />
                                        </Button>
                                    }
                                </Col>
                                <Col size={7} />
                            </Row>

                            <Row style={{ paddingBottom: 12 }}>
                                <Col size={10} />
                                <Col size={28} >
                                    <Item rounded>
                                        <Text>   </Text>
                                        <MaterialCommunityIcons name="cake-variant" size={30} />
                                        <Input 
                                            placeholder='Age'
                                            value={age}
                                            keyboardType='numeric'
                                            blurOnSubmit
                                            returnKeyType='done'
                                            textAlign='center'
                                            maxLength={2}
                                            marginRight={15}
                                            onChangeText={(text) => this.setState({ age: text })}
                                        />
                                    </Item>
                                </Col>
                                <Col size={3} />
                                <Col size={10} style={styles.colIcon}>
                                    <Entypo name="globe" size={30} />
                                </Col>
                                <Col size={2} />
                                <Col size={37} >
                                  <RNPickerSelect
                                    placeholder={{
                                      label: 'Ethnicity',
                                      value: null,
                                    }}
                                    value={ethnicity}
                                    style={{ ...pickerSelectStyles }}
                                    items={this.state.ethnicityItems}
                                    onValueChange={(value) => {
                                      this.setState({
                                          ethnicity: value,
                                      });
                                    }}
                                  />
                                </Col>
                                <Col size={10} />
                            </Row>

                            <Row style={{ paddingBottom: 12 }}>
                                <Col size={10} />
                                <Col size={15} style={styles.colIcon}>
                                   <MaterialCommunityIcons name="church" size={30} />
                                </Col>
                                <Col size={2} />
                                <Col size={63} >
                                  <RNPickerSelect
                                    placeholder={{
                                      label: 'Religion',
                                      value: null,
                                    }}
                                    value={religion}
                                    style={{ ...pickerSelectStyles }}
                                    items={this.state.religionItems}
                                    onValueChange={(value) => {
                                      this.setState({
                                          religion: value,
                                      });
                                    }}
                                  />
                                </Col>
                                <Col size={10} />
                            </Row>

                            <Row>
                                <Col size={10} />
                                <Col size={15} style={styles.colIcon}>
                                   <MaterialIcons name="school" size={30} />
                                </Col>
                                <Col size={2} />
                                <Col size={63} >
                                  <RNPickerSelect
                                    placeholder={{
                                      label: 'Academic Major',
                                      value: null,
                                    }}
                                    value={academicMajor}
                                    style={{ ...pickerSelectStyles }}
                                    items={this.state.academicMajorItems}
                                    onValueChange={(value) => {
                                      this.setState({
                                          academicMajor: value,
                                      });
                                    }}
                                  />
                                </Col>
                                <Col size={10} />
                            </Row>

                            <Dialog
                                onDismiss={() => {
                                  this.setState({ slideAnimationDialogFailure: false });
                                }}  
                                onTouchOutside={() => {
                                  this.setState({ slideAnimationDialogFailure: false });
                                }}
                                visible={this.state.slideAnimationDialogFailure}
                                dialogTitle={<DialogTitle title="       Please fill in all forms!
                                At least one image is required." />}
                                dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
                            >
                                <DialogContent style={{ justifyContent: 'center', alignItems: 'center', marginTop: 25 }}>
                                  <MaterialCommunityIcons name="alert-circle-outline" style={{ color: '#cc0000' }} size={75} />
                                </DialogContent>
                            </Dialog>
                            <Row style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 30 }}>
                                <Col size={100} style={{ paddingHorizontal: 20 }}>
                                    {this.state.uri.length === 0 ||
                                     this.state.firstName === '' ||
                                     this.state.lastName === '' ||
                                     ((this.state.male === false) && (this.state.female === false)) ||
                                     this.state.age === '' ||
                                     this.state.ethnicity === null ||
                                     this.state.religion === null ||
                                     this.state.academicMajor === null ?
                                        <Button 
                                            block
                                            style={{ flexDirection: 'row' }}
                                            onPress={() => this.setState({ slideAnimationDialogFailure: true })}
                                        >
                                            <Text style={{ color: 'white', fontSize: 22, paddingRight: 5 }}>
                                                Continue
                                            </Text>
                                            <MaterialCommunityIcons name="arrow-right-bold-circle-outline" size={30} color="white" />
                                        </Button>
                                        :
                                        <Button 
                                            block
                                            style={{ flexDirection: 'row' }}
                                            onPress={() => this.goToUserProfileEdit2()}
                                        >
                                            <Text style={{ color: 'white', fontSize: 22, paddingRight: 5 }}>
                                                Continue
                                            </Text>
                                            <MaterialCommunityIcons name="arrow-right-bold-circle-outline" size={30} color="white" />
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
        fontSize: 14,
        paddingVertical: 15,
        backgroundColor: 'white',
        color: 'black',
        borderBottomColor: '#dfdfdf',
        borderBottomWidth: 1,
        textAlign: 'center'
    },
});

const mapStateToProps = ({ auth }) => {
    return {
        user: auth
    };
};

const UserProfileEditForm1 = connect(mapStateToProps)(UserProfileEditForm1Comp);

export { UserProfileEditForm1 };
