async function findAndSaveUser(Users) {
  // 생략 Promise 객체가 응답한다.
}
/* 비동기처리 방법 1 */
findAndSaveUser().then(() => { /* 생략 */ });
// 또는
async function other() {
  const result = await findAndSaveUser();
}
