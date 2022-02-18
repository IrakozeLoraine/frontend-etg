const errorClass = (error) => {
  return error.length === 0 ? '' : 'has-error';
};

export { errorClass };
