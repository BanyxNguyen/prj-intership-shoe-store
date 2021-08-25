import _ from 'lodash';
import {ValidationInput} from '../models';

const regexEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const switchValidation = (data: string, validation: ValidationInput) => {
  const {name, notify} = validation;
  switch (name) {
    case 'noEmpty': {
      if (_.isEmpty(data)) return notify ? notify : 'Value is not empty';
      break;
    }
    case 'email': {
      const re = regexEmail;
      const check = re.test(String(data).toLowerCase().trim());
      if (!check) return notify ? notify : 'Value is not Email';
      break;
    }
    case 'regex': {
      const value = _.get(validation, 'value', '');
      if (_.isRegExp(value)) {
        const check = value.test(String(data).toLowerCase().trim());
        if (check) return notify ? notify : 'Value is not equal';
      }
      break;
    }
    case 'minLength': {
      const value = _.get(validation, 'value', 0);
      if (data.length < value) return notify ? notify : `String must belong than ${value}`;
      break;
    }
    case 'maxLength': {
      const value = _.get(validation, 'value', 50);
      if (data.length > value) return notify ? notify : `String must be less than ${value}`;
      break;
    }
    default: {
      return '';
    }
  }
  return '';
};

export const checkValidation = (data: string, validations: ValidationInput[] = []) => {
  for (const validation of validations) {
    const result = switchValidation(data, validation);
    if (!_.isEmpty(result)) return result;
  }
  return '';
};
