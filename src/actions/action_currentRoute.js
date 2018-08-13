export const SET_CURRENT_ROUTE = 'SET_CURRENT_ROUTE';
export const setCurrentRoute = (currentRoute) => {
  return {
    type: SET_CURRENT_ROUTE,
    currentRoute
  }
};