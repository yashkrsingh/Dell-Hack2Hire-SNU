import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../actions';
import logo from '../dell_logo.png';

class NavBar extends Component {
    
    logout = () => {
        this.props.logoutUser();
    }
    
    render() {
        return (
            <header className="header">

                <div className="top_bar">
                    <div className="container">
                        <div className="row">
                            <div className="col d-flex flex-row">
                                <div className="top_bar_contact_item"><div className="top_bar_icon"><img src="images/phone.png" alt=""/></div>+91 9920960142</div>
                                <div className="top_bar_contact_item"><div className="top_bar_icon"><img src="images/mail.png" alt=""/></div><a href="mailto:rr250@snu.edu.in">Support</a></div>
                                <div className="top_bar_content ml-auto">
                                    {this.props.auth.authenticated ?
                                    <div className="top_bar_menu">
                                        <ul className="standard_dropdown top_bar_dropdown">        
                                            <li>
                                                <a href="#">{localStorage.getItem('name')}<i className="fas fa-chevron-down"></i></a>
                                                <ul>
                                                    <li><Link to="/orders">My Orders</Link></li>
                                                    <li onClick={this.logout}><Link to="/">Logout</Link></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                    :
                                    <div className="top_bar_user">
                                        <div className="user_icon"><img src="images/user.svg" alt=""/></div>
                                        <div><Link to="/register">Register</Link></div>
                                        <div><Link to="/login">Login</Link></div>
                                    </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>		
                </div>

                <div className="header_main">
                    <div className="container">
                        <div className="row">

                            <div className="col-lg-2 col-sm-3 col-3 order-1">
                                <div className="logo_container">
                                    <div className="logo"><Link to="/"><img src={logo} height={75}/></Link></div>
                                </div>
                            </div>

                            <div className="col-lg-6 col-12 order-lg-2 order-3 text-lg-left text-right">
                                <div className="header_search">
                                    <div className="header_search_content">
                                        <div className="header_search_form_container">
                                            <form action="#" className="header_search_form clearfix">
                                                <input type="search" required="required" className="header_search_input" placeholder="Search for products..."/>
                                                {/* <div className="custom_dropdown">
                                                    <div className="custom_dropdown_list">
                                                        <span className="custom_dropdown_placeholder clc">All Categories</span>
                                                        <i className="fas fa-chevron-down"></i>
                                                        <ul className="custom_list clc">
                                                            <li><a className="clc" href="#">All Categories</a></li>
                                                            <li><a className="clc" href="#">Computers</a></li>
                                                            <li><a className="clc" href="#">Laptops</a></li>
                                                            <li><a className="clc" href="#">Cameras</a></li>
                                                            <li><a className="clc" href="#">Hardware</a></li>
                                                            <li><a className="clc" href="#">Smartphones</a></li>
                                                        </ul>
                                                    </div>
                                                </div> */}
                                                <button className="header_search_button trans_300" value="Submit"><img src="images/search.png" alt=""/></button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4 col-9 order-lg-3 order-2 text-lg-left text-right">
                                <div className="wishlist_cart d-flex flex-row align-items-center justify-content-end">
                                    {/*<div className="wishlist d-flex flex-row align-items-center justify-content-end">
                                        <div className="wishlist_icon"><img src="images/heart.png" alt=""/></div>
                                        <div className="wishlist_content">
                                            <div className="wishlist_text"><a href="#">Wishlist</a></div>
                                            <div className="wishlist_count">0</div>
                                        </div>
                                    </div>*/}

                                    <div className="cart">
                                        <div className="cart_container d-flex flex-row align-items-center justify-content-end">
                                            <div className="cart_icon">
                                                <img src="images/cart.png" alt=""/>
                                                <div className="cart_count"><span>0</span></div>
                                            </div>
                                            <div className="cart_content">
                                                <div className="cart_text"><a href="#">Cart</a></div>
                                                <div className="cart_price">0</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
	

                <nav className="main_nav">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                
                                <div className="main_nav_content d-flex flex-row">

                                    <div className="cat_menu_container">
                                        <div className="cat_menu_title d-flex flex-row align-items-center justify-content-start">
                                            <div className="cat_burger"><span></span><span></span><span></span></div>
                                            <div className="cat_menu_text">Sitemap</div>
                                        </div>

                                        <ul className="cat_menu">
                                            <li><Link to="/">Home<i className="fas fa-chevron-down"></i></Link></li>
                                            <li><Link to="/shop">Shop<i className="fas fa-chevron-down"></i></Link></li>
                                            <li><a href="product.html">Product<i className="fas fa-chevron-down"></i></a></li>                                            
                                            <li><a href="cart.html">Cart<i className="fas fa-chevron-down"></i></a></li>
                                            <li><a href="contact.html">Contact<i className="fas fa-chevron-down"></i></a></li>                                            
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="page_menu">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                
                                <div className="page_menu_content">
                                    
                                    <div className="page_menu_search">
                                        <form action="#">
                                            <input type="search" required="required" className="page_menu_search_input" placeholder="Search for products..."/>
                                        </form>
                                    </div>
                                    {this.props.auth.authenticated ? 
                                    <ul className="page_menu_nav">
                                        <li className="page_menu_item">
                                            <Link to="/orders">My Orders</Link>
                                        </li>
                                        <li className="page_menu_item">
                                            <Link to="/logout">Logout</Link>
                                        </li>
                                    </ul>
                                    :
                                    <ul className="page_menu_nav">
                                        <li className="page_menu_item">
                                            <Link to="/login">Login</Link>
                                        </li>
                                        <li className="page_menu_item">
                                            <Link to="/register">Register</Link>
                                        </li>
                                    </ul>
                                    }
                                    
                                    <div className="menu_contact">
                                        <div className="menu_contact_item"><div className="menu_contact_icon"><img src="images/phone_white.png" alt=""/></div>+38 068 005 3570</div>
                                        <div className="menu_contact_item"><div className="menu_contact_icon"><img src="images/mail_white.png" alt=""/></div><a href="mailto:fastsales@gmail.com">fastsales@gmail.com</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
	        </header>
        )
    }
}

function mapStateToProps(state) {
    return { auth: state.auth };
}

export default connect(mapStateToProps, { logoutUser })(NavBar);