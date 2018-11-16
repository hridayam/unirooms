import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, H1, View, Button } from 'native-base';
// import { Container, Header, Content, List, ListItem, Text, Icon, Left, Body, Right, Switch, Accordion, View, DeckSwiper, Card, CardItem, Thumbnail, H1, H2, H3 } from 'native-base';
import Carasoul from './Carasoul';

// const dataArray = [
//   { title: "About Me", content: "Stuff" },
// ];

class Profile extends Component {

  render() {
    return (
        <Container>
        <Carasoul />
        <Header style={{ flexDirection: 'column', backgroundColor: '#ffb101'}}>
        <H1>Name</H1>
        <Text>Organisation</Text>
        </Header>
        <Content style={{backgroundColor: '#ffb101'}}>
          <Card>
            <CardItem header style={{backgroundColor: '#ffb101'}}>
              <Text>About me</Text>
            </CardItem>
            <CardItem style={{backgroundColor: '#ffb101'}}>
              <Body>
                <Text>
                  //Text here
                </Text>
              </Body>
            </CardItem>
         </Card>
         <View style={{flexDirection: 'row'}}>
             <Button iconRight transparent dark>
                 <Text>Area of Study</Text>
               </Button>
               <Button iconLeft transparent dark>
                 <Text>Age</Text>
               </Button>
               <Button iconRight transparent dark>
                <Text>Gender</Text>
              </Button>
              <Button iconLeft transparent dark>
                <Text>Religion</Text>
              </Button>
          </View>
          <View style={{flexDirection: 'row'}}>
              <Button iconRight transparent dark>
                  <Text>Diet</Text>
                </Button>
                <Button iconLeft transparent dark>
                  <Text>Drinking</Text>
                </Button>
                <Button iconLeft transparent dark>
                  <Text>Smoking</Text>
                </Button>
                <Button iconRight transparent dark>
                 <Text>Pets</Text>
               </Button>
           </View>
        </Content>
      </Container>

      // <Container style={{backgroundColor: '#455a64'}}>
      //     <Carasoul />
      //     <Content>
      //         <Accordion dataArray={dataArray} expanded={0}/>
      //         <ListItem selected>
      //           <Left>
      //               <Text style={{color: '#ffffff'}}>First Name</Text>
      //           </Left>
      //           <Right>
      //               <Text style={{color: '#ffffff'}}>First Name</Text>
      //           </Right>
      //         </ListItem>
      //         <ListItem selected>
      //           <Left>
      //               <Text style={{color: '#ffffff'}}>Last Name</Text>
      //           </Left>
      //           <Right>
      //               <Text style={{color: '#ffffff'}}>First Name</Text>
      //           </Right>
      //         </ListItem>
      //         <ListItem selected>
      //           <Left>
      //               <Text style={{color: '#ffffff'}}>Gender</Text>
      //           </Left>
      //           <Right>
      //               <Text style={{color: '#ffffff'}}>First Name</Text>
      //           </Right>
      //         </ListItem>
      //         <ListItem selected>
      //           <Left>
      //               <Text style={{color: '#ffffff'}}>Religion</Text>
      //           </Left>
      //           <Right>
      //               <Text style={{color: '#ffffff'}}>First Name</Text>
      //           </Right>
      //         </ListItem>
      //         <ListItem selected>
      //           <Left>
      //               <Text style={{color: '#ffffff'}}>Diet Preference</Text>
      //           </Left>
      //           <Right>
      //               <Text style={{color: '#ffffff'}}>First Name</Text>
      //           </Right>
      //         </ListItem>
      //         <ListItem selected>
      //           <Left>
      //               <Text style={{color: '#ffffff'}}>Alcohol</Text>
      //           </Left>
      //           <Right>
      //               <Text style={{color: '#ffffff'}}>First Name</Text>
      //           </Right>
      //         </ListItem>
      //         <ListItem selected>
      //           <Left>
      //               <Text style={{color: '#ffffff'}}>420 Friendly</Text>
      //           </Left>
      //           <Right>
      //               <Text style={{color: '#ffffff'}}>First Name</Text>
      //           </Right>
      //         </ListItem>
      //         <ListItem selected>
      //           <Left>
      //               <Text style={{color: '#ffffff'}}>Date Of Birth</Text>
      //           </Left>
      //           <Right>
      //               <Text style={{color: '#ffffff'}}>First Name</Text>
      //           </Right>
      //         </ListItem>
      //         <ListItem selected>
      //           <Left>
      //               <Text style={{color: '#ffffff'}}>Email</Text>
      //           </Left>
      //           <Right>
      //               <Text style={{color: '#ffffff'}}>First Name</Text>
      //           </Right>
      //         </ListItem>
      //         <ListItem selected>
      //           <Left>
      //               <Text style={{color: '#ffffff'}}>Pets</Text>
      //           </Left>
      //           <Right>
      //               <Text style={{color: '#ffffff'}}>First Name</Text>
      //           </Right>
      //         </ListItem>
      //   </Content>
      // </Container>
    );
  }
}

export { Profile };
