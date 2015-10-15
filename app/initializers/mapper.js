import Ember from 'ember';


// convert url to route
export function toLogicalPath(realPath) {

  // no mappings yet

  return realPath;
}


// convert route to url
export function fromLogicalPath(logicalPath) {

  // no mappings yet

  return logicalPath;
}


export const MapperLocation = Ember.HistoryLocation.extend({
  implementation: 'mapper',

  getURL() {
    var state = this.getState();

    return (state && state.logicalPath) || toLogicalPath(this._super());
  },

  setURL(logicalPath) {
    var state = this.getState();

    if (!state || state.logicalPath !== logicalPath) {
      this.pushState(this.formatURL(logicalPath), logicalPath);
    }
  },

  replaceURL(logicalPath) {
    var state = this.getState();

    if (!state || state.logicalPath !== logicalPath) {
      this.replaceState(this.formatURL(logicalPath), logicalPath);
    }
  },

  pushState(realPath, logicalPath) {
    var state = { realPath, logicalPath };

    this.get('history').pushState(state, null, realPath);

    this._historyState = state;
    this._previousURL = this.getURL();
  },

  replaceState(realPath, logicalPath) {
    var state = { realPath, logicalPath };

    this.get('history').replaceState(state, null, realPath);

    this._historyState = state;
    this._previousURL = this.getURL();
  },

  formatURL(logicalPath) {
    return this._super(fromLogicalPath(logicalPath));
  },

});


export function initialize(application) {
  application.register('location:mapper', MapperLocation);
};


export default {
  name: 'mapper',
  initialize: initialize
};
