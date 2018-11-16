import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Content, Form, Item, Input, Button, Label, View } from 'native-base';


class EditCarasoul extends Component {
  render() {
    return (
        <Container>
            <View>
                <ListItem selected>
                  <Left>
                      <Text style={{color: '#ffffff'}}>First Name</Text>
                  </Left>
                  <Right>
                      <Text style={{color: '#ffffff'}}>First Name</Text>
                  </Right>
                </ListItem>
            </View>
        </Container>
    );
}
}

export { EditCarasoul };
