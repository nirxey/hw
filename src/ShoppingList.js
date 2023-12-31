import React, { Component } from 'react';
import Members from './Members';
class ShoppingList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listName: '',
            items: [],
            highlightedItems: new Set(),
            itemsForDeletion: [],
            showMembers: false,
        };
    }



    addItem = (e) => {
        e.preventDefault();
        const newItem = this.state.newItem.trim();
        if (newItem) {
            this.setState((prevState) => ({
                items: [...prevState.items, newItem],
                newItem: '',
            }));
        }
    };
    goBackToManager = () => {
        const { history, location } = this.props;
        history.push('/lists', {
            shoppingLists: location.state?.shoppingLists || [],
        });
    };
    setFilter = (filter) => {
        this.setState({ filter });
    };

    getFilteredItems = () => {
        const { items, filter, highlightedItems } = this.state;
        if (filter === 'highlighted') {
            return items.filter((_, index) => highlightedItems.has(index));
        } else if (filter === 'notHighlighted') {
            return items.filter((_, index) => !highlightedItems.has(index));
        }
        return items; // Default: no filter
    };

    removeItem = (index) => {
        const items = this.state.items.filter((_, i) => i !== index);
        this.setState({ items });


        this.setState((prevState) => ({
            itemsForDeletion: prevState.itemsForDeletion.filter((item) => item !== index),
        }));
    };
    editListName = () => {
        const newListName = prompt('Enter a new list name:', this.state.listName);
        if (newListName !== null) {
            this.setState({ listName: newListName });
        }
    };

    toggleSelect = (index) => {
        const highlightedItems = new Set(this.state.highlightedItems);
        if (highlightedItems.has(index)) {
            highlightedItems.delete(index);
        } else {
            highlightedItems.add(index);
        }
        this.setState({ highlightedItems });
    };

    addToDeletionList = (index) => {
        this.setState((prevState) => ({
            itemsForDeletion: [...prevState.itemsForDeletion, index],
        }));
    };



    render() {
        const filteredItems = this.getFilteredItems();

        return (
            <div>
              <h1>{this.state.listName}</h1>
              <button onClick={this.editListName}>Edit List Name</button>
              <button onClick={this.openMembers}>View Members</button>
              <button onClick={this.goBackToManager}>Go Back to Shopping List Manager</button>
                <button onClick={() => this.setFilter('highlighted')}>Show Highlighted</button>
                <button onClick={() => this.setFilter('notHighlighted')}>Show Not Highlighted</button>
                <button onClick={() => this.setFilter('all')}>Show All</button>
                {this.state.showMembers && <Members />}
                <div className="buttons">
                    <button onClick={this.createList}>Create Another List</button>
                    <button onClick={this.editList}>Edit List</button>

                </div>
                <form onSubmit={this.addItem}>
                    <label htmlFor="item">Add an item:</label>
                    <input
                        type="text"
                        id="item"
                        placeholder="E.g., Apples"
                        value={this.state.newItem}
                        onChange={(e) => this.setState({ newItem: e.target.value })}
                        required
                    />
                    <button type="submit">Add</button>
                </form>
                <ul>

                    {this.state.items.map((item, index) => (
                        <li key={index} className={this.state.highlightedItems.has(index) ? "highlighted" : ""}>
                            <input
                                type="checkbox"
                                checked={this.state.highlightedItems.has(index)}
                                onChange={() => this.toggleSelect(index)}
                            />
                            {item}
                            <span
                                className="delete"
                                onClick={() => this.addToDeletionList(index)}
                            >

                            </span>
                        </li>
                    ))}
                </ul>



            </div>
        );
    }
    componentDidMount() {
        const { listId } = this.props.match.params;
        const shoppingList = this.props.location.state?.shoppingLists.find((list) => list.id === listId);

        if (shoppingList) {
            this.setState({
                listName: shoppingList.name,
                items: shoppingList.items,
            });
        }
    }


}

export default ShoppingList;
