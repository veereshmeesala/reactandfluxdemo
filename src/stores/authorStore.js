'use strict';

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');

var _authors = [];

var AuthorStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function(callback){
        this.on('change', callback);
    },
    removeChangeListener: function(callback){
        this.removeListener('change', callback);
    },
    emitChange: function(){
        this.emit('change');
    },
    getAllAuthors: function(){
        return _authors;
    },
    getAuthorById: function(id){
        return _.find(_authors, {id:id});
    }
});

Dispatcher.register(function(action){
    switch(action.actionType){
        case ActionTypes.INITIALIZE:
            _authors = action.initialData.authors;
            AuthorStore.emitChange();
            break;
        case ActionTypes.CREATE_AUTHOR:
            _authors.push(action.author);
            AuthorStore.emitChange();
            break;
        case ActionTypes.UPDATE_AUTHOR:
            var existingAuthor = _.find(_authors, {id: action.author.id});
            var existingAuthorIndex = _.indexOf(_authors, existingAuthor);
            _authors.splice(existingAuthorIndex, 1, action.author);
            AuthorStore.emitChange();
             break;
        case ActionTypes.DELETE_AUTHOR:
            _.remove(_authors, function(author){
                return action.id === author.id;
                });
            AuthorStore.emitChange();
             break;      
        default: 
            // nothing to do as now    
    }
});

module.exports = AuthorStore;