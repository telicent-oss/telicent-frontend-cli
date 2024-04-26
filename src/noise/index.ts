const noise:(...args: any[]) => void = (options) => {
  if (options.meow) {
    console.log('meow')
  } else {
    console.log('woof'); // default
  }
};

export default noise;
