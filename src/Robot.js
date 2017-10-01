import React, { Component } from 'react';
import charright from './charright.png';
import charleft from './charleft.png';
import charup from './charup.png'
import chardown from './chardown.png'
import './Robot.css';

var datas = []
var Robot = React.createClass ({
  getInitialState: function() {
    return {
      max_x: 6,
      max_y:6,
      init_place: false,
      x: 0,
      y: 0,
      left: false,
      right: false,
      up:true,
      down: false,
      head: ''
    };
  },
  place: function(){
    // this function is to place the robot on the board
    this.setState({init_place: true});
    this.setState({x: 0, y:0, left: false, right: false, down: false, up: true, head: 'north'});
    datas = []
    let data = {"action": "place", "value": '('+this.state.x+','+this.state.y+', north'+')', "creator": "oktaviani.febby@gmail.com"}
    datas.push(data)
    },
  move: function(){
    // function to move the robbot
    if(this.state.init_place === true){
      if (this.state.right === true && this.state.x < this.state.max_x){
        this.setState({x : this.state.x + 1});
        this.setState({click : this.state.click_x + 1});
        console.log('x' + this.state.x);
        console.log('y' + this.state.y);
      }
      if (this.state.up === true && this.state.y < this.state.max_y){
        this.setState({y : this.state.y + 1});
        this.setState({click_y : this.state.click_y + 1});
        console.log('x' + this.state.x);
        console.log('y' + this.state.y);
      }
      if(this.state.left === true && this.state.x != 0){
        this.setState({x : this.state.x - 1});
        this.setState({click : this.state.click_x + 1});
        console.log('x' + this.state.x);
        console.log('y' + this.state.y);
      }
      if(this.state.down === true && this.state.y > 0){
        this.setState({y : this.state.y - 1});
        console.log('x' + this.state.x);
        console.log('y' + this.state.y);
      }
      let data = {"action": "move", "value": '('+this.state.x+','+this.state.y+','+ this.state.head +')', "creator": "oktaviani.febby@gmail.com"}
      datas.push(data)
    }
    else{
      alert('please place the robot befor you move!!')
    }
  },
  left: function(){
    this.setState({left : true});
    this.setState({right : false});
    this.setState({up: false});
    this.setState({down: false});
    this.setState({head: 'west'});
  },
  right: function(){
    this.setState({right : true});
    this.setState({left : false});
    this.setState({up: false});
    this.setState({down: false});
    this.setState({head: 'east'});
  },
  up: function(){
    this.setState({up: true})
    this.setState({left : false});
    this.setState({right : false});
    this.setState({down: false});
    this.setState({head: 'north'});
  },
  down: function(){
    this.setState({down: true})
    this.setState({left : false});
    this.setState({right : false});
    this.setState({up: false});
    this.setState({head: 'south'});
  },
  save: function(){
    console.log(JSON.stringify(datas))
    fetch('https://test.interaktiv.sg/robot-test/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datas),
    })
    // .then(res => res.json())
    // .then(res => {console.log(res.status)})
  },
  render: function(){
    let rows = [];
    let position = '-'
    if (this.state.init_place === true){
      position = this.state.x +', ' + this.state.y + ', ' + this.state.head
    }
    for (var i = this.state.max_y - 1; i >= 0; i--){
      let rowID = `row${i}`
      let cell = []
      for (var idx = 0; idx < this.state.max_x; idx++){
        let cellID = `cell${i}-${idx}`
        if (this.state.init_place === true && this.state.y === i && this.state.x === idx){
          if (this.state.left === true){
            cell.push(<td key={cellID} id={cellID} width="60px" height="50px">
              <img src={charleft} width="50px" height="40px" alt=''/></td>)
          }
          if (this.state.right === true) {
            cell.push(<td key={cellID} id={cellID} width="60px" height="50px">
              <img src={charright} width="50px" height="40px" alt=''/></td>)
          }
          if (this.state.up === true){
            cell.push(<td key={cellID} id={cellID} width="60px" height="50px">
              <img src={charup} width="50px" height="40px" alt=''/></td>)
          }
          if (this.state.down === true){
            cell.push(<td key={cellID} id={cellID} width="60px" height="50px">
              <img src={chardown} width="50px" height="40px" alt=''/></td>)
          }
        }
        else {
          cell.push(<td key={cellID} id={cellID} width="60px" height="50px"></td>)
        }
      }

      rows.push(<tr key={i} id={rowID}>{cell}</tr>)
    }
    return(
    <div className="wrapper">
        <div className="content">
          <table id="simple-board" border="1px" width="100%" height="500px">
             <tbody>
               {rows}
             </tbody>
           </table>
        </div>
        <div className="sidebar">

          <div className="action-header">
            <h3>Action</h3>
          </div>
          <div className="container">
            <button onClick={this.place}>place</button><br/><br/>
            <button onClick={this.move}>move</button><br/><br/>
            <button onClick={this.left}>left</button>&nbsp;
            <button onClick={this.right}>right</button>&nbsp;
            <button onClick={this.up}>up</button>&nbsp;
            <button onClick={this.down}>down</button><br/><br/>
            <button onClick={this.save}>save</button><br/><br/>
            <h4> Position : {position}</h4>
          </div>
        </div>
        <div className="cleared"></div>
      </div>
    )

  }

});

export default Robot;
