import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import images from "./images.json"

class App extends Component {

  constructor() {
    super();
    this.state = {
      images,
      score: 0,
      topScore: 0,
      imageClicked: [],
      message: "Click on an image to earn points, but don't click on any more than once!"
    }
    this.startGame = this.startGame.bind(this);
    console.log(this)
  }

  imageShuffle = (pictures) => {
    var random;
    var x;
    for (var i = pictures.length-1; i > 0; i--) {
      random = Math.floor(Math.random() * (i + 1));
      x = pictures[i];
      pictures[i] = pictures[random];
      pictures[random] = x;
    }
    return pictures;
  }

  restart = () => {
    this.setState({
      score: 0,
      imageClicked: [],
      message: "Oops! You've already clicked that one. Start again."
    })
  }

  startGame = (event) => {
    this.setState({
      imageClicked: this.state.imageClicked.concat(event.target.id)
    })
    if (this.state.imageClicked.indexOf(event.target.id) === -1) {
      var currentScore = this.state.score
      currentScore++;
      var currentTopScore = this.state.topScore
      if (currentScore > currentTopScore) {
        currentTopScore++;
      }
      this.setState({
        topScore: currentTopScore,
        score: currentScore,
        message: "Woohoo! You guessed correctly"
      })
    }
    else {
      this.restart();
    }
    this.imageShuffle(images);
  }

  render() {
    return (
      <div className="App">
        <h1>Clicky Game!</h1>
        <h2>{this.state.message}</h2>
        <div>
        <h3>Score: {this.state.score}</h3>
        <h4>Top Score: {this.state.topScore}</h4>
        </div>
        <div id="images" className="design">
          {images.map(image => (
            <img
              src={image.url}
              id={image.id}
              alt={image.name}
              key={image.id}
              width="200"
              height="200"
              onClick={this.startGame}
            />

          ))}
        </div>
      </div>
    );
  }
}

export default App;
