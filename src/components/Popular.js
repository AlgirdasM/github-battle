import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FetchPopularRepos } from '../utils/api';
import Loading from './Loading';

function SelectLanguage ({ selectedLanguage, onSelect}) {
	const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

	return (
		<ul className="languages">
			{languages.map((lang) => (
				<li
					style={lang === selectedLanguage ? {color: '#d0021b'} : null}
					onClick={() => onSelect(lang)}
					key={lang}>
						{lang}
				</li>
			))}
		</ul>
	)
}

SelectLanguage.propTypes = {
	selectedLanguage: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired
}


function RepoGrid ({ repos }) {
	return (
		<ul className='popular-list'>
			{repos.map(({ name, stargazers_count, owner, html_url, id }, index) => (
				<li key={id} className='popular-item'>
					<div className='popular-rank'>
						#{index + 1}
					</div>
					<ul className='space-list-items'>
						<li>
							<img className='avatar'
								src={owner.avatar_url}
								alt={`Avatar for ${owner.login}`}
							/>
						</li>
						<li>
							<a href={html_url}>{name}</a>
						</li>
						<li>
							@{owner.login}
						</li>
						<li>
							{stargazers_count} stars
						</li>
					</ul>
				</li>
			))}
		</ul>
	)
}

RepoGrid.propTypes = {
	repos: PropTypes.array.isRequired 
}


class Popular extends Component {
	state = {
    	selectedLanguage: 'All',
    	repos: null
  	}

  	componentDidMount() {
  		this.updateLanguage(this.state.selectedLanguage);
  	}

  	updateLanguage = (lang) => {
  		this.setState(() => ({selectedLanguage: lang, repos: null}));

  		FetchPopularRepos(lang)
  			.then((repos) => this.setState(() => ({repos})));
  	}

	render() {
		const { selectedLanguage, repos } = this.state;

		return (
			<div className="column">
				<SelectLanguage
					selectedLanguage={selectedLanguage}
					onSelect={this.updateLanguage}
				/>
				
				{repos 
					? <RepoGrid repos={repos} />
					: <Loading />
				}
			</div>
		)
	}
}

export default Popular