import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  ListView,
  Dimensions,
  TouchableOpacity
} from 'react-native';
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;
export default class Messages extends Component {
    render() {
        return (
          <View style={{flex:1}}>
  <TouchableOpacity onPress={()=>this.onBack('home')} style={{width:deviceWidth,justifyContent:'center',height:40,backgroundColor:'rgb(60, 67, 240)'}}>
    <Text style={{fontSize:18,color:'white'}} >
      Back
    </Text>
  </TouchableOpacity>
    <Text>
    Chat with: {this.state.data.data.username}
    </Text>
    <ListView
    style={{flex:1}}
      dataSource={this.state.dataSource}
      renderRow={this._renderRow.bind(this)}
      enableEmptySections={true}
    />
    <View style={{
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      borderTopWidth:0.5,
      borderTopColor:'rgba(0,0,0,0.5)',
      position: 'absolute',
      bottom:0,
      left:0,

    }}>
      <TextInput style={{
        flex:1,
        margin:5,
        paddingTop:0,
        paddingBottom:0,
      }}  placeholder="Chat..."
      onChangeText={(val)=>this.setState({message:val})}
      ref={'content'}/>
      <Text onPress={()=>this.onSend()}>
      SEND
      </Text>
    </View>

  </View>
        );
    }
}

export { Messages };
