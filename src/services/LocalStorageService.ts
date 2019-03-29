import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const lsKeys = {
  token: publicRuntimeConfig.localStorage.token,
  user: publicRuntimeConfig.localStorage.user,
  viewCrumb: publicRuntimeConfig.localStorage.viewCrumb,
  cmsCrumb: publicRuntimeConfig.localStorage.cmsCrumb,
  subscription: publicRuntimeConfig.localStorage.subscription
};

/**
 * A utility that handles localStorage data.
 */
export class LocalStorageService {
  /**
   * Sets the value for the specified key.
   *
   * @param {string} key Local storage key.
   * @param {*} data An object containing a view crumb data.
   */
  static setItem(key, data) {
    const value = typeof data === 'object' ? JSON.stringify(data) : data;
    localStorage.setItem(key, value);
  }

  /**
   * Returns the value for 'el.viewCrumb' key.
   *
   * @returns JSON parsed value.
   */
  static getItem(key) {
    if (key === lsKeys.token) {
      return localStorage.getItem(key);
    } else {
      return JSON.parse(localStorage.getItem(key));
    }
  }

  /**
   * Removes a localStorage item. If key is undefined then it will clear all localStorage items.
   *
   * @param {string} key Local storage key.
   */
  static removeItem(key) {
    if (lsKeys[key]) {
      localStorage.removeItem(lsKeys[key]);
    } else {
      localStorage.clear();
    }
  }

  static isAvailable() {
    return typeof localStorage !== 'undefined';
  }
}