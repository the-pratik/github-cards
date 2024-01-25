import React from "react";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./not-found.svg";

import { Link } from "react-router-dom";

class CardList extends React.Component {
  render() {
    return (
      <div className="container">
        <ToastContainer />
        <div className="card-deck row">
          {this.props.profiles.length === 0 ? (
            <img
              style={{
                maxWidth: "500px",
                maxHeight: "500px",
                margin: "30px auto",
              }}
              src={NotFound}
              className="img-fluid"
              alt="No users"
            />
          ) : (
            this.props.profiles.map((profile) => (
              <Card
                removeCard={this.props.removeCard}
                profiles={this.props.profiles}
                key={profile.id}
                {...profile}
              />
            ))
          )}
        </div>
      </div>
    );
  }
}

class Card extends React.Component {
  render() {
    const profile = this.props;

    return (
      <div
        className="col-xs-12 col-sm-6 col-md-4 col-lg-3"
        style={{ paddingTop: "20px" }}
      >
        <Link to={`/profile/${profile.login}`}>
          <div className="card mb-4" style={{ borderRadius: "100%" }}>
            <div className="view overlay">
              <img
                className="card-img-top"
                src={profile.avatar_url}
                style={{ borderRadius: "100%" }}
                alt="Card Cap"
              />
            </div>
          </div>
        </Link>
        <button
          onClick={() => this.props.removeCard(profile.id)}
          className="btn btn-danger btn-align"
        >
          <i className="fa fa-close"></i>
        </button>
      </div>
    );
  }
}

class Form extends React.Component {
  state = {
    userName: "",
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    let err = "";
    const resp = await axios
      .get(`https://api.github.com/users/${this.state.userName}`)
      .catch(function (error) {
        err = error.toJSON();
      });

    if (err.code === "ERR_BAD_REQUEST") {
      toast.error("Invalid Username", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      // To check if user is already added
      const hasCard = this.props.profiles.some(function (card) {
        return card.id === resp.data.id;
      });

      if (hasCard) {
        toast.warn("User already present", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        this.props.onSubmit(resp.data);
      }
    }

    this.setState({ userName: "" });
  };

  render() {
    return (
      <div>
        <form id="head" onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Github Username (the-pratik)"
            value={this.state.userName}
            onChange={(event) =>
              this.setState({ userName: event.target.value })
            }
            required
          />
          <button className="btn btn-primary">Add</button>
        </form>
        <div style={{ textAlign: "center", marginBottom: "10px" }}>
          <span className="showProfiles">
            Currently showing{" "}
            <span className="profileCount">{this.props.profiles.length}</span>{" "}
            profiles.
          </span>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  state = JSON.parse(window.localStorage.getItem("state")) || {
    profiles: [],
    checked: true,
  };

  // Check what is the persisted theme
  componentDidMount() {
    this.toggleTheme(this.state.checked);
  }

  // To persist state on refresh
  componentDidUpdate() {
    window.localStorage.setItem("state", JSON.stringify(this.state));
  }

  addNewProfile = (profileData) => {
    this.setState((prevState) => ({
      profiles: [...prevState.profiles, profileData],
    }));
  };

  removeCard = (cardId) => {
    const newProfiles = this.state.profiles.filter((obj) => obj.id !== cardId);
    this.setState((prevState) => ({
      profiles: newProfiles,
    }));
  };

  handleOnCheck = (event) => {
    this.setState({ checked: event.target.checked });
    this.toggleTheme(event.target.checked);
  };

  toggleTheme = (theme) => {
    if (theme) {
      document.documentElement.style.setProperty("--bodyColor", "#fff");
      document.documentElement.style.setProperty(
        "--backgroundColor",
        "#0d1117"
      );
    } else {
      document.documentElement.style.setProperty("--bodyColor", "#0d1117");
      document.documentElement.style.setProperty("--backgroundColor", "#fff");
    }
  };

  render() {
    return (
      <>
        <div className="switchHeader">
          <div className="header">{this.props.title}</div>
          <div>
            <label className="switch">
              <input
                type="checkbox"
                checked={this.state.checked}
                onChange={(event) => this.handleOnCheck(event)}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
        <Form onSubmit={this.addNewProfile} profiles={this.state.profiles} />
        <CardList removeCard={this.removeCard} profiles={this.state.profiles} />
      </>
    );
  }
}

export default App;
