import { toast } from 'mdbreact';
import moment from 'moment';
import decode from 'jwt-decode';

import { ApiService, apiKeys } from './ApiService';

/**
 * A service for Authentication API related functions.
 */
export class AuthService {
  /**
   * Sends a request for various authentication services:
   *  - registering a new user
   *  - requesting for a password reset
   *  - resetting password
   *
   * @param {*} data Request form details.
   * @param {string} apiType API request type: 'users' or 'authMgmt'.
   * @param {string} buttonText Button text value.
   * @returns Request results.
   */
  static async request(data, apiType, buttonText) {
    // initialize return value
    const returnValue = {
      isSubmitted: true,
      isSubmitting: false,
      buttonText: buttonText
    };

    try {
      // fetch data
      const req = {
        method: 'POST',
        path: apiKeys[apiType],
        property: 'createdAt',
        body: data
      };
      const res = await ApiService.fetchData(req);

      // process response
      if (!res.isSuccess) {
        returnValue.isSubmitted = false;
        toast.error(res.data);
      }

      return returnValue;
    } catch (error) {
      returnValue.isSubmitted = false;
      return ApiService.handleCatch(error, returnValue);
    }
  }

  /**
   * Checks if the user is authenticated.
   *
   * @returns {boolean} True, if authenticated. Otherwise, false.
   */
  static isAuthenticated(token) {
    if (!token) {
      return false;
    }

    try {
      const { exp } = decode(token);

      if (!moment.unix(exp).isValid() || exp < moment().unix()) {
        return false;
      }
    } catch (e) {
      return false;
    }

    return true;
  }
}
