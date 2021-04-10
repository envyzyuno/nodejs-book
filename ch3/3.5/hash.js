const crypto = require('crypto');


const plain = '비밀번호'
const plain2 = '다른비밀번호';

const base64 = crypto.createHash('sha512')
                    .update(plain)
                    .digest('base64');
const hex = crypto.createHash('sha512')    
                    .update(plain) 
                    .digest('hex');
const base64_2 = crypto.createHash('sha512')
                        .update(plain2) 
                        .digest('base64');
 
console.log('base64:',base64);
console.log('hex:',hex);  
console.log('base64_2:',base64_2);                     

