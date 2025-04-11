const requestHandler = require('./handlers/requestHandler');
const responseHandler = require('./handlers/responseHandler');

module.exports = {
    *beforeSendRequest(requestDetail) {
        return yield* requestHandler.beforeSendRequest(requestDetail);
    },
    
    *beforeSendResponse(requestDetail, responseDetail) {
        return yield* responseHandler.beforeSendResponse(requestDetail, responseDetail);
    }
};