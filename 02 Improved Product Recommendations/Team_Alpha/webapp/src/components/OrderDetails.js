import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './css/cart_styles.css';
import './css/cart_responsive.css';
import { fetchOrders } from '../actions';

class Orders extends Component {

    componentDidMount() {
        if(!this.props.order)
            this.props.fetchOrders();
    }

    renderDate = (date) => {
        const strs = new Date(date).toString().split(' ')
        return `${strs[2]} ${strs[1]} ${strs[3]}`
    }

    render() {
        if(this.props.auth.authenticated) {
            const { order } = this.props;
            return (
                <div className="single_product">
                    <div className="container">
                        {this.props.order ?
                        <div className="row">
                            <div className="col-lg-3 order-lg-2 order-1">
                                <div className="image_selected" style={{height: 300}}><img src={order.item.image} alt=""/></div>
                            </div>
                            <div className="col-lg-9 order-3">
                                <div className="product_description">
                                    <div className="product_category">Order ID: {order._id}</div>
                                    <div className="product_name">{order.item.name}</div>
                                    <div style={{marginTop: 50}}>
                                        <div className="cart_item_title" style={{marginBottom: -35}}>Delivery Address</div>
                                        <div className="cart_item_text">{order.delivery_address}</div>
                                    </div>
                                    <div className="d-flex justify-content-between" style={{marginTop: 50}}>
                                        <div>
                                            <div className="cart_item_title" style={{marginBottom: -35}}>Ordered On</div>
                                            <div className="cart_item_text">{this.renderDate(order.ordered_on.$date)}</div>
                                        </div>
                                        <div>
                                            <div className="cart_item_title" style={{marginBottom: -35}}>Sold By</div>
                                            <div className="cart_item_text">{order.seller.name}</div>
                                        </div>
                                        <div>
                                            <div className="cart_item_title" style={{marginBottom: -35}}>Order Total</div>
                                            <div className="cart_item_text">&#8377; {order.item.price}</div>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between" style={{marginTop: 50}}>
                                        <div>
                                            <div className="cart_item_title" style={{marginBottom: -35}}>Shipping Service</div>
                                            <div className="cart_item_text">{order.shipping_service}</div>
                                        </div>
                                        <div>
                                            <div className="cart_item_title" style={{marginBottom: -35}}>Current Shipping Status</div>
                                            <div className="cart_item_text">Not Yet Dispatched</div>
                                        </div>
                                        <div>
                                            <div className="cart_item_title" style={{marginBottom: -35}}>Expected Delivery By</div>
                                            <div className="cart_item_text">{this.renderDate(order.expected_delivery_by.$date)}</div>
                                        </div>
                                    </div>
                                    <div className="button_container">
                                        <Link to='#'><div className="button cart_button" style={{marginRight: 50}}>Cancel Order</div></Link>
                                        <Link to='#'><div className="button cart_button">Track Order</div></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : 
                        <div>Fetching the prder for you</div>
                        }
                    </div>
                </div>
            )
        }
        else {
            return (
                <Redirect to="/login"/>
            )
        }
        
    }
}

function mapStateToProps(state, ownProps) {
    return {order: state.orders[ownProps.match.params.id], auth: state.auth};
}

export default connect(mapStateToProps, {fetchOrders})(Orders);