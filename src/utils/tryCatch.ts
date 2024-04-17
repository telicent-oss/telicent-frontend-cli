const tryCatch = (work:Function, success:any, failure:any) => {
  try {
    work();
  } catch (error) {
    return failure;
  }
  return success;
};

export default tryCatch;
