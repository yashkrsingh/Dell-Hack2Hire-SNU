import React, { Component } from 'react';
import './css/shop_styles.css';
import './css/shop_responsive.css';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { fetchAllItems } from '../actions';

class Shop extends Component {
    
    componentDidMount() {
        this.props.fetchAllItems();
    }
    
    renderItems = () => {
        return _.map(this.props.items, item => {
            return (
                <div className="col-lg-3" key={item._id}>
                    <div className="product_border"></div>
                    <div className="product_image"><img src={item.filename} alt=""/></div>
                    <div className="text-center">
                        <div className="product_price"></div>
                        <div className="product_name"><div><Link to={`/product/${item._id}`} tabindex="0">{item.name}</Link></div></div>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <div>
                <div className="home">
                    <div className="home_background parallax-window" data-parallax="scroll" data-image-src="images/shop_background.jpg"></div>
                    <div className="home_overlay"></div>
                    <div className="home_content d-flex flex-column align-items-center justify-content-center">
                        <h2 className="home_title">All Products</h2>
                    </div>
                </div>

                <div className="shop">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3">
                                <div className="shop_sidebar">
                                    <div className="sidebar_section">
                                        <div className="sidebar_title">Categories</div>
                                        <ul className="sidebar_categories">
                                            <li><a href="#">Desktops and All-in-ones</a></li>
                                            <li><a href="#">Laptops</a></li>
                                            <li><a href="#">PC & Tablet accessories</a></li>
                                            <li><a href="#">Monitors</a></li>
                                            <li><a href="#">Electronics and Accessories</a></li>
                                            <li><a href="#">Replacement Parts and Upgrades</a></li> 
                                        </ul>
                                    </div>                                    
                                </div>
                            </div>

                            <div className="col-lg-9">
                                {Object.keys(this.props.items).length===0 ?
                                <p>Fetching Products for you</p>
                                :
                                <div className="shop_content">
                                    <div className="shop_bar clearfix">
                                        <div className="shop_product_count"><span>{Object.keys(this.props.items).length}</span> products found</div>
                                        
                                    </div>

                                    <div className="row">
                                        {this.renderItems()}
                                    </div>

                                </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { items: state.items };
}

export default connect(mapStateToProps, { fetchAllItems })(Shop);