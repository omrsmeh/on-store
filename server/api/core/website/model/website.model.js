'use strict';

class Website {

  constructor(server) {
    let connection   = server.connection;
    let mongoose     = server.lib;
    let Schema       = mongoose.Schema;

    let websiteSchema = new Schema({
      name: { type: String, required: true, unique: true },
      storeId: { type: Schema.Types.ObjectId, required: true },
      baseCurrency: { type: String, required: true },
      activeWebsite: { type: Boolean, "default": true },
      baseCateogryId: { type: Schema.Types.ObjectId, required: true }
    }, {
      minimize: false,
      timestamps: true,
      versionKey: '_websiteVersion'
    });

    this.webSite = connection.model('WebSite', websiteSchema);
  }

  find(query) {
    return this.webSite.find(query);
  }

  findOne(query) {
    return this.webSite.findOne(query);
  }

  findById(id) {
    return this.webSite.findById(id);
  }

  findByIds(idArray) {
    return this.find({"_id": {"$in": idArray}});
  }

  findActiveWebsites() {
    return this.find({activeWebsite: true});
  }

  findInActiveWebsites() {
    return this.find({activeWebsite: false});
  }

  findByCurrency(currencyName) {
    return this.find({baseCurrency: currencyName});
  }

  save(newValue) {
    let website = new this.webSite(newValue);
    return website.save();
  }
}

module.exports = Website;
module.exports.getName = () => {
  return 'website';
}
