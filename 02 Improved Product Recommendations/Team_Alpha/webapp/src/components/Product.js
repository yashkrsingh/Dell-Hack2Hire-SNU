import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./css/product_styles.css";
import "./css/product_responsive.css";
import { fetchItems } from "../actions";
// import image from "../../public/images/banner_background.jpg"

class Product extends Component {
    componentDidMount() {
        if (!this.props.item) {
            this.props.fetchItems(this.props.location.pathname.split("/")[2]);
        }
    }

    render() {
        const { item } = this.props;
        // console.log(this.props.location.pathname.split("/")[2]);
        return (
            <div className="single_product">
                <div className="container">
                    {this.props.item ? (
                        <div className="row">
                            <div className="col-lg-5 order-lg-2 order-1">
                                <div className="image_selected">
                                    <img src={item.filename} alt="" />
                                </div>
                            </div>

                            <div className="col-lg-5 order-3">
                                <div className="product_description">
                                    <div className="product_category">
                                        Laptop
                                    </div>
                                    <div className="product_name">
                                        {item.name}
                                    </div>
                                    <div className="product_text">
                                        <p>{item.description}</p>
                                    </div>
                                    <div className="order_info d-flex flex-row">
                                        <form action="">
                                            <div
                                                className="clearfix"
                                                style={{ zIndex: 1000 }}
                                            ></div>

                                            <div className="product_price">
                                                &#8377; {item.price}
                                            </div>
                                            <div className="button_container">
                                                <Link
                                                    to={`/product/${item._id}/buy`}
                                                    className="button cart_button"
                                                >
                                                    Buy Now
                                                </Link>
                                                <div className="product_fav">
                                                    <i className="fas fa-heart"></i>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="row">
                            <div>Fetching Product for you</div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return { item: state.items[ownProps.match.params.id] };
}

export default connect(mapStateToProps,{ fetchItems })(Product);
