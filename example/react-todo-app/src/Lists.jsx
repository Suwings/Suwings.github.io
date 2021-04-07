/*
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2021-04-07 16:34:51
 * @LastEditTime: 2021-04-07 19:36:48
 * @Description: 
 */

import React from 'react';
import './css/lists.css';

export default class Lists extends React.Component {

  constructor(props) {
    super();
    this.state = {
      todoItems: props.data,
      newItemValue: ""
    }
    this.createTodo = this.createTodo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.switchStatus = this.switchStatus.bind(this);
    // 动态刷新示例
    // setTimeout(() => {
    //   this.setState({ todoItems: "" })
    // }, 1000);
  }

  createTodo(e) {
    const t = this.props.data;
    t.push({ title: this.state.newItemValue, status: false });
    this.setState({
      todoItems: t
    });
  }

  deleteTodo(index) {
    const t = this.props.data;
    t.splice(index, 1);
    this.setState({ todoItems: t });
  }

  switchStatus(index) {
    const t = this.state.todoItems;
    t[index].status = !t[index].status;
    this.setState({ todoItems: t });
  }

  handleChange(event) {
    this.setState({ newItemValue: event.target.value });
  }

  render() {

    // 具体列表项目
    let items = this.props.data.map((todo, index) => {
      return <li className="Todo-item-wapper" key={todo.title}>
        <div className={todo.status ? "Todo-item done" : "Todo-item"}>

          <span>
            <span onClick={() => this.switchStatus(index)} className="item-status">{todo.status ? "✔" : "✘"}&nbsp;&nbsp;&nbsp;&nbsp;</span>
            {todo.title}
          </span>
          <span className="item-cannel" onClick={(e) => this.deleteTodo(index)}>X</span>

        </div>
      </li>
    });

    // 列表项目框与新增功能
    return (
      <div className="Lists-wapper">
        <div className="Lists">
          {items}
        </div>
        <input type="text" className="input" value={this.state.newItemValue} onChange={this.handleChange} />
        <button onClick={(e) => this.createTodo(e)}>新增</button>
      </div>
    );
  }

}
