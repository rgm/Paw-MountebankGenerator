var _ = require('lodash');
var url = require('url');

function generateDummy () {
  return {
    predicates: [ ],
    responses: [ ]
  };
}

function generateResponse (exchange) {
	return {
		is: {
			statusCode: exchange.responseStatusCode,
			headers: exchange.responseHeaders,
			body: exchange.responseBody
		}
	}
}

var MountebankGenerator = function () {

  this.generate = function (context, requests, options) {
    var dummyResponse = generateDummy();
		// dummyResponse.requests = [];
		_.each(requests, function (req) {
			dummyResponse.predicates.push({
				equals: {
					method: req.method,
					path: url.parse(req.url).pathname,
					headers: req.headers,
				}
			});
			// dummyResponse.responses.push(req);
			var lastExchange = req.getLastExchange();
			dummyResponse.responses.push(generateResponse(lastExchange));
		});
    dummyResponse.options = options;
    var clientCode = JSON.stringify(dummyResponse, null, "  ");
    return clientCode;
  }

};

MountebankGenerator.identifier = "net.ryanmccuaig.PawExtensions.MountebankGenerator";
MountebankGenerator.title = "Mountebank (http://www.mbtest.org)";
registerCodeGenerator(MountebankGenerator);
