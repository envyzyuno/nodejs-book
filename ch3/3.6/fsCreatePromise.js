const fs = require('fs').promises;
const constants = require('fs').constants;

const dir_path = 'ch3/3.6/folder';
const file_path1 = dir_path + '/file.js';
const file_path2 = dir_path + '/newfile.js';

/**
 * F_OK 파일 존재여부
 * R_OK 읽기 권한여부
 * W_OK 쓰기 권한 여부
 */
 const mode =  constants.F_OK | constants.R_OK | constants.W_OK;


/** 폴더가 존재하면 not throw, 폴더가 존재하지 않으면 throw */
 fs.access( dir_path, mode )
   .then( () => Promise.reject('이미 폴더 있음') ) /* 무조건 throw 시켜 로깅 */
   .catch( (err) => {
      if( err.code === 'ENOENT' ){
        console.log('폴더 없음');
        return fs.mkdir( dir_path );
      }
      return Promise.reject( err );
   })
   .then( () => {
      console.log('폴더 만들기 성공');
      return fs.open( file_path1, 'w' ); /** 초기 파일 생성 */
   })
   .then( (fh) => {
    console.log('빈 파일 만들기 성공', fh );
    return fs.rename( file_path1, file_path2 );
   })
   .then( () => {
      console.log('이름 바꾸기 성공');
   })
   .catch( (err) => {
      console.error(err);
   })

   ;

