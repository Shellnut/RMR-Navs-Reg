const utilities = require('../utilities/utilities');

// Log messages

var processArgs = utilities.processArgs();
var log = processArgs.logging == 'dev' ? false : true;

module.exports = {
    // CONSOLE LOG MESSAGES
    consoleMsg: function() {
        if(log) {
            console.log.apply(this, arguments);
        }
    },
};
