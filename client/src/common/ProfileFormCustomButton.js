import React, { Component } from 'react';
import { Button } from 'react-native-elements';

class ProfileFormCustomButton extends Component {
  constructor() {
    super();

    this.state = {
      selected: false
    };
  }

  componentDidMount() {
    const { selected } = this.props;

    this.setState({
      selected
    });
  }

  render() {
    const { title, color, fontSize } = this.props;
    const { selected } = this.state;

    return (
      <Button
        title={title}
        textStyle={selected === false ? { fontSize: this.props.fontSize, color: 'black', textAlign: 'center' } : { fontSize: this.props.fontSize, color: 'white', textAlign: 'center' }}
        buttonStyle={selected === false ? { backgroundColor: 'white', borderWidth: 1, borderColor: 'black', borderRadius: 30, flex: 1 } : { borderWidth: 1, borderColor: 'black', borderRadius: 30, flex: 1, backgroundColor: this.props.color }}
        containerStyle={{ marginRight: 10 }}
        onPress={() => {
          this.setState({ selected: !selected });
          this.props.onPress();
        }}
      />
    );
  }
}

export { ProfileFormCustomButton };
