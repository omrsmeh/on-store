'use strict';

class ApiLogger {
  
  constructor() {
    this.allowLog = (parseInt(process.env.ALLOW_DEBUG) === 1);
    this.logType  = process.env.DEBUG_TYPE;
  }
  
  _log(type, message) {
    
    if(this.allowLog) {
      console.log('['+type.toUpperCase()+'] ' + (new Date()).toISOString() + ' : ', message);
    }
  }
  
  logError(msgObject) {
    
    this._log('err', msgObject);
  }
  
  logInfo(msgObject) {
    
    this._log('info', msgObject);
  }
  
  logWarning(msgObject) {
    
    this._log('warn', msgObject);
  }
}

module.exports = ApiLogger