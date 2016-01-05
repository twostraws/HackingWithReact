import React from 'react';
import { IndexLink } from 'react-router';
import ajax from 'superagent';

class User extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			events: [],
		};
	}

	componentWillMount() {
		ajax.get(`https://api.github.com/users/${this.props.params.user}/events`)
			.end((error, response) => {
				if (!error && response) {
					this.setState({ events: response.body });
				} else {
					console.log(`Error fetching user data.`, error);
				}
			}
		);
	}

	render() {
		return (<div>
			<p>You are here: <IndexLink to="/" activeClassName="active">Home</IndexLink> &gt; {this.props.params.user}</p>
			<ul>
			{this.state.events.map((event, index) => {
				const eventType = event.type;
				const repoName = event.repo.name;
				const creationDate = event.created_at;

				return (<li key={index}><strong>{repoName}</strong>: {eventType}
					at {creationDate}.
				</li>);
			})}
			</ul>
		</div>);
	}
}

User.propTypes = {
	params: React.PropTypes.object,
};

export default User;
