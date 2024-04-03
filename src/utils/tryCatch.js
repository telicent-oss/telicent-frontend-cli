const tryCatch = (work, success, failure) => {
  try {
    work();
  } catch (error) {
    return failure;
  }
  return success;
};

export default tryCatch;
