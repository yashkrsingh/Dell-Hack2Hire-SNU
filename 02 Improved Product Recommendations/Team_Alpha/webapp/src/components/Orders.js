import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './css/cart_styles.css';
import './css/cart_responsive.css';
import { fetchOrders } from '../actions';
import _ from 'lodash';

class Orders extends Component {

    state = {
        limit: 365,
    }

    componentDidMount() {
        this.props.fetchOrders();
    }

    renderDate = (date) => {
        const strs = new Date(date).toString().split(' ')
        return `${strs[2]} ${strs[1]} ${strs[3]}`
    }

    renderDeliveryDays = (date) => {
        const dt1 = new Date();
        const dt2 = new Date(date);
        const delta =  Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
        return delta;
    }

    renderOrders = (limit) => {
        return _.map(this.props.orders, order => {
            const days = this.renderDeliveryDays(order.expected_delivery_by.$date);
            if(days<=limit) {
                return (
                    <div className="cart_items" key={order._id}>
                        <ul className="cart_list">
                            <li className="cart_item clearfix">
                                <div className="cart_item_image"><img src={order.item.image} alt=""/></div>
                                <div className="cart_item_info d-flex flex-md-row flex-column justify-content-between">
                                    <div className="cart_item_name cart_info_col">
                                        <div className="cart_item_title">Name</div>
                                        <div className="cart_item_text"><Link to={`/orders/${order._id}`}>{order.item.name}</Link></div>
                                    </div>
                                    <div className="cart_item_price cart_info_col">
                                        <div className="cart_item_title">Ordered On</div>
                                        <div className="cart_item_text">{this.renderDate(order.ordered_on.$date)}</div>
                                    </div>
                                    <div className="cart_item_total cart_info_col">
                                        <div className="cart_item_title">Price</div>
                                        <div className="cart_item_text">{order.item.price}</div>
                                    </div>
                                    <div className="cart_item_color cart_info_col">
                                        <div className="cart_item_title">Delivery Status</div>
                                        <div className="cart_item_text">{days === 0 ? 'Arriving today' : `Delivery in ${days} days`}</div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                )
            }
            return (
                <div></div>
            )
        })
    }

    handleChange = (e) => {
        if(e.target.value)
            this.setState({limit: e.target.value});
        else
            this.setState({limit: 365})

    }

    render() {
        if(this.props.auth.authenticated) {
            return (
                <div className="cart_section">
                    <div className="container">
                        {this.props.orders ?
                        <div className="row">
                            <div className="col-lg-10 offset-lg-1">
                                <div className="cart_container">
                                    <div className="d-flex justify-content-between">
                                        <div className="cart_title">My Orders</div>
                                        <div><input type="email" className="newsletter_input" placeholder="Filter by delivery days" onChange={this.handleChange}/></div>
                                    </div>
                                    {this.renderOrders(this.state.limit)}
                                </div>
                            </div>
                        </div>
                        :
                        <div>Fetching your orders</div>
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

function mapStateToProps(state) {
    return {orders: state.orders, auth: state.auth};
}

export default connect(mapStateToProps, { fetchOrders })(Orders);