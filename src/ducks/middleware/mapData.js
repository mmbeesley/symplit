const mapData = () => next => action => {
  if (!action.payload || !Array.isArray(action.payload.data)) {
    return next(action);
  }

  const map = {};
  action.payload.data.forEach((item, i) => {
    map[item.id] = i;
  });
  action.payload.dataMap = map;
  return next(action);
};

export default mapData;
