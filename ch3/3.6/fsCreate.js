const fs = require('fs');

const dir_path = 'ch3/3.6/folder';
const file_path1 = dir_path + '/file.js';
const file_path2 = dir_path + '/newfile.js';

/** 콜백 함수  */
const callBack = ( err ) => {
  /** err 는 boolean 은 아니나 if() 로 존재여부 체크가 가능하다. */

  if( ! err ){ 
    console.log('이미 폴더 있음');
    return;
  }
  if (err.code !== 'ENOENT') {
    throw err;
  }  

  console.log('폴더 없음');

  fs.mkdir( dir_path , (err) => { 
    if( err ) { throw err; }
    console.log('폴더 만들기 성공');
    
    /**
     * w: 쓰기
     * r: 읽기
     */
    fs.open( file_path1, 'w', ( err, fd) =>{
      if (err) { throw err; }
      console.log('빈 파일 만들기 성공', fd);
      fs.rename( file_path1, file_path2, (err) => {
        if (err) { throw err; }
        console.log('이름 바꾸기 성공');
      });

    });

  });


};

/**
 * F_OK 파일 존재여부
 * R_OK 읽기 권한여부
 * W_OK 쓰기 권한 여부
 */
const mode =  fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK;

fs.access( dir_path , mode , callBack );
