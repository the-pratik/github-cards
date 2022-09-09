import './App.css';
import React from 'react';
import axios from 'axios';

class CardList extends React.Component {
	render() {
		const background = require('./not-found.png');

		return (
			<div className="container">
				<div className="card-deck row">
					{this.props.profiles.length == 0 ? 
						<img style={{ maxWidth: '500px', maxHeight: '500px', margin: '0 auto' }} src={background} className="img-fluid" alt="No users"/>  : 
						this.props.profiles.map(profile => <Card key={profile.id} {...profile} />)
					}
				</div>
			</div>
		);
	}
}

class Card extends React.Component {
	render() {
		const profile = this.props;

		return (
			<div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
				<div className="card mb-4 shadow p-2 bg-white rounded">
					<div className="view overlay">
						<img className="card-img-top" src={profile.avatar_url} alt="Card image cap" />
						<a href="#!">
							<div className="mask rgba-white-slight"></div>
						</a>
					</div>

					<div className="card-body">
						<h4 className="card-title">{profile.name}</h4>
						<span className="card-text">User since <span style={{ color: 'darkgreen' }}>{profile.created_at.slice(0,10)}</span></span>
						<p className="card-text" style={{fontFamily: 'sans-serif'}}>
							<a style={{ textDecoration: 'none', color: 'grey' }} target="_blank" href={`${profile.html_url}?tab=followers`}>
								<i className="fa fa-users"></i> {profile.followers} followers . 
							</a> 
							<a style={{ textDecoration: 'none', color: 'grey' }} target="_blank" href={`${profile.html_url}?tab=following`}>
								<i className="fa fa-person-walking"></i> {profile.following} following 
							</a>
						</p>
						<span className="card-text" style={{ color: '#8500ff' }}><i class="fa fa-folder"></i> {profile.public_repos} repos</span>
						<p className="card-text">{profile.company ? `Works at ${profile.company}` : ''}</p>
						<a target="_blank" href={profile.html_url} className="btn btn-dark"><i className="fa fa-github"></i> Profile</a>
					</div>
				</div>
			</div>
		);
	}
}

class Form extends React.Component {
	state = {
		userName: ''
	};

	handleSubmit = async (event) => {
		event.preventDefault();
		var err = '';
		const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`).catch(function (error) {
			err = error.toJSON();
		});

		if(err.code == 'ERR_BAD_REQUEST'){
			alert('Invalid Username!');
		} else {
			this.props.onSubmit(resp.data);
			console.log(resp.data);
		}

		this.setState({ userName: '' });
	};

	render() {
  	return (
    	<form onSubmit={this.handleSubmit}>
    	  	<input 
				type="text" 
				placeholder="GitHub username" 
				value={this.state.userName}
				onChange={event => this.setState({ userName: event.target.value })}
				required/>
        	<button className="btn btn-primary">Add</button>
    	</form>
    );
  }
}

class App extends React.Component {
	state = {
		profiles: [],
	};

	addNewProfile = (profileData) => {
		this.setState(prevState => ({
			profiles: [...prevState.profiles, profileData],
		}));
	};

	render() {
		return (
			<div>
				<div className="header">{this.props.title}</div>
				<Form onSubmit={this.addNewProfile} />
				<CardList profiles={this.state.profiles} />
			</div>
		);
	}
}

export default App;
