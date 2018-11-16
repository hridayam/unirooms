import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Image,
  TextInput,
  ScrollView,
  Dimensions
} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Accordion, Picker, Icon, H1, H2, H3, Text, Card, CardItem, Body, Button } from 'native-base';


class EditProfile extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//          selected2: undefined,
//         };
//       }
//       onValueChange2(value: string) {
//         this.setState({
// //          selected2: value
//         });
//       }

// constructor(props) {
// super(props);
// this.state = { text: '', height: 0 };
// }

    render() {
        return (
              <Container style={{ marginTop: 20, backgroundColor: '#ffb101' }}>
                   <Content>
                     <Form>
                           <Item stackedLabel last>
                             <Label style={{ color: '#ffffff' }}>First Name</Label>
                             <Input />
                           </Item>
                           <Item stackedLabel last>
                             <Label style={{ color: '#ffffff' }}>Last Name</Label>
                             <Input />
                           </Item>
                           <Item stackedLabel last>
                             <Label style={{ color: '#ffffff' }}>Username</Label>
                             <Input />
                           </Item>
                           <Item stackedLabel last>
                             <Label style={{ color: '#ffffff' }}>Email</Label>
                             <Input />
                           </Item>
                       </Form>

                       <Card>
                         <CardItem header style={{backgroundColor: '#ffb101'}}>
                           <Text>About me</Text>
                         </CardItem>
                         <CardItem style={{backgroundColor: '#ffb101'}}>
                           <Body>
                           <Text>
                           <TextInput
                                   {...this.props}
                                   multiline
                                   style={styles.textBox}
                           />
                           </Text>
                           </Body>
                        </CardItem>
                      </Card>
                      
                   </Content>
                 </Container>
        );
    }
}

const styles = StyleSheet.create({
    textBox: {
        height: 100,
        width: 50,
        marginTop: 5,
        backgroundColor: '#ffffff'
    }
})

export { EditProfile };
