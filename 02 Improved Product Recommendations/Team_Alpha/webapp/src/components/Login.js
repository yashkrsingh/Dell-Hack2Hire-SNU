import React, { Component } from 'react';
import './css/product_styles.css';
import { connect } from 'react-redux';
import { loginUser } from '../actions';

class Login extends Component {
    
    state = {
        email: null,
        password: null
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.loginUser(this.state.email, this.state.password, () => {
            this.props.history.push('/');
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div style={{left: 0, right:0, margin: 'auto'}}>
                    <form onSubmit={this.handleSubmit} className="newsletter_form d-flex flex-column" style={{marginTop: 50, marginBottom: 100}}>
                        <div className="newsletter_title text-center" style={{marginBottom: 50}}>Login</div>
                        {this.props.auth.error ?
                        <div class="alert alert-danger" role="alert">
                            {this.props.auth.errorText}
                        </div>
                        :
                        null
                        }
                        <input type="email" className="newsletter_input" required="required" placeholder="Enter your email address" onChange={(e) => this.setState({email: e.target.value})}/><br/>
                        <input type="password" className="newsletter_input" required="required" placeholder="Enter your password" onChange={(e) => this.setState({password: e.target.value})}/><br/>
                        <button type="submit" className="button cart_button" >Login</button>    
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

export default connect(mapStateToProps, { loginUser })(Login);