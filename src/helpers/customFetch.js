// Втроенный интерсептор, в реквестах это токен, в респонсах это
// перенаправление на строницу логина если ответ от сервера "401 Неавторизован"

// получаем доступ к хранилищу, нам нужен токен
import {store} from '../store/Store';

// получаем доступ к роутеру, нам нужно перенаправлять на строницу логина
// всякий раз как в ответ на запрос фетча приходит статус 401

import {router} from '../router/router';

window.fetch = (function (originalFetch) {
  return function customFetch(req) {
    const customRequest = Array.prototype.slice.call(arguments);
    // добавляем кастомный хедер во все запросы
    if (customRequest[1]) {
      if (customRequest[1].hasOwnProperty('headers')) {
        customRequest[1].headers.append('Authorization', `JWT ${store.getters.token}`);
        customRequest[1].headers.append('Content-Type', 'application/json');
      } else {
        customRequest[1].headers = new Headers({
          'Authorization': `JWT ${store.getters.token}`,
          'Content-Type': 'application/json'
        });
      }
    } else {
      customRequest[1] = {};
      customRequest[1].headers = new Headers({
        'Authorization': `JWT ${store.getters.token}`,
        'Content-Type': 'application/json'
      });
    }

    const result = originalFetch.apply(this, customRequest);
    return new Promise((resolve, reject) => {
      result.then((res) => {
        if (res.status === 401) {
          router.push({name: 'login'});
          store.commit('SERVER_AUTHORIZE_RESPONSE', false);
          reject(new Error('Ошибка доступа к API. Проверьте авторизацию!'));
        } else {
          store.commit('SERVER_AUTHORIZE_RESPONSE', true);
          resolve(res);
        }
      });
    })
  };
})(fetch);
