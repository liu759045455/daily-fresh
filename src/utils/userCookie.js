import Cookies from 'js-cookie';

/**
 *
 * @param {Object} info 用户信息
 */
export function setCookies(info) {
  const arr = Object.entries(info);
  for (let i = 0; i < arr.length; i += 1) {
    Cookies.set(arr[i][0], arr[i][1]);
  }
  return true;
}

/**
 * 获取用户cookie信息
 */
export function getUserCookies() {
  return {
    username: Cookies.get('username'),
    appkey: Cookies.get('appkey'),
    role: Cookies.get('role'),
    emali: Cookies.get('emali'),
  };
}

/**
 * 移除Cookie
 */
export function removeUserCookies() {
  Cookies.remove('username');
  Cookies.remove('appkey');
  Cookies.remove('role');
  Cookies.remove('emali');
  return true;
}
