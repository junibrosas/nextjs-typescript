/**
 * Holds information from an API response. When intialized this object should hold or accept the following information:
 * - isSuccess: a boolean indicating whehter the API call was successful or not
 * - data: an object containing API information
 *
 * Setting isSuccess is done as follows:
 * - true: when the target property is present from the API response
 * - false:
 *    (1) when the target property does not exist from the API response
 *    (2) when fetch falls to catch()
 *
 * Setting data is done as follows:
 * - any object:
 *    (1) when fetch is successful and target property exists the this is set with the json data
 *    (2) when fetch is successful but the target property exists (at this point an error object from API is expected)
 *        then this is set with the error message from the API
 *    (3) when fetch falls to catch() then this is set with Error object's message.
 */


// TODO: format if this should be called message instead of data
class ResponseService {
  public isSuccess = false;
  public data = undefined;

  /**
   * Initializes the object with the information provided.
   *
   * @param {boolean} isSuccess Either true or false.
   * @param {*} data Any API data.
   */
  constructor(isSuccess: boolean, data: any) {
    this.isSuccess = isSuccess;
    this.data = data;
  }
}

export default ResponseService;
