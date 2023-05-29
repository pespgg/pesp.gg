export const filterByProps = (arr = [], props = []) => {
  return arr.map((a) => {
    const filtered = {};
    props.forEach((prop) => {
      filtered[prop] = a[prop];
    });
    return filtered;
  });
};
