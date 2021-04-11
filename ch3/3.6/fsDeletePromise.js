const fs = require('fs').promises;

const dir_path = 'ch3/3.6/folder/';
const file_path = dir_path + '/newfile.js';


fs.readdir( dir_path )
  .then(  ( dir ) => {
    console.log( dir );

    /**
     * async & await 가 없어도 문제가 없는걸까???
     */
    for (const file of dir ) {
      fs.unlink( dir_path + file );
    }  

    console.log( 'remove All Files....' );
  })
  .then( () => {
    return fs.rmdir( dir_path );
  })
  .catch( err => {
    console.error( err );
  });


  return;



fs.readdir('./folder')
  .then((dir) => {
    console.log('폴더 내용 확인', dir);
    return fs.unlink('./folder/newFile.js');
  })
  .then(() => {
    console.log('파일 삭제 성공');
    return fs.rmdir('./folder');
  })
  .then(() => {
    console.log('폴더 삭제 성공');
  })
  .catch((err) => {
    console.error(err);
  });
