class Api {
  constructor({baseUrl, token}) {
      this._address = baseUrl;
      this._token = token;
  }

  getInitialCards() {
    return fetch(`${this._address}/cards`, {
      method: 'GET',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkResponse);
  }

  getUserInfo() {
    return fetch(`${this._address}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
    })
    .then(this._checkResponse);
  }

  patchUserInfo(data) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    .then(this._checkResponse);
  }

  postNewCard(data) {
    return fetch(`${this._address}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    .then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._address}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      },
    })
    .then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (!isLiked) {
      return this._putCardLike(cardId)
    } else {
      return this._deleteCardLike(cardId);
    }
  }

  _putCardLike(cardId) {
    return fetch(`${this._address}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
      },
    })
    .then(this._checkResponse);
  }

  _deleteCardLike(cardId) {
    return fetch(`${this._address}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      },
    })
    .then(this._checkResponse);
 }

 patchUserAvatar(data) {
  return fetch(`${this._address}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: this._token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })
  .then(this._checkResponse);
 }

 _checkResponse(res) {
  if (res.ok) {
      return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}: ${res.message}`);
}
}

const api = new Api({
  baseUrl: 'https://api.nutag.nomoredomains.club',
  token: `Bearer ${localStorage.getItem('jwt')}`
});

export default api;
