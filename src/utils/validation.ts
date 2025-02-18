const validationSchema = {
  username: {
    required: { value: true, message: 'Username is required' },
    maxLength: { value: 70, message: 'Minimum length 70 characters' },
  },
  password: {
    required: { value: true, message: 'Password is required' },
    minLength: { value: 8, message: 'Minimum length 8 characters' },
    pattern: {
      value: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      message: 'Must include at least one number and symbol',
    },
  },
  confirmPassword: (password: string) => ({
    required: { value: true, message: 'Password confirmation is required' },
    minLength: { value: 8, message: 'Minimum length 8 characters' },
    pattern: {
      value: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      message: 'Must include at least one number and symbol',
    },
    validate: (value: string) =>
      value === password || 'Passwords are different',
  }),
  email: {
    required: { value: true, message: 'Email is required' },
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Please enter a valid email',
    },
  },
  required: {
    required: { value: true, message: 'Field is required' },
  },
  requiredField: (fieldName: string) => ({
    required: { value: true, message: `${fieldName} is required` },
  }),
  year: {
    required: { value: true, message: 'Field is required' },
    min: { value: 1900, message: 'Minimum film year is 1900' },
    max: {
      value: new Date().getFullYear(),
      message: 'Maximum film year is current year',
    },
  },
  format: {
    required: { value: true, message: 'Field is required' },
    validate: (value: string) =>
      ['VHS', 'DVD', 'Blu-Ray'].includes(value) ||
      'Invalid format type, must be VHS, DVD or Blu-Ray',
  },
};

export default validationSchema;
