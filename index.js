var findit = require('findit');
var Zip = require('adm-zip');
var path = require('path');

module.exports.ZipDir = ZipDir;
module.exports.UnzipDir = UnzipDir;

function ZipDir (pathToCompress, pathToWriteZip, callback) {
  if (!(this instanceof ZipDir)) return new ZipDir(pathToCompress, pathToWriteZip);

  if (typeof pathToCompress !== 'string') return;
  if (typeof pathToWriteZip !== 'string') return;
  if (typeof callback !== 'function') callback = function noop () {}

  
  var zip = new Zip();
  var finder = findit(pathToCompress);

  function removeInitialSubstring (base) {
    return function (file) {
      return file.slice(
        base.length + 1,
        file.indexOf(path.basename(file)));
    }
  }

  var removeBase = removeInitialSubstring(pathToCompress);
  
  finder.on('directory', function (dir, stat, stop) {
    var base = path.basename(dir);
    if (base === '.git' || base === 'node_modules') stop()
    else return
  });
   
  finder.on('file', function (file, stat) {
    if (path.basename(file) === '.DS_Store') return;
    zip.addLocalFile(file, removeBase(file));
  });

  finder.on( 'error', function ( error ) {
    callback( error );
  } )

  finder.on('end', function () {
    zip.writeZip(pathToWriteZip);
    console.log( 'done' )
    callback( null, pathToWriteZip );
  });

}

function UnzipDir (pathToUncompress, pathToWrite) {
  if (!(this instanceof UnzipDir)) return new UnzipDir(pathToUncompress, pathToWrite);
  var zip = new Zip(pathToUncompress);
  zip.extractAllTo(pathToWrite)
}
