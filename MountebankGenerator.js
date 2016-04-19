function pathFromUrl(url) {
  var path;
  path = url.replace(/^https?:\/\/[^\/]+/i, '');
  if (!path) {
    path = '/';
  }
  return path;
};

function generateEmpty () {
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
    var mountebankEndpoint = generateEmpty();
    requests.forEach(function (req) {

      mountebankEndpoint.predicates.push({
        equals: {
          method: req.method,
          path: pathFromUrl(req.url),
          headers: req.headers,
        }
      });

      var lastExchange = req.getLastExchange();
      mountebankEndpoint.responses.push(generateResponse(lastExchange));

    });
    return JSON.stringify(mountebankEndpoint, null, "  ");
  }

};

MountebankGenerator.identifier = "net.ryanmccuaig.PawExtensions.MountebankGenerator";
MountebankGenerator.title = "Mountebank (http://www.mbtest.org)";
registerCodeGenerator(MountebankGenerator);
