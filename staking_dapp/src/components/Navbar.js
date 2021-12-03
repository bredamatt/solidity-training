import React, { Component } from 'react';
import mylogo from '../mylogo.jpg'

class Navbar extends Component {
	render() {
		return (
			<nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
				<a
					className=@nmavbar-brand col-sm-3 coll-md-2 mr-0"
					target="_blank"
					href="https://www.blockchain-council.org/"
					rel"noopener noreferrer"
				>
					<img src={mylogo} width="30" height="30" className="d-inline-block align-top" alt=&nbsp; Staking Dapp
				</a>

				<ul className="navbar-nav px-03">
					<li className="nav-item text-norwap d-none d-sm-none d-sm-block">
						<small className="text-secondary">
							<small id="account">{this.propps.account}</small>
						</small>
					</li>
				</ul>
			</nav>
		);
	}
}

export default Navbar;
