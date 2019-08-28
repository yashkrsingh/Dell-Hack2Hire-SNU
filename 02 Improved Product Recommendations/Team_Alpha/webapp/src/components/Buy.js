import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './css/cart_styles.css';
import './css/cart_responsive.css';
import { Link } from 'react-router-dom';
import { fetchItems, orderItem } from '../actions';

class Buy extends Component {
    
    state = {
        name: null,
        address: null,
        pincode: null
    }

    componentDidMount() {
        if(!this.props.item) {
            // console.log(this.props.location.pathname.split("/")[2]);
            this.props.fetchItems(this.props.location.pathname.split("/")[2]);
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const addr = `${this.state.name}, ${this.state.address} - ${this.state.pincode}`
        console.log(this.props.item._id);
        this.props.orderItem(addr, this.state.pincode, this.props.item._id, (orderId) => this.props.history.push(`/orders/${orderId}`));
    }

    render() {
        const { item } = this.props;
        if(!this.props.auth.authenticated) {
            return (
                <Redirect to="/login"/>
            )
        }
        return (
            <div className="cart_section">
                <div className="container">
                    {this.props.item ?
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <div className="cart_container">
                                <div className="cart_title">Shopping Cart</div>
                                <div className="cart_items">
                                    <ul className="cart_list">
                                        <li className="cart_item clearfix">
                                            <div className="cart_item_image"><img src={item.filename} alt=""/></div>
                                            <div className="cart_item_info d-flex flex-md-row flex-column justify-content-between">
                                                <div className="cart_item_name cart_info_col">
                                                    <div className="cart_item_title">Name</div>
                                                    <div className="cart_item_text">{item.name}</div>
                                                </div>
                                                <div className="cart_item_price cart_info_col">
                                                    <div className="cart_item_title">Price</div>
                                                    <div className="cart_item_text">{item.price}</div>
                                                </div>
                                                <div className="cart_item_total cart_info_col">
                                                    <div className="cart_item_title">Total</div>
                                                    <div className="cart_item_text">{item.price}</div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            
                                <div className="order_total">
                                    <div className="order_total_content text-md-right">
                                        <div className="order_total_title">Order Total:</div>
                                        <div className="order_total_amount">{item.price}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{left: 0, right:0, margin: 'auto'}}>
                            <form onSubmit={this.handleSubmit} className="newsletter_form d-flex flex-column" style={{marginTop: 50, marginBottom: 100}}>
                                <div className="newsletter_title text-center" style={{marginBottom: 50}}>Enter Delivery Address</div>
                                <input type="text" className="newsletter_input" required="required" placeholder="Name" onChange={(e) => this.setState({name: e.target.value})}/><br/>
                                <input type="text" className="newsletter_input" required="required" placeholder="Delivery Address" onChange={(e) => this.setState({address: e.target.value})}/><br/>
                                <input type="number" className="newsletter_input" required="required" placeholder="Pincode" onChange={(e) => this.setState({pincode: e.target.value})}/><br/>
                                <div className="cart_buttons">
                                    <button type="submit" className="button cart_button_checkout">Place Order and Pay</button>
                                </div>
                            </form>
                        </div>
                        <div style={{left: 0, right:0, margin: 'auto', align: 'left'}}>
                            <form className="newsletter_form d-flex flex-column" style={{marginTop: 50, marginBottom: 100}}>
                                <div className="newsletter_title text-center" style={{marginBottom: 50}}>Not Buying Product?</div>
                                <input type="text" className="newsletter_input"/><br/>
                                <div className="cart_buttons">
                                    <button type="submit" className="button cart_button_checkout"><Link to="/">Submit Feedback</Link></button>
                                </div>
                            </form>
                        </div>
                    </div>
                    :
                    <div>Fetching the product for you</div>
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {item: state.items[ownProps.match.params.id], auth: state.auth};
}

export default connect(mapStateToProps, { fetchItems, orderItem })(Buy);