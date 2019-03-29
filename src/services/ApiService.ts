import getConfig from 'next/config';
import fetch from 'isomorphic-unfetch';
import { toast } from 'mdbreact';
import ResponseService from './ResponseService';

const { publicRuntimeConfig } = getConfig();

export const apiKeys = {
  users: publicRuntimeConfig.api.users,
  auth: publicRuntimeConfig.api.auth,
  authMgmt: publicRuntimeConfig.api.authmgmt,
  subjects: publicRuntimeConfig.api.subjects,
  courses: publicRuntimeConfig.api.courses,
  modules: publicRuntimeConfig.api.modules,
  subscription: publicRuntimeConfig.api.subscription
};

/**
 * A utility that handles API-related functions.
 */
export class ApiService {
  /**
   * Calls the API to fetch some data.
   *
   * @param {*} req API request data.
   */
  static async fetchData(req) {
    try {
      // construct path accordingly
      const path = this.constructPath(req.path, req.id, req.params);
      const init = this.createInitData(req.method, req.body, req.token);
      const resp = await fetch(path, init);
      const json = await resp.json();
      return json[req.property] ? new ResponseService(true, json) : new ResponseService(false, json.message);
    } catch (error) {
      return new ResponseService(false, error.message);
    }
  }

  /**
   * Updates the path accordingly by appending the given identifier and query parameters to the original path.
   *
   * @param {string} path Original path.
   * @param {string} id Identifier.
   * @param {*} params Query parameters.
   */
  static constructPath(path, id, params) {
    let finalPath = path;

    if (id) {
      finalPath = finalPath + '/' + id;
    }

    if (params) {
      let query = '?';

      params.forEach(param => {
        query = query + param.param + '=' + param.value;
      });

      finalPath = finalPath + query;
    }

    return finalPath;
  }

  /**
   * Creates an init data based on the given information.
   *
   * @param {string} method Request method (GET, POST, DEL, etc.).
   * @param {*} data Request body in JSON format (will be stringified).
   * @param {string} token If set, adds an 'Authorization' header.
   */
  static createInitData(method: string, data: any, token: string): RequestInit {
    const init = {
      method: method,
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': undefined 
      },
      body: null
    };

    if (data) {
      delete data.id;
      init.body = JSON.stringify(data);
    }

    if (token) {
      init.headers.Authorization = token;
    }

    return init;
  }

  /**
   * Handles the processing in a catch block.
   *
   * Logs the error to the console, notify the user, and returns the default value.
   *
   * @param {*} error Error object.
   * @param {*} defaultValue Default value of the calling function.
   */
  static handleCatch(error, defaultValue) {
    console.error(error);
    toast.error('Oops! Something went wrong.');
    return defaultValue;
  }
}