import { Robots } from '../state';

const LOCAL_STORAGE_KEY = 'robot-factory-app';

export default class AppLocalStorage {
  public _storage = window.localStorage;

  public setList(robots?: Robots): void {
    if (robots) {
      this._storage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(robots));
    }
  }

  public getList(): Robots[] {
    const storedParams = this._storage.getItem(LOCAL_STORAGE_KEY);
    if (storedParams !== null) {
      return JSON.parse(storedParams);
    }

    return [];
  }
}
