import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TextInput,
  ScrollView,
  Dimensions
} from 'react-native';
import { Container, Header, Content, Form, Item, Picker, DatePicker } from 'native-base';

const {height, width} = Dimensions.get('window')

class UserProfile extends Component {


    render()
    {
        return(
                <View>
                    <Swiper>
                        <View style={styles.slide}>
                            <Text style={styles.text}> Chat </Text>
                        </View>
                        <View style={styles.slide}>
                            <Text style={styles.text}> Camera </Text>
                        </View>
                        <View style={styles.slide}>
                            <Text style={styles.text}> Messages </Text>
                        </View>
                    </Swiper>
                </View>
        );
    }
}

const styles = StyleSheet.create({
        slide: {
            backgroundColor: '#9DD6EB',
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center'
        },
        text: {
            color: 'white',
            fontSize: 30,
            fontWeight: 'bold'
        }
});

export { UserProfile };
