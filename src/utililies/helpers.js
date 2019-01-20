export const reduxInsertData = (data, dataMap, payload) => {
  data[dataMap[payload.id]] = {
    data: payload.data,
    dataMap: payload.dataMap
  };
  return { data, dataMap };
};

export const reduxInsertTieredData = (data, dataMap, payload) => {
  const newIndex = data.length || 0;
  dataMap[payload.id] = newIndex;
  data.push({ data: payload.data, dataMap: payload.dataMap });
  return { data, dataMap };
};

export const reduxPostHelper = (data, dataMap, parentId, body) => {
  const parent = data[dataMap[parentId]];
  parent.data.push(body);
  return { id: parentId, data: parent.data };
};

export const reduxPutHelper = (data, dataMap, parentId, childId, body) => {
  const parent = data[dataMap[parentId]];
  parent.data.splice(parent.dataMap[childId], body, 1);
  return { id: parentId, data: parent.data };
};

export const reduxDeleteHelper = (data, dataMap, parentId, childId) => {
  const parent = data[dataMap[parentId]];
  parent.data.splice(parent.dataMap[childId], 1);
  return { id: parentId, data: parent.data };
};

export default {
  reduxInsertData,
  reduxInsertTieredData,
  reduxPostHelper,
  reduxPutHelper,
  reduxDeleteHelper
};
