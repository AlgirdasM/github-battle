import React, { Component } from 'react';
import MainImage from './../img/frida-bredesen-317281-unsplash.jpg';
import { Link } from 'react-router-dom';

class Home extends Component {
	render() {
		return (
			<div className='home-container'>
				<h1>Github Battle: Battle your friends... and stuff.</h1>
				<img className="mainImage shadow" src={MainImage} alt="by Frida Bredesen on Unsplash" />
				<Link className='button' to='/battle'>
					Battle
				</Link>
			</div>
		)
	}
}

export default Home;