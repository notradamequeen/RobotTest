import React, { Component } from 'react';
import charright from './charright.png';
import charleft from './charleft.png';
import charup from './charup.png'
import chardown from './chardown.png'
import './App.css';
import './Grid1.css';

var datas = []
var Grid1 = React.createClass ({
  getInitialState: function() {
    return {
      max_x: 8,
      max_y:8,
      init_place: false,
      x: 0,
      y: 0,
      click_x: 0,
      click_y: 0,
      left: false,
      right: true,
      up:false,
      down: false,
      head: 'west'
    };
  },
  place: function(){
    this.setState({init_place: true})
    let data = {"action": "place", "value": '('+this.state.x+','+this.state.y+', west'+')', "creator": "oktaviani.febby@gmail.com"}
    datas.push(data)
    },
  move: function(){
    if(this.state.init_place === true){
      if (this.state.right === true && this.state.x < 7){
        // this.setState({x : this.state.x - 1});
        this.setState({x : this.state.x + 1});
        this.setState({click : this.state.click_x + 1});
        console.log('x' + this.state.x);
        console.log('y' + this.state.y);
      }
      if (this.state.up === true && this.state.y < 7){
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
    this.setState({head: 'east'});
  },
  right: function(){
    this.setState({right : true});
    this.setState({left : false});
    this.setState({up: false});
    this.setState({down: false});
    this.setState({head: 'west'});
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
  },
  render: function(){
    let rows = [];
    for (var i = 7; i >= 0; i--){
      let rowID = `row${i}`
      let cell = []
      for (var idx = 0; idx < 8; idx++){
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
            <h4> Position : x {this.state.x}  y {this.state.y}</h4>
          </div>
        </div>
        <div className="cleared"></div>
      </div>
    )

  }

});

export default Grid1;
