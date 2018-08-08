import React, { Component } from 'react';
import { Battle } from '../utils/api';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PlayerPreview from './PlayerPreview';
import Loading from './Loading';

function Profile({ info }) { 
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

function Player ({ label, score, profile }) {
	return (
		<div className="player">
			<h1 className='header'>
				{label}
			</h1>
			<h3 style={{textAlign: 'center'}}>
				Score: {score}
			</h3>
			<Profile info={profile} />
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

	async componentDidMount() {

		const { playerOneName, playerTwoName } = this.parseString();

		const players = await Battle([
			playerOneName,
			playerTwoName			
		])

		if(players === null) {
			return this.setState(() => ({
				error: 'Looks like there was error. Check that both users exist on Github',
				loading: false
			}));
		}

		const [winner, loser] = players;
		this.setState(() => ({
			error: null,
			winner,
			loser,
			loading: false
		}));
	}

	parseString = () => {
		// regex to get players object
		const regex = /[?&]([^=#]+)=([^&#]*)/g;
        const url = this.props.location.search;
        const players = {};
        let match;

        while((match = regex.exec(url)) !== null) {
		    players[match[1]] = match[2];
		}

		return players;
	}

	render() {
		const { error, winner, loser, loading } = this.state;

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