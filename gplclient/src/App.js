import React, { Component } from 'react';
import './App.css';
import GoogleApp from './GoogleApp/GoogleApp';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      apps: [],
      sort: '',
      genre: '',
      error: null
    }
  }

  setGenre(genre) {
    this.setState({
      genre
    });
  }

  setSort(sort) {
    this.setState({
      sort
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const baseUrl = 'http://localhost:8000/apps';
    const params = [];
    
    if (this.state.genre) {
      params.push(`genre=${this.state.genre}`);
    }
    if (this.state.sort) {
      params.push(`sort=${this.state.sort}`);
    }
    const query = params.join('&');
    const url = `${baseUrl}?${query}`;

    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(data => {
        this.setState({
          apps: data,
          error: null
        });
      })
      .catch(err => {
        this.setState({
          error: 'Sorry, could not get any apps at this time.'
        });
      })
  }

  render() {
    //create apps array that hold the object from GoogleApp
    const apps = this.state.apps.map((singleApp, index) => {
      return <GoogleApp {...singleApp} key={index} />
    })

    return (
      <main className="App">
        <h1>Google Play Apps</h1>
        <div className="genreSearch">
          <form onSubmit={e => this.handleSubmit(e)}>
            <label htmlFor="sortSelect">Sort: </label>
            <select
              id="sortSelect"
              name="sortSelect"
              onChange={e => this.setSort(e.target.value)}
            >
              <option value="none">None</option>
              <option value="name">App</option>
              <option value="rating">Rating</option>
            </select>

            <label htmlFor="genreSelect"> Pick a genre to search: </label>
            <select
              id="genreSelect"
              name="genreSelect"
              onChange={e => this.setGenre(e.target.value)}
            >
              <option value="none">None</option>
              <option value="action">Action</option>
              <option value="puzzle">Puzzle</option>
              <option value="strategy">Strategy</option>
              <option value="casual">Casual</option>
              <option value="arcade">Arcade</option>
              <option value="card">Card</option>
              <option value="pretend play">Pretend Play</option>
            </select>

            <button type="submit">Search</button>
          </form>
          <div className="App_error">{this.state.error}</div>
          <div className="results">{apps}</div>
        </div>
      </main>
    );
  }
}

export default App;