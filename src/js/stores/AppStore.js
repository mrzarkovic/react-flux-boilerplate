const EventEmitter = require('events').EventEmitter;
const assign = require('object-assign');

const AppDispatcher = require('../dispatcher/AppDispatcher');
const AppConstants = require('../constants/AppConstants');
const AppAPI = require('../utils/appAPI');

const CHANGE_EVENT = 'change';

var _data = [];

const AppStore = assign({}, EventEmitter.prototype, {
    addData: function (data) {
      _data.push(data);
    },

    getData: function () {
        return _data;
    },

    setData: function (data) {
      _data = data;
    },

    removeData: function (dataId) {
        let index = _data.findIndex( n => n.id == dataId);
        _data.splice(index, 1);
    },
    
    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register(function (payload) {
    let action = payload.action;

    switch(action.actionType) {
        case AppConstants.RECEIVE_DATA:
            console.log('Receiving data...');

            // Store Save
            AppStore.setData(action.data);

            AppStore.emitChange();
            break;
    }

    return true;
});

module.exports = AppStore;