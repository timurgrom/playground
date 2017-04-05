const PREFIX = 'fed-bootcamp-';

export class Storage {
  static _storage = window.localStorage;

  static get(key) {
    const value = this._storage[PREFIX + key];

    return JSON.parse(value);
  }

  static set(key, value) {
    this._storage[PREFIX + key] = JSON.stringify(value);
  }

  static remove(key) {
    this._storage.removeItem(PREFIX + key);
  }
}
