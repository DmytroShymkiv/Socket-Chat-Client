import axios from "axios";

import { handleError, setToken, getToken } from "../utils";

class AuthService {
  BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

  loadUser(){
    const url = `${this.BASE_URL}/find`;
    return handleError(async () => {
      const response = await axios.get(url, {
        headers: {
          Authorization: getToken(),
        },
      });
      return response.data;
    });
  }

  createUser(user) {
    const url = `${this.BASE_URL}/register/secret`;
    return this._postUser(url, user);
  }

  loginUser(secretKey) {
    const url = `${this.BASE_URL}/login/secret`;
    return this._postUser(url, secretKey);
  }

  _postUser(url, body) {
    return handleError(async () => {
      const response = await axios.post(url, body, {
        headers: {
          Authorization: getToken(),
        },
      });
      setToken(response.data.token);
      return true;
    });
  }

  checkEmail(email) {
    const url = `${this.BASE_URL}/register`;
    return this._sendSecret(url, { email });
  }

  loginAuthorization({ email, password }) {
    const url = `${this.BASE_URL}/login`;
    return this._sendSecret(url, { email, password });
  }

  _sendSecret(url, body) {
    return handleError(async () => {
      const response = await axios.post(url, body);
      setToken(response.data.token);
      return true;
    });
  }
}

export default new AuthService();
