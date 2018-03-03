// DO NOT MODIFY THIS FILE

// This will load all *.js resolvers and assign them to one literal to be assembled by graphql-tools
const path = require('path');
const fs = require('fs');

let resolvers = fs
  .readdirSync(__dirname)
  .filter(fileName => {
    return fileName.indexOf('.js') > -1 && fileName.indexOf('index.js') < 0;
  })
  .map(resolverFile => {
    return {
      moduleName: resolverFile.replace('.js', ''),
      moduleExport: require(`./${resolverFile}`)
    };
  })
  .reduce((prevValue, currentValue, currentIndex) => {
    let newValue = Object.assign({}, prevValue);
    newValue[currentValue.moduleName] = currentValue.moduleExport;
    return newValue;
  }, {});

module.exports = resolvers;
