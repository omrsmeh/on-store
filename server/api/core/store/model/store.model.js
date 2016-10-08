'use strict';

class WebStore {

  constructor(server) {
    let connection = server.connection;
    let mongoose   = server.lib;
    let Schema     = mongoose.Schema;

    let storeSchema = new Schema({
      name: { type: String, required: true, unique: true },
      baseCurrency: { type: String, required: true },
      activeStore: { type: Boolean, "default": true },
      logoImage: { type: String, required: true },
      emailLogoImage: { type: String, required: true }
    }, {
      minimize: false,
      timestamps: true,
      versionKey: '_storeVersion'
    });

    this.webStore = connection.model('WebStore', storeSchema);
  }

  find(query) {
    return this.webStore.find(query);
  }

  findOne(query) {
    return this.webStore.findOne(query);
  }

  findById(id) {
    return this.webStore.findById(id);
  }

  findByIds(idArray) {
    return this.find({"_id": {"$in": idArray}});
  }

  findActiveStores() {
    return this.find({activeStore: true});
  }

  findActiveStoresById(id) {
    return this.findOne({"_id": id, "activeStore": true});
  }

  findInActiveStores() {
    return this.find({activeStore: false});
  }

  findByCurrency(currencyName) {
    return this.find({baseCurrency: currencyName});
  }

  save(newValue) {
    let store = new this.webStore(newValue);
    return store.save();
  }
}

module.exports = WebStore;
module.exports.getName = () => {
  return 'webstore';
}
