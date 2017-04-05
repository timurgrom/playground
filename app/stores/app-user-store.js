import { observable, action } from 'mobx';

import { AuthApi }  from 'core/api/auth';

class AppUserStore {
  @observable userData = null;

  constructor() {
    this.login  = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  @action login(data) {
    return AuthApi.login(data)
      .then((res) => this.setUserData(res));
  }

  @action logout() {
    this.userData = null;
  }

  @action setUserData(res) {
    this.userData = res.user;
  }
}

export const appUserStore = new AppUserStore();
