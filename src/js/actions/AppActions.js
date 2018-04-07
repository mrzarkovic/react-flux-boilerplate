const AppDispatcher = require('../dispatcher/AppDispatcher');
const AppConstants = require('../constants/AppConstants');

const AppActions = {
    receiveData: function (data) {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.RECEIVE_DATA,
            data: data
        });
    }
};

module.exports = AppActions;