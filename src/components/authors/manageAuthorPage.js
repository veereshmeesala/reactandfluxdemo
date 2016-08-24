'use strict';
var React = require('react');
var AuthorForm = require('./authorForm');

var ManageAuthorPage = React.createClass({
    getInitialState: function(){
        return {
            author: {id: '', firstName: '', lastName: ''},
            errors: {},
			dirty: false
        };
    },
    setAuthorState: function(event){
        this.setState({dirty: true});
        var field = event.target.name;
        var value = event.target.value;
        this.state.author[field] = value;
        return this.setState({author: this.state.author});
    },
    render: function(){
        return (
            <AuthorForm author={this.state.author} onChange={this.setAuthorState} errors={this.state.errors} />
        );
    }
});

module.exports = ManageAuthorPage;