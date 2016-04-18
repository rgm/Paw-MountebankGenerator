var MountebankGenerator = function () {

  this.generate = function (context, requests, options) {
    var clientCode = "testcode";
    return clientCode;
  }

};

MountebankGenerator.identifier = "net.ryanmccuaig.PawExtensions.MountebankGenerator";
MountebankGenerator.title = "Mountebank Generator";
registerCodeGenerator(MountebankGenerator);
