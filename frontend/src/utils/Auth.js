class Auth {
    constructor({baseUrl}) {
        this._address = baseUrl;
    }

    register(data) {
        return fetch(`${this._address}/signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
    })
    .then(this._checkResponse);
    }

    authorize(data) {
        return fetch(`${this._address}/signin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
        .then(this._checkResponse)
        .then(data => {
          if (data.token){
            return data;
          }
        })
      }

      getContent(token) {
        return fetch(`${this._address}/users/me`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                authorization: `${token}`,
            },
            // credentials: 'include',
        })
        .then(this._checkResponse)
    }

    _checkResponse(res) {
        console.log(res.message, res.status);
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}: ${res.message}`);
    }
}

const auth = new Auth({
    baseUrl: 'http://localhost:3000',
});

export default auth;
