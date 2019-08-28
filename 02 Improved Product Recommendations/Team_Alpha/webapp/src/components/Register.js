import React, { Component } from 'react';
import './css/product_styles.css';
import { connect } from 'react-redux';
import { registerUser } from '../actions';

class Register extends Component {

    state = {
        name: null,
        email: null,
        password: null
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if(this.state.password.length > 7)
            this.props.registerUser(this.state.name, this.state.email, this.state.password, () => {
                this.props.history.push('/');
            });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="" style={{left: 0, right:0, margin: 'auto'}}>
                    <form onSubmit={this.handleSubmit} className="newsletter_form d-flex flex-column" style={{marginTop: 50, marginBottom: 100}}>
                        <div className="newsletter_title text-center" style={{marginBottom: 50}}>Register</div>
                        {this.props.auth.error ?
                        <div className="alert alert-danger" role="alert">
                            {this.props.auth.errorText}
                        </div>
                        :
                        null
                        }
                        <input type="text" className="newsletter_input" required="required" placeholder="Enter your name" onChange={(e) => this.setState({name: e.target.value})}/><br/>
                        <input type="email" className="newsletter_input" required="required" placeholder="Enter your email address" onChange={(e) => this.setState({email: e.target.value})}/><br/>
                        <input type="password" className="newsletter_input" required="required" placeholder="Set a password" onChange={(e) => this.setState({password: e.target.value})}/><br/>
                        <button type="submit" className="button cart_button" >Register</button>    
                    </form>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {auth: state.auth};
}

export default connect(mapStateToProps, { registerUser })(Register);