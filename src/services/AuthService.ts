import axios from "axios";
import { IError } from "../types/error.type";
import { IUser, IUserBody, ILoginBody } from "../types/user.types";

import { handleError, setToken, getToken, removeToken } from "../utils";

type sendSecretType = { email: string } | ILoginBody;
type postUserType = { secretKey: string } | IUserBody;

class AuthService {
  BASE_URL = "http://localhost:3000";

  public async loadUser(): Promise<IUser | null> {
    const url = `${this.BASE_URL}/find`;
    const response = await handleError(async () => {
      const response = await axios.get(url, {
        headers: {
          Authorization: getToken(),
        },
      });
      return response.data;
    });

    if (response.errors) return null;
    return response;
  }

  public createUser(user: IUserBody): Promise<boolean | IError> {
    const url = `${this.BASE_URL}/register/secret`;
    return this.postUser(url, user);
  }

  public loginUser(secretKey: string): Promise<boolean | IError> {
    const url = `${this.BASE_URL}/login/secret`;
    return this.postUser(url, { secretKey });
  }

  private postUser(url: string, body: postUserType) {
    return handleError(async () => {
      const response = await axios.post<any>(url, body, {
        headers: {
          Authorization: getToken(),
        },
      });
      setToken(response.data.token);
      return true;
    });
  }

  public checkEmail(email: string): Promise<boolean | IError> {
    const url = `${this.BASE_URL}/register`;
    return this.sendSecret(url, { email });
  }

  public loginAuthorization({
    email,
    password,
  }: ILoginBody): Promise<boolean | IError> {
    const url = `${this.BASE_URL}/login`;
    return this.sendSecret(url, { email, password });
  }

  logout() {
    removeToken();
  }

  private sendSecret(url: string, body: sendSecretType) {
    return handleError(async () => {
      const response = await axios.post<any>(url, body);
      setToken(response.data.token);
      return true;
    });
  }
}

export default new AuthService();
