import React, { Component } from 'react';
import { Battle } from '../utils/api';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PlayerPreview from './PlayerPreview';
import Loading from './Loading';

function Profile(props) {
	const info = props.info;
  
	return (
		<PlayerPreview avatar={info.avatar_url} username={info.login}>
	      <ul className='space-list-items'>
	        {info.name &&
	        	<li>
	        		{info.name}
	        	</li>}
	        {info.location &&
	        	<li>
	        		{info.location}
	        	</li>}
	        {info.company &&
	        	<li>
	        		{info.company}
	        	</li>}
	        <li>
	        	Followers: {info.followers}
	        </li>
	        <li>
	        	Following: {info.following}
	        </li>
	        <li>
	        	Public Repos: {info.public_repos}
	        </li>
	        {info.blog &&
	        	<li>
	        		<a href={info.blog}>{info.blog}</a>
	        	</li>}
	      </ul>			
		</PlayerPreview>
	)
}

function Player (props) {
	return (
		<div className="player">
			<h1 className='header'>
				{props.label}
			</h1>
			<h3 style={{textAlign: 'center'}}>
				Score: {props.score}
			</h3>
			<Profile info={props.profile} />
		</div>
	)
}

Player.propTypes = {
	label: PropTypes.string.isRequired,
	score: PropTypes.number.isRequired,
	profile: PropTypes.object.isRequired
}

class Results extends Component {
	state = {
		winner: null,
		loser: null,
		error: null,
		loading: true
	}

	componentDidMount() {
		// regex to get players object
		const regex = /[?&]([^=#]+)=([^&#]*)/g;
        const url = this.props.location.search;
        const players = {};
        let match;

        while((match = regex.exec(url)) !== null) {
		    players[match[1]] = match[2];
		}

		Battle([
			players.playerOneName,
			players.playerTwoName
		]).then((results) => {
			if(results === null) {
				this.setState(() => {
					return {
						error: 'Looks like there was error. Check that both users exist on Github',
						loading: false
					}
				});
			} else {
				this.setState(() => {
					return {
						error: null,
						winner: results[0],
						loser: results[1],
						loading: false
					}
				});
			}
		});
	}

	render() {
		const error = this.state.error;
		const winner = this.state.winner;
		const loser = this.state.loser;
		const loading = this.state.loading;

		if(loading === true) {
			return <Loading />
		}

		if(error) {
			return (
				<div>
					<p>{error}</p>
					<Link to='/battle'>Reset</Link>
				</div>
			)
		}

		return (
			<div className='row'>
				<Player
					label='Winner'
					score={winner.score}
					profile={winner.profile}
				/>
				<Player
					label='Loser'
					score={loser.score}
					profile={loser.profile}
				/>				
			</div>
		);
	}
}

export default Results;