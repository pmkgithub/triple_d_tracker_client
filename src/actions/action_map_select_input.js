export const SET_MAP_SELECT_INPUT_TYPE = 'SET_MAP_SELECT_INPUT_TYPE';
export const setMapSelectInputType = (mapSelectInputType) => {
  console.log('action setMapSelectInputType mapSelectInputType = ', mapSelectInputType);
  return {
    type: SET_MAP_SELECT_INPUT_TYPE,
    mapSelectInputType
  }
};