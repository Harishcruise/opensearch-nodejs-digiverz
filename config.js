require("dotenv").config();
const { Client, Connection } = require("@opensearch-project/opensearch");
const { defaultProvider } = require("@aws-sdk/credential-provider-node");
const aws4 = require("aws4")
var host = "https://search-digiverz-inventory-search-qcjehp6czcnpgzdbjnyaceuj5i.ap-south-1.es.amazonaws.com"

const createAwsConnector = (credentials, region) => {
    class AmazonConnection extends Connection {
        buildRequestObject(params) {
            const request = super.buildRequestObject(params);
            request.service = 'es';
            request.region = region;
            request.headers = request.headers || {};
            request.headers['host'] = request.hostname;
  
            return aws4.sign(request, credentials);
        }
    }
    return {
        Connection: AmazonConnection
    };
  };

  module.exports.getClient = async () => {
    const credentials = {
        accessKeyId: "AKIAXUY5AL4XOC6OUCBQ",
        secretAccessKey: "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"
      };
    return new Client({
        ...createAwsConnector(credentials, 'ap-south-1'),
        node: host,
    });
  }
// full_format_recipes.json taken from
// https://www.kaggle.com/hugodarwood/epirecipes?select=full_format_recipes.json
// module.exports.recipes = require("./full_format_recipes.json");


/**
 * Client performs requests on our behalf
 * Additionally, when creating a client you can also specify `ssl configuration`, `bearer token`, `CA fingerprint` and other authentication details depending on protocols you use.
 */
// module.exports.client =await getClient();

module.exports.indexName = ".kibana_1";

