import React, { Component } from 'react';
import { Container, Content, Header, Left, Body, Right, Icon, Title, Button } from 'native-base';

class ListingDetails extends Component {
    render() {
        const { goBack } = this.props.navigation;

        return (
            <Container style={{ flex: 1 }}>
				<Header>
                    <Left style={{ flex: 1 }}>
						<Button 
                            transparent
                            onPress={() => goBack()}
                        >
							<Icon name="md-arrow-round-back" type="Ionicons" />
						</Button>
                    </Left>
                    <Body style={{ flex: 1, alignItems: 'center' }}>
                        <Title>Details</Title>
                    </Body>
                    <Right style={{ flex: 1 }} />
                </Header>

            </Container>
        );
    }
}

export { ListingDetails };
