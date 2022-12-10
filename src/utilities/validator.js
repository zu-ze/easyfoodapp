const address = 'http://localhost'

export const minMaxValidator = (value, min, max) => {

}

export const emailValidator = (email) => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return 'Email cannot be empty.';
  if (!re.test(email)) return 'Ooops! We need a valid email address.';

  return '';
};

export const passwordValidator = (password) => {
  if (!password || password.length <= 0) return 'Password cannot be empty.';

  return '';
};

export const nameValidator = (name) => {
  if (!name || name.length <= 0) return 'Field cannot be empty.';

  return '';
};

export const confirmValidator = (value, test) => {
  if (!test || test.length <= 0) return 'Field cannot be empty.';
  if (value !== test) return 'Password does not match.'

  return '';
}
