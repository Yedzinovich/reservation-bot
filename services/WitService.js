const { Wit } = require('node-wit');

class WitService {
  constructor(accessToken) {
    this.clinet = new Wit({ accessToken });
  }

  async query(text) {
    const queryResult = await this.clinet.message(text);

    const { entities, intents, traits } = queryResult;
    // console.log(queryResult);

    const extractedEntities = { intent: intents[0].name };

    Object.keys(entities).forEach((key) => {
      extractedEntities[entities[key][0].role] = entities[key][0].value;
    });

    Object.keys(traits).forEach((key) => {
      if (key === 'wit$greetings' && traits[key][0].confidence > 0.7) {
        extractedEntities.greetings = traits[key][0].value;
      }
      if (key === 'wit$bye' && traits[key][0].confidence > 0.7) {
        extractedEntities.bye = traits[key][0].value;
      }
    });

    console.log(extractedEntities);

    return extractedEntities;
  }
}

module.exports = WitService;
