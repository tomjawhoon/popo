import React, { Component } from 'react';
import { Icon, Header, Container } from 'semantic-ui-react';
import { web3Service } from '../services';
import Content from './Content';
import Information from './Information';
import Footer from './Footer';
import { contentStyle } from '../styles';
// import Tester from './Tester';
// import { mage } from 'semantic-ui-react'

export default class Layout extends Component {
    constructor (props) {
        super(props);
        this.showUserAddress = this.showUserAddress.bind(this);
    }

    state = {
        address: ''
    }

    showUserAddress (address) {
        this.setState({ address });
    }

    render () {
        return (
            <Container style={{ marginTop: '3em' }}>
                <Header as='h1' dividing >
                    Token Transfer 
                    <small style={{ fontSize: '55%' }} > (
                        <a href={`${web3Service.explorer}address/${this.state.address}`} target='_blank' rel="noopener noreferrer">
                            {this.state.address}
                        </a>)
                    </small>
                    { !web3Service.isWeb3Viewable &&
                        <small> Loading ..</small>
                    }
                    <a href='https://www.facebook.com/naratorn.tom' style={contentStyle.source} >
                       SUPPORT
                    <Icon color='black' size='large' name="rss" style={contentStyle.sorceIcon} />
                    
                    </a>
                </Header>
                <Content {...{ displayAddress: this.showUserAddress }}/>
                <Information/>
                <Footer/>
                {/* <h1><a href="#">TESTER</a></h1> */}
            </Container>
        );
    }
}