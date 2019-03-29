import { toast } from 'mdbreact';

/**
 * A utility that handles form-related functions.
 */
export class FormValidationService {

  /**
   * Checks if the form is valid.
   *
   * @param {*} errors Form errors.
   */
  static isValid(errors: Object) {
    let valid = true;

    Object.values(errors).forEach((val: any) => {
      val.length > 0 && (valid = false);
    });

    return valid;
  }

  /**
   * Called by a 'handleChange()' to get the new value of a form field. Calls FormHandler.validateField to check for
   * errors on the new value.
   *
   * @param {*} ev Event object.
   * @param {*} formErrors Form state errors.
   * @returns An object containing the new value and errors that is formatted for 'this.setState()'.
   */
  static getChanges(ev, formErrors: Object) {
    const { name, value } = ev.target;
    const errors = { ...formErrors };
    errors[name] = this.validateField(name, value);

    return { [name]: value, errors };
  }

  /**
   * Validates the value of a given form field.
   *
   * @param {string} field Form field.
   * @param {string} value Form field's value.
   */
  static validateField(field: string, value: string): string {
    let isValid = true;
    let errorMessage = '';

    switch (field) {
      case 'email':
        isValid = !!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        errorMessage = isValid ? '' : 'Invalid email format';
        break;
      case 'password':
        isValid = value.length >= 6;
        errorMessage = isValid ? '' : 'Password is too short';
        break;
      case 'firstName':
        isValid = value.length >= 3;
        errorMessage = isValid ? '' : 'Minimum of 3 characters';
        break;
      case 'lastName':
      case 'text':
        isValid = value.length >= 2;
        errorMessage = isValid ? '' : 'Minimum of 2 characters';
        break;
      case 'title':
      case 'image':
        isValid = value.length >= 1;
        errorMessage = isValid ? '' : 'Minimum of 1 character';
        break;
      default:
        break;
    }

    return errorMessage;
  }


  /**
   * Displays all the form errors as a notification.
   *
   * @param {*} errors Form errors.
   */
  static displayErrors(errors: Object) {
    for (const key in errors) {
      if (errors[key].length > 0) {
        toast.error(errors[key]);
      }
    }
  }
}
