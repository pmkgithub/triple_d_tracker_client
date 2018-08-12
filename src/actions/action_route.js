export const SET_CURRENT_ROUTE = 'SET_CURRENT_ROUTE';
export const setCurrentRoute = (route) => {
  return {
    type: SET_CURRENT_ROUTE,
    route
  }
};