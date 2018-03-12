const fs = require('fs');
const path = require('path');

/**
 * For a given directory, assembles all .js files as one literal. The key will be the filename.
 * @param {String} directory - A directory to traverse 
 */
let assembleResolvers = directory => fs
  .readdirSync(path.resolve(directory))
  .filter(fileOrDirName => {
    let stats = fs.lstatSync(
      path.resolve(directory, `./${fileOrDirName}`)
    );
    // Only non-index.js files
    return (
      stats.isFile() &&
      fileOrDirName.indexOf('.js') > -1 &&
      fileOrDirName.indexOf('index.js') < 0
    );
  })
  .map(resolverFile => {
    return {
      moduleName: resolverFile.replace('.js', ''),
      moduleExport: require(`${directory}/${resolverFile}`)
    };
  })
  .reduce((prevValue, currentValue, currentIndex) => {
    let newValue = Object.assign({}, prevValue);
    newValue[currentValue.moduleName] = currentValue.moduleExport;
    return newValue;
  }, {});

module.exports = assembleResolvers;
