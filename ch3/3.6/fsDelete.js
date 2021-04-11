const fs = require('fs');

const dir_path = 'ch3/3.6/folder';
const file_path = dir_path + '/newfile.js';

const callback = ( err, dir ) => {
  if( err ) { throw err; }
  console.log('폴더내용 확인');

  /** 파일 삭제 파일 이 존재하지 않으면 오류 발생  */
  fs.unlink( file_path, (err) => {
    if (err) { throw err; }
    console.log('파일 삭제 성공');

    fs.rmdir( dir_path , (err) => {
      if (err) { throw err; }
      console.log('폴더 삭제 성공');
    });

  });
};


fs.readdir( dir_path , callback );
