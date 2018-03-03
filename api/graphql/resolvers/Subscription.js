// DO NOT MODIFY THIS FILE
// Loads mutation resolvers by convention by reading the ./mutations subdirectory
// and will call each mutation by the module's filename

const fs = require('fs');
const path = require('path');

let Mutation = fs
  .readdirSync(path.resolve(__dirname, './subscriptions'))
  .filter(fileOrDirName => {
    // Future enhancement: folders? Or will that be too complicated?
    let stats = fs.lstatSync(
      path.resolve(__dirname, `./subscriptions/${fileOrDirName}`)
    );
    return (
      stats.isFile() &&
      fileOrDirName.indexOf('.js') > -1 &&
      fileOrDirName.indexOf('index.js') < 0
    );
  })
  .map(resolverFile => {
    return {
      moduleName: resolverFile.replace('.js', ''),
      moduleExport: require(`./subscriptions/${resolverFile}`)
    };
  })
  .reduce((prevValue, currentValue, currentIndex) => {
    let newValue = Object.assign({}, prevValue);
    newValue[currentValue.moduleName] = currentValue.moduleExport;
    return newValue;
  }, {});

module.exports = Mutation;
