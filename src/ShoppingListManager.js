// ShoppingListManager.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ShoppingListManager extends Component {
  constructor() {
    super();
    this.state = {
      shoppingLists: [],
      newListName: '',
    };
  }

  // Function to add a new shopping list
  createShoppingList = () => {
    const { newListName } = this.state;
    if (newListName.trim() !== '') {
      // Create a unique identifier for the shopping list
      const listId = Date.now().toString();

      // Create a new shopping list object
      const newShoppingList = { id: listId, name: newListName, items: [] };

      // Update state to include the new shopping list
      this.setState((prevState) => ({
        shoppingLists: [...prevState.shoppingLists, newShoppingList],
        newListName: '',
      }));
    }
  };
  // Function to delete a shopping list
  deleteShoppingList = (listId) => {
    const shoppingLists = this.state.shoppingLists.filter((list) => list.id !== listId);
    this.setState({ shoppingLists });
  };

  render() {
    return (
      <div>
        <h1>My Shopping Lists</h1>
        <ul>
          {this.state.shoppingLists.map((list) => (
            <li key={list.id}>
              <Link to={`/list/${list.id}`}>{list.name}</Link>
              <button onClick={() => this.deleteShoppingList(list.id)}>Delete</button>
            </li>
          ))}
        </ul>
        <div>
          <label htmlFor="newListName">Create a new shopping list:</label>
          <input
            type="text"
            id="newListName"
            placeholder="Enter list name"
            value={this.state.newListName}
            onChange={(e) => this.setState({ newListName: e.target.value })}
          />
          <button onClick={this.createShoppingList}>Create</button>
        </div>
      </div>
    );
  }
}

export default ShoppingListManager;
