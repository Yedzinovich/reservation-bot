const { Wit } = require('node-wit');

class WitService {
  constructor(accessToken) {
    this.clinet = new Wit({ accessToken });
  }

  async query(text) {
    const queryResult = await this.clinet.message(text);

    const { entities, intents } = queryResult;
    //console.log(queryResult);

    const extractedEntities = { intent: intents[0].name };

    Object.keys(entities).forEach((key) => {
      extractedEntities[entities[key][0].role] = entities[key][0].value;
    });

    return extractedEntities;
  }
}

module.exports = WitService;
