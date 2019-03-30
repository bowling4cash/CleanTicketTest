import React, { Component } from "react";
import Fetch from "./components/Fetch";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      result: [],
      apiKey: `removed`,
      keyword: "",
      inputValue: "",
    };
  }
  componentDidMount() {
    fetch(
      `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${
        this.state.apiKey
      }`
    )
      .then(res => res.json())
      .then(data => {
        console.log("Initial State", data, `Keyword Not yet set`);
        this.setState({ result: data._embedded.events });
      })
      .catch(err => console.log("noooo", err));
  }


  fetcher = event => {
    event.preventDefault();
    this.setState({
      keyword: this.state.inputValue,
    });


    fetch(
      `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${this.state.inputValue}&apikey=${this.state.apiKey}`
    )
      .then(res => res.json())
      .then(data => {
        console.log("Data Updated", data);
        this.setState({ result: data._embedded.events });
      })
      .catch(err => console.log("noooo", err));
  
      console.log(`Updated Keyword: ${this.state.keyword}`)
      this.setState({
        inputValue: ""
      });
    };

  formEventHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  componentDidUpdate() {
    console.log(this.state.inputValue, this.state.keyword)
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>TEST</h1>
        </header>
        <Fetch
          value={this.state.inputValue}
          fetcher={this.fetcher}
          changeHandler={this.formEventHandler}
        />
        {this.state.result.map(cur => (
          <div key={cur.id}>
            <p>{cur.name}</p>
            <img src={cur.images[0].url} alt="Events" />
          </div>
        ))}
      </div>
    );
  }
}

export default App;
