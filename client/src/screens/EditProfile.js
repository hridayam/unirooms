import React, { Component } from 'react';
import {
    Text,
    View,
    Dimensions
} from 'react-native';
import { Header } from 'react-native-elements';

import { ImageSelector } from '../common';

const { width } = Dimensions.get('window');

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected2: undefined
        };
    }

    render() {
        return (
            <View>
                <Header
                    backgroundColor="#fff"
                    leftComponent={<Text style={{ fontWeight: '400', fontSize: 25 }}>Edit Profile</Text>}
                    rightComponent={{ icon: 'x', type: 'feather', size: 25 }}
                />
                <View style={{ flexDirection: 'row' }}>
                    <ImageSelector />
                    <ImageSelector />
                    <ImageSelector />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <ImageSelector />
                    <ImageSelector />
                    <ImageSelector />
                </View>
                
            </View>
            
        );
    }
}

export { EditProfile };

/* <Container>
<Content>
    <Form>
    <Item stackedLabel>
        <Label>First Name</Label>
        <Input />
    </Item>
    <Item stackedLabel>
        <Label>Last Name</Label>
        <Input />
    </Item>
    <Item stackedLabel>
        <Label>Username</Label>
        <Input />
    </Item>
    <Item stackedLabel>
        <Label>Email</Label>
        <Input />
    </Item>
    </Form>
    <View>
    <Item picker>
        <Picker
        mode="dropdown"
        iosIcon={<Icon name="ios-arrow-down-outline" />}
        style={{ width: undefined }}
        placeholder="Select your Gender"
        placeholderStyle={{ color: "#bfc6ea" }}
        placeholderIconColor="#007aff"
        selectedValue={this.state.selected2}
        onValueChange={this.onValueChange2.bind(this)}
        >
        <Picker.Item label="Male" value="key0" />
        <Picker.Item label="Female" value="key1" />
        </Picker>
    </Item>
    </View>
    <View>
    <Item picker>
        <Picker
        mode="dropdown"
        iosIcon={<Icon name="ios-arrow-down-outline" />}
        style={{ width: undefined }}
        placeholder="Diet Preference: "
        placeholderStyle={{ color: "#bfc6ea" }}
        placeholderIconColor="#007aff"
        selectedValue={this.state.selected2}
        onValueChange={this.onValueChange2.bind(this)}
        >
        <Picker.Item label="Vegetarian" value="key0" />
        <Picker.Item label="Non Vegetarian" value="key1" />
        <Picker.Item label="Vegan" value="key2" />
        <Picker.Item label="Others" value="key3" />
        </Picker>
</Item>
</View>
<View>
<Item picker>
    <Picker
    mode="dropdown"
    iosIcon={<Icon name="ios-arrow-down-outline" />}
    style={{ width: undefined }}
    placeholder="Smoking Prerferance: "
    placeholderStyle={{ color: "#bfc6ea" }}
    placeholderIconColor="#007aff"
    selectedValue={this.state.selected2}
    onValueChange={this.onValueChange2.bind(this)}
    >
    <Picker.Item label="Yes" value="key0" />
    <Picker.Item label="No" value="key1" />
    </Picker>
</Item>
</View>
<View>
<Item picker>
    <Picker
    mode="dropdown"
    iosIcon={<Icon name="ios-arrow-down-outline" />}
    style={{ width: undefined }}
    placeholder="Alcohol Prerferance: "
    placeholderStyle={{ color: "#bfc6ea" }}
    placeholderIconColor="#007aff"
    selectedValue={this.state.selected2}
    onValueChange={this.onValueChange2.bind(this)}
    >
    <Picker.Item label="Social" value="key0" />
    <Picker.Item label="Never" value="key1" />
    <Picker.Item label="Frequently" value="key2" />
    </Picker>
</Item>
</View>
<View>
<Item picker>
    <Picker
    mode="dropdown"
    iosIcon={<Icon name="ios-arrow-down-outline" />}
    style={{ width: undefined }}
    placeholder="420 friendly: "
    placeholderStyle={{ color: "#bfc6ea" }}
    placeholderIconColor="#007aff"
    selectedValue={this.state.selected2}
    onValueChange={this.onValueChange2.bind(this)}
    >
    <Picker.Item label="Yes" value="key0" />
    <Picker.Item label="No" value="key1" />
</Picker>
</Item>
</View>
<View>
<Item picker>
    <Picker
    mode="dropdown"
    iosIcon={<Icon name="ios-arrow-down-outline" />}
    style={{ width: undefined }}
    placeholder="Pets"
    placeholderStyle={{ color: "#bfc6ea" }}
    placeholderIconColor="#007aff"
    selectedValue={this.state.selected2}
    onValueChange={this.onValueChange2.bind(this)}
    >
    <Picker.Item label="Dog" value="key0" />
    <Picker.Item label="Cat" value="key1" />
    <Picker.Item label="None, but open to it" value="key2" />
    <Picker.Item label="No pets allowed" value="key3" />
    <Picker.Item label="Other pets" value="key4" />
    </Picker>
</Item>
</View>
<View>
    <Item picker>
        <Picker
        mode="dropdown"
        iosIcon={<Icon name="ios-arrow-down-outline" />}
        style={{ width: undefined }}
        placeholder="Religion"
        placeholderStyle={{ color: "#bfc6ea" }}
        placeholderIconColor="#007aff"
        selectedValue={this.state.selected2}
        onValueChange={this.onValueChange2.bind(this)}
        >
        <Picker.Item label="Atheist" value="key0" />
        <Picker.Item label="Buddhist" value="key1" />
        <Picker.Item label="Christian" value="key2" />
        <Picker.Item label="Hindu" value="key3" />
        <Picker.Item label="Jewish" value="key4" />
        <Picker.Item label="Muslim" value="key5" />
        <Picker.Item label="Spiritual" value="key6" />
        <Picker.Item label="Others" value="key7" />
        </Picker>
    </Item>
    </View>
</Content>
</Container> */
