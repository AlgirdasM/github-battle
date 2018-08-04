import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PlayerPreview from './PlayerPreview';

class PlayerInput extends Component {
	state = {
		username: ''
	}

	handleChange = (event) => {
		const value = event.target.value;
		this.setState({username: value});
	}

	handleSubmit = (event) => {
		event.preventDefault();
		this.props.onSubmit(
			this.props.id,
			this.state.username
		);
	}

	render() {
		return (
			<form className='column padding' onSubmit={this.handleSubmit}>
				<label className='header' htmlFor='username'>
					{this.props.label}
				</label>

				<input id='username'
						placeholder='github username'
						type='text'
						autoComplete='off'
						value={this.state.username}
						onChange={this.handleChange}
				/>

				<button
					className='button'
					type='submit'
					disabled={!this.state.username}>
					Submit
				</button>
			</form>
		)
	}
}

PlayerInput.protTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	onSubmit: PropTypes.func.isRequired
}


class Battle extends Component {
	state = {
		playerOneName: '',
		playerTwoName: '',
		playerOneImage: null,
		playerTwoImage: null
	}

	handleSubmit = (id, username) => {
		this.setState(() => {
			let newState = {};
			newState[id + 'Name'] = username;
			newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200'
			return newState;
		});
	}

	handleReset = (id) => {
		this.setState(() => {
			let newState = {};
			newState[id + 'Name'] = '';
			newState[id + 'Image'] = null
			return newState;
		});
	}

	render() {
		const match = this.props.match;
		const playerOneName = this.state.playerOneName;
		const playerTwoName = this.state.playerTwoName;
		const playerOneImage = this.state.playerOneImage;
		const playerTwoImage = this.state.playerTwoImage;

		return (
			<div className="row">
				<div className='player'>

					{!playerOneName &&
						<PlayerInput
							id='playerOne'
							label='Player One'
							onSubmit={this.handleSubmit}
						/>
					}

					{playerOneImage !== null &&
						<PlayerPreview
							avatar={playerOneImage}
							username={playerOneName}>
								<button
									className='reset'
									onClick={() => this.handleReset('playerOne')}>
									Reset
								</button>
						</PlayerPreview>
					}
				</div>
				<div className='player'>
					{!playerTwoName &&
						<PlayerInput
							id='playerTwo'
							label='Player Two'
							onSubmit={this.handleSubmit}
						/>
					}
					
					{playerTwoImage !== null &&
						<PlayerPreview
							avatar={playerTwoImage}
							username={playerTwoName}>
								<button
									className='reset'
									onClick={() => this.handleReset('playerTwo')}>
									Reset
								</button>
						</PlayerPreview>
					}
				</div>

				{playerOneImage && playerTwoImage &&
					<Link
						className='button'
						to={{
							pathname: match.url + '/results',
							search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
						}}>
					Battle
					</Link>
				}
			</div>
		)
	}
}

export default Battle;