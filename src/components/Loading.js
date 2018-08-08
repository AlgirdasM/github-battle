import React, { Component } from 'react';
import PropTypes from 'prop-types';

const styles = {
	content: {
		textAlign: 'center',
		fontSize: '35px'
	}
}

class Loading extends Component {

	state = {
		text: this.props.text
	}

	componentDidMount() {
		const { text, speed } = this.props;
		const stopper = `${text}...`;

		this.interval = window.setInterval(() => {
			this.state.text === stopper
				? this.setState(() => ({ text: this.props.text}))
				: this.setState((prevState) => ({ text: prevState.text + '.' }))
		}, speed);
	}

	componentWillUnmount() {
		window.clearInterval(this.interval);
	}

	render() {
		const { text } = this.state;

		return (
			<p style={styles.content}>
				{text}
			</p>
		)
	}
}

Loading.propTypes = {
	text: PropTypes.string.isRequired,
	speed: PropTypes.number.isRequired
}

Loading.defaultProps = {
	text: 'Loading',
	speed: 300
}

export default Loading;