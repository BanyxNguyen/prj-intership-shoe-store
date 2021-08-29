import {ValidationInput} from '../../models';

export const valNoEmpty: ValidationInput[] = [
  {
    name: 'noEmpty',
  },
];

export const valUsername: ValidationInput[] = [
  {
    name: 'noEmpty',
  },
  {
    name: 'email',
  },
];

export const valPassword: ValidationInput[] = [
  {
    name: 'noEmpty',
  },
  {
    name: 'minLength',
    value: 6,
  },
  {
    name: 'regex',
    value: /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!*@#$%^&+=]).*$/,
    notify: 'Password invalid. Exp: @Example123',
  },
  // {
  //   name: 'regex',
  //   value: /[a-z]/g,
  //   notify: `Password requires lower 'a'-'z'`,
  // },
  // {
  //   name: 'regex',
  //   value: /[A-Z]/g,
  //   notify: `Password requires upper 'A'-'Z'`,
  // },
  // {
  //   name: 'regex',
  //   value: /[0-9]/g,
  //   notify: `Password requires digit '0'-'9'`,
  // },
  // {
  //   name: 'regex',
  //   value: /[@#$%^&*!_()-+{}~<>,.|\\\/\s]/g,
  //   notify: 'Password requires non alphanumeric',
  // },
];
