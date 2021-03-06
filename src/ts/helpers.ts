const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const nodeListToArray = (list: NodeList) => {
  return Array.prototype.slice.call(list);
};

const isTouch = () => {
  return (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));
};

export {
  randomNumber,
  nodeListToArray,
  isTouch,
};
