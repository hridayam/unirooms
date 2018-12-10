import React, { Component } from 'react';
import { KeyboardAvoidingView, TextInput, Animated, Keyboard,
    TouchableWithoutFeedback, View, Text, StyleSheet 
} from 'react-native';
import { Button, Container, Header, Left, Body, Content, Right, Title, Card, CardItem, Thumbnail } from 'native-base';
import { connect } from 'react-redux';

import { verifyUser } from '../actions';

const empty_character = ' ';

let ui_size = function(points) {
    //simple sizing function (it project it handles complex screen adaptation)
    return points * 2;
};

class Verification extends Component {

    static defaultProps = {
        maxChars: 4,
        inputProps: {},
    };

    constructor(props) {
        super(props);
        this.firstNum = React.createRef();
        this.secondNum = React.createRef();
        this.thirdNum = React.createRef();
        this.fourthNum = React.createRef();

        this.state = {
            pin: '',
            selection: undefined,  // cursor position
            isFocused: false,
            blinkAnim: new Animated.Value(1),
            isLastCharUpdated: false, // track if last character was updated
        };
    }

    onPressCell = (event, id) => {
        const { pin } = this.state;
        // by pressing on unfilled cell, set cursor next to last filled cell
        if (id > pin.length) {
            id = pin.length;
        }
        // set cursor position
        this.setState({
            selection: id,
        });
        this.input.focus();
    }

    cycleBlinkAnimation = () => {
        Animated.sequence([
            Animated.timing(this.state.blinkAnim, {
                toValue: 0,
                duration: 1000
            }),
            Animated.timing(this.state.blinkAnim, {
                toValue: 1,
                duration: 50
            }),
            Animated.timing(this.state.blinkAnim, {
                toValue: 1,
                duration: 300
            })
        ]).start((event) => {
            if (event.finished && this.state.isFocused) {
                this.cycleBlinkAnimation();
            }
        });
    }

    onFocus = (event) => {
        console.log('onFocus');
        let { selection } = this.state;
        // update cursor position only if it wasn't setted up
        if (selection === undefined) {
            selection = 0;
        }

        this.setState({
            selection,
            isFocused: true,
        });
    }

    onBlur = (event) => {
        console.log('onBlur');
        this.setState({
            selection: undefined,
            isFocused: false,
            isLastCharUpdated: false,
        });
    }

    componentWillMount() {
        this.keyboardDidHideListener = 
            Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    }

    componentDidMount() {
        this.cycleBlinkAnimation();
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.state.isFocused && !nextState.isFocused) {
            this.state.blinkAnim.stopAnimation();
        }
        //restart animation on focus or when cursor moved
        if ((this.state.selection !== nextState.selection || 
            !this.state.isFocused) && nextState.isFocused) {
            this.state.blinkAnim.stopAnimation(() => {
                this.state.blinkAnim.setValue(1);
                this.cycleBlinkAnimation();
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.isFocused
            && this.state.pin.length === this.props.maxChars  // input is full
            && this.state.selection + 1 === this.props.maxChars // cursor is in last cell
            // && prevState.pin[3] !== this.state.pin[3]) { // last cell was changed
            && this.state.isLastCharUpdated) {
            console.log('blur componentDidUpdate');
            this.input.blur();
            // dirty hack, on ios sync call onPinEntered prevents blur
            setTimeout(this.onPinEntered, 1); 
        }
    }

    componentWillUnmount() {
        this.keyboardDidHideListener.remove();
    }

    keyboardDidHide = () => {
        /*see reason in top
        to prevent unfocussing in IOS simulator with connected hardware, 
        keyboard uncomment the following line
        or disconnect hardware keyboard by unchecking 
        simulator > Hardware > Keyboard > Connect Hardware Keyboard*/
        //if (Platform.OS === 'ios') return;
        if (this.state.isFocused) {
            this.input.blur();
        }
    }

    onChangeText = (text) => {
        let { pin, selection } = this.state;
        text = text.replace(empty_character, ''); //remove first occurrence of empty_character
        let str_replaceAt = function (string, index, replacement) {
            return string.substr(0, index) + replacement + string.substr(index + 1);
        };
        let isLastCharUpdated = false;
        if (text.length === 0) { //backspace
            pin = str_replaceAt(pin, selection, '');
            selection -= 1;
            selection = Math.max(selection, 0);
        } else { //character entered
            pin = str_replaceAt(pin, selection, text);
            selection += 1;
            if (selection >= this.props.maxChars) {
                isLastCharUpdated = true;
            }
            selection = Math.min(selection, this.props.maxChars - 1);
        }
        this.setState({ pin, selection, isLastCharUpdated });
    }

    onPinEntered = () => {
        if (typeof this.props.onPinEntered === 'function') {
            this.props.onPinEntered(this.state.pin);
        }

        if (this.state.pin.length === this.props.maxChars) {
            verifyUser(parseInt(this.state.pin), (verified) => {
                if (verified) {
                    this.props.navigation.navigate('MainNavigator');
                }
            });
        }
    }

    render_cell(id, value, is_active) {
        const style = (is_active) ? [styles.cell, styles.active_cell] : styles.cell
        const animation_style =
            [styles.cursor, {
                opacity: this.state.blinkAnim,         // Bind opacity to animated value
            }];
        return (
            <TouchableWithoutFeedback key={id} onPress={(event) => this.onPressCell(event, id)}>
                <View>
                    <Text style={style}>{value}</Text>
                    { is_active && <Animated.View style={animation_style} />}
                </View>
            </TouchableWithoutFeedback>
        );
    }
    
    render() {
        let inputs = []
        let {pin, selection} = this.state

        //render cells
        for (let i = 0; i < this.props.maxChars; i++) {
            inputs.push(this.render_cell(i, pin[i], (selection === i)))
        }

        // place cursor after empty_character
        let input_selection = undefined
        // as described in top: Some times during reloads, selection is setting before defaultValue ...
        if (this.input !== undefined && this.state.isFocused) {
            // so set selection after first character (empty_character) only when input is focused
            input_selection = { start: 1, end: 1 };
        }

        let root_style = [this.props.style || {}, styles.root];

        return (
            <Container style={{ flex: 1 }}>
                <Header style={{ height: 75, backgroundColor: '#0055A2' }}>
                    <Body style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontFamily: 'headerFont', fontSize: 26, color: '#E5A823' }}>Enter Verification Code</Text>
                    </Body>
                </Header>
                <KeyboardAvoidingView style={root_style} behavior="padding" enabled>
                    <TextInput
                        autofocus
                        style={styles.actual_input}
                        ref={(input) => { this.input = input; }}
                        maxLength={2}
                        selection={input_selection}
                        keyboardType='numeric'
                        onChangeText={this.onChangeText}
                        autoComplete={false}
                        autoCorrect={false}
                        defaultValue={empty_character}
                        value={empty_character}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                        onSubmitEditing={this.onPinEntered}
                        {...this.props.inputProps}
                    />
                    <View style={styles.cells_wrapper}>
                        {inputs}
                    </View>
                </KeyboardAvoidingView>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        paddingTop: 200,
    },
    actual_input: {
        position: 'absolute',
        overflow: 'hidden',
        height: 1,
        width: 1,
        display: 'none',
    },
    cells_wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    cell: {
        height: ui_size(24.8),
        width: ui_size(19.2),
        textAlign: 'center',
        elevation: 10,
        fontSize: ui_size(18),
        lineHeight: ui_size(24),
        backgroundColor: 'white',
        color: 'black',
        fontWeight: 'bold',
        paddingHorizontal: ui_size(3),
        margin: ui_size(6.7) / 2,
        borderRadius: ui_size(2.5),
        borderBottomColor: 'transparent',
        zIndex: 1,
        overflow: 'hidden', // crop corners in IOS
    },
    active_cell: {
        color: 'rgba(0,0,0,0.4)',
    },
    cursor: {
        position: 'absolute',
        height: 1,
        width: '50%',
        left: '25%',
        bottom: 12,
        borderBottomColor: 'rgba(0,0,0,0.5)',
        borderBottomWidth: 1,
        zIndex: 2,
        elevation: 10,
    }
});

//const Verification = connect(null, { verifyUser })(comp);

export { Verification };
