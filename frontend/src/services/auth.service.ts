import AdapterService from "./adapter.service";

export default class AuthService extends AdapterService {
  constructor() {
    super();
  }

  async login(email: string, password: string) {
    try {
      return this.sendPostRequest("/auth/login", { email, password });
    } catch (error: any) {
      throw new Error("AuthService.login: " + error?.message);
    }
  }

  async register(
    name: string,
    email: string,
    password: string,
    password_confirmation: string
  ) {
    try {
      return this.sendPostRequest("/auth/register", {
        name,
        email,
        password,
        password_confirmation,
      });
    } catch (error: any) {
      throw new Error("AuthService.register: " + error?.message);
    }
  }

  async logout() {
    try {
      return this.sendPostRequest("/auth/logout");
    } catch (error: any) {
      throw new Error("AuthService.logout: " + error?.message);
    }
  }
}
