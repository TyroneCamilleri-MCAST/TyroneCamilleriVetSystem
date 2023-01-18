export class User {
  private _username: string;
  private _jwtToken: string;
  private _role: string;

  constructor(username: string, jwtToken: string, role: string) {
    this._username = username;
    this._jwtToken = jwtToken;
    this._role = role;
  }

  public get username(): string {
    return this._username;
  }

  public set username(username: string) {
    this._username = username;
  }

  public get jwtToken(): string {
    return this._jwtToken;
  }

  public set jwtToken(jwtToken: string) {
    this._jwtToken = jwtToken;
  }

  public get role(): string {
    return this._role;
  }

  public set role(role: string) {
    this._role = role;
  }
}
