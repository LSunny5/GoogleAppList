import React, { Component } from 'react';
import './App.css';
import GoogleApp from './GoogleApp/GoogleApp';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      apps: [],
      sort: '',
      appGenre: '',
      error: null
    }
  }

  setSearch(appGenre) {
    this.setState({
      appGenre
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
    if (this.state.appGenre) {
      params.push(`genre=${this.state.appGenre}`);
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
    const apps = this.state.apps.map((oneApp, i) => {
      return <GoogleApp {...oneApp} key={i}/>
    })
    return (
      <main className="App">
        <h1>Google Play Apps</h1>
        <div className="genreSearch">
          <form onSubmit={e => this.handleSubmit(e)}>
            <label htmlFor="search">Search for a genre: </label>
            <input
              type="text"
              id="search"
              name="search"
              value={this.state.appGenre}
              onChange={e => this.setSearch(e.target.value)}/>

            <label htmlFor="sort">Sort: </label>
            <select id="sort" name="sort" onChange={e => this.setSort(e.target.value)}>
              <option value="">None</option>
              <option value="appName">App</option>
              <option value="rating">Rating</option>
            </select>
            <button type="submit">Search</button>
          </form>
          <div className="App_error">{ this.state.error }</div>
        </div>
        {apps}
      </main>
    );
  }
}

export default App;