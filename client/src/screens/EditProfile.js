import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TextInput,
  ScrollView
} from 'react-native';
import { Container, Header, Content, Form, Item, Picker, DatePicker } from 'native-base';

export default class EditProfile extends Component {
    constructor(props) {
    super(props);
    this.state = {
      selected2: undefined,
      chosenDate: new Date()
    };
    this.setDate = this.setDate.bind(this);
  }
  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }
  onValueChange2(value: string) {
    this.setState({
      selected2: value
    });
  }

  render() {
    return (
        <ScrollView>
          <Container style={{backgroundColor: '#455a64', justifyContent: 'center'}}>
            <Content>
                <View style={{flexDirection: 'row'}}>
                <Carousel
                  ref={(c) => { this._carousel = c; }}
                  data={this.state.entries}
                  renderItem={this._renderItem}
                  sliderWidth={sliderWidth}
                  itemWidth={itemWidth}
                />
               </View>
              <Form>
                <Item picker>
                    <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                          <Picker
                            mode="dropdown"
                            style={{ width: undefined }, styles.button}
                            placeholder="Select your Gender"
                            placeholderStyle={{ color: "#fff" }}
                            placeholderIconColor="#fff"
                            selectedValue={this.state.selected2}
                            onValueChange={this.onValueChange2.bind(this)}
                          >
                            <Picker.Item label="Select your gender:" value="key0" />
                            <Picker.Item label="Female" value="key1" />
                            <Picker.Item label="Male" value="key2" />
                          </Picker>
                          <Picker
                            mode="dropdown"
                            style={{ width: undefined }, styles.button}
                            placeholder="Ethnicity"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            selectedValue={this.state.selected2}
                            onValueChange={this.onValueChange2.bind(this)}
                          >
                            <Picker.Item label="Select your ethnicity" value="key0" />
                            <Picker.Item label="Native American" value="key0" />
                            <Picker.Item label="Asian" value="key1" />
                          </Picker>
                          <Picker
                            mode="dropdown"
                            style={{ width: undefined }, styles.button}
                            placeholder="Drinking & Smoking"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            selectedValue={this.state.selected2}
                            onValueChange={this.onValueChange2.bind(this)}
                          >
                            <Picker.Item label="Casual Preferences" value="key0" />
                            <Picker.Item label="Drinking and Smoking" value="key0" />
                            <Picker.Item label="Drinking only" value="key1" />
                            <Picker.Item label="Smoking only" value="key2" />
                          </Picker>

                          <TextInput
                              style={styles.inputBox}
                              underlineColorAndroid='rgba(0,0,0,0)'
                              placeholder="Nationality"
                              placeholderTextColor="#ffffff"
                              selectionColor="#fff"
                              keyboardType="email-address"
                          />

                          <TextInput
                              style={styles.inputBox}
                              underlineColorAndroid='rgba(0,0,0,0)'
                              placeholder="School"
                              placeholderTextColor="#ffffff"
                              selectionColor="#fff"
                              keyboardType="email-address"
                          />

                          <TextInput
                              style={styles.inputBox}
                              underlineColorAndroid='rgba(0,0,0,0)'
                              placeholder="Major"
                              placeholderTextColor="#ffffff"
                              selectionColor="#fff"
                              keyboardType="email-address"
                          />

                          <DatePicker
                                defaultDate={new Date(2018, 4, 4)}
                                minimumDate={new Date(2018, 1, 1)}
                                maximumDate={new Date(2018, 12, 31)}
                                locale={"en"}
                                timeZoneOffsetInMinutes={undefined}
                                modalTransparent={false}
                                animationType={"fade"}
                                androidMode={"default"}
                                placeHolderText="Select your birthdate"
                                textStyle={{ color: "green" }}
                                placeHolderTextStyle={{ color: "#d3d3d3" }}
                                onDateChange={this.setDate}
                                />
                        <Text>
                          Date: {this.state.chosenDate.toString().substr(4, 12)}
                        </Text>
                    </View>
                </Item>
              </Form>
            </Content>
          </Container>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 18,
        color: 'rgba(255, 255, 255, 0.7)',
        paddingTop: 20
    },
    button: {
        width: 300,
        backgroundColor: 'rgba(255, 255,255,0.2)',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13
    },
    inputBox: {
        width: 300,
        backgroundColor: 'rgba(255, 255,255,0.2)',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#ffffff',
        marginVertical: 10
    }
});
export { EditProfile };
