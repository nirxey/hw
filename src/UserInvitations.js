import React, { Component } from 'react';

class UserInvitations extends Component {
    constructor() {
        super();
        this.state = {
            invitedUsers: [],
            newInvite: '',
        };
    }

    inviteUser = (e) => {
        e.preventDefault();
        const newInvite = this.state.newInvite.trim();
        if (newInvite) {
            this.setState((prevState) => ({
                invitedUsers: [...prevState.invitedUsers, newInvite],
                newInvite: '',
            }));
        }
    };

    render() {
        return (
            <div>
                <h2>Invite Other Users</h2>
                <form onSubmit={this.inviteUser}>
                    <label htmlFor="invite">Enter email to invite:</label>
                    <input
                        type="text"
                        id="invite"
                        placeholder="E.g., user@example.com"
                        value={this.state.newInvite}
                        onChange={(e) => this.setState({ newInvite: e.target.value })}
                        required
                    />
                    <button type="submit">Invite</button>
                </form>
                <ul>
                    {this.state.invitedUsers.map((user, index) => (
                        <li key={index}>{user}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default UserInvitations;