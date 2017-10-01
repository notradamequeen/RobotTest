import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: '',
      init_place: false,
      move: false
    };
  }
  handle(x){
    if (x.target.value === 'place'){
      this.setState({ init_place : true});
    } else {
      this.move()
    }
  }
  place(){
    this.setState({init_place: true})

    }
  move(){
    if(this.state.init_place === true){
      this.setState({move : true});
    }
    else{
      alert('please place the robot befor you move!!')
    }
  }

  render(){
    return (
        <div>
          <input type="button" onClick={this.place} value="place"/>
          <input type="button" onClick={this.move} value="move"/>
        </div>
      )
  }
}
export default App;
