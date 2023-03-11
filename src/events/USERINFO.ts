class UserInfo {
  public static DB_USER_INFO: string;
  user: any = {
    '123': {
      name: 'John',
    },
  };
  constructor(user: any) {
    this.user = user;
  }
  name(thread: string): string {
    return this.user[thread].name;
  }
}

class User extends UserInfo {
  public user: any;
  constructor(user: any) {
    super(user);
    this.user = user;
  }
}
