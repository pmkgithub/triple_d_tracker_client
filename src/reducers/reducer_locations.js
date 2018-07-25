import {
  FETCH_LOCATIONS_REQUEST,
  FETCH_LOCATIONS_SUCCESS,
  FETCH_LOCATIONS_ERROR,
  SET_LAT_LON_ZOOM_FOR_UI_LIST,
  SET_MAP_LAT_LON_CENTER,
  MAP_SINGLE_LOCATIONS_FROM_UI_LIST,
  MAP_ALL_LOCATIONS_FROM_UI_LIST,
  CLEAR_LOCATIONS_FROM_UI_LIST,
  CREATE_US_LOCATIONS_UI_LIST,
  CREATE_STATE_LOCATIONS_UI_LIST,
  SET_LOCATION_ID,
} from "../actions/action_locations";
import mapConfig from '../configs/mapConfig';
import stateNameToAbbr from '../configs/stateNameToAbbrConfig';

const initialState = {
  locationsBeenFetched: false,
  cachedLocations: [],
  // This visitedLocations for DEV b/c otherwise, each time app reloads,
  // I must "signin" a User to populate this field.
  // visitedLocations: ['5b3cfa5f8b3c33973279e8c1','5b3cfa5f8b3c33973279e8b6', '5b3cfa5f8b3c33973279e8a2'],
  // below for PRODUCTION...
  // visitedLocations: [],
  reviews: [{
    // "_id" : ObjectId("5b5794adac0149234d4ad6e6"),
    "locationId" : "5b3cfa5f8b3c33973279e839",
    "date" : "2018-07-01",
    "review" : "Sweet Stuff"
  },
    {
      // "_id" : ObjectId("5b5794cfac0149234d4ad6e7"),
      "locationId" : "5b3cfa5f8b3c33973279e8c1",
      "date" : "2018-07-02",
      "review" : "This ain't Jimmy John's."
    },
    {
      // "_id" : ObjectId("5b5794e2ac0149234d4ad6e8"),
      "locationId" : "5b3cfa5f8b3c33973279e8b6",
      "date" : "2018-07-03",
      "review" : "Darn good BBQ!"
    },
    {
      // "_id" : ObjectId("5b57951bac0149234d4ad6e9"),
      "locationId" : "5b3cfa5f8b3c33973279e7c1",
      "date" : "2018-07-16",
      "review" : "Zema?  Wasn't that a really bad drink form the 90's?"
    }],
  locationId: '',  // locationId of clicked Map Marker.
  displayedMapLocations: [],
  filteredListLocations: [],
  // default value set to US.
  uiListRecenterCoords: {
    lat: 37,
    lon: -96.5795,
    zoom: 4.1
  },
  // default values set to US lat, lon, zoom.
  mapCenterLat: mapConfig.US.lat,
  mapCenterLon: mapConfig.US.lon,
  mapZoom: mapConfig.US.zoom,
  isFetching: false,
  err: ""
};

export default (state=initialState, action) => {

  let lat, lon, zoom, usStateAbbr;

  switch (action.type) {

    case FETCH_LOCATIONS_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case FETCH_LOCATIONS_SUCCESS:
      // Fetched locations from API are "single source of truth" - all User's get this set of
      // locations from API.
      //
      // Different User's will see different "green" markers depending whether or not
      // they have personally visited / written a review a location.
      //
      // Visited locations are stored in the UserSchema and placed into Redux state
      // when the User signs-in.
      //
      // When locations fetched from API,
      // process fetched locations and set the "location.visited" to "true",
      // when a location's id is in the state.visitedLocations array.

      // // orig code - dont change
      // const fetchedLocations = action.locations;
      // const processedLocations = fetchedLocations.map((location) => {
      //   if (state.visitedLocations.indexOf(location._id) >= 0) {
      //     location.visited = true;
      //   }
      //   return location;
      // });

      // refact
      console.log('FETCH_LOCATIONS_SUCCESS action = ', action);
      const fetchedLocations = action.locations;

      const visitedLocations = action.reviews.map(review => {
        return review.locationId;
      });

      const processedLocations = fetchedLocations.map((location) => {
        if (visitedLocations.indexOf(location._id) >= 0) {
          location.visited = true;
          console.log('location match = ', location);
        }
        return location;
      });

      // Ray's refact
      // fetchedLocations.map(location => {
      //   action.reviews.includes(location._id);
      //
      // });

      return {
        ...state,
        locationsBeenFetched: true,
        cachedLocations: processedLocations,
        displayedMapLocations: processedLocations,
        filteredListLocations: processedLocations,
        isFetching: false,
        err: ""
      };

    case FETCH_LOCATIONS_ERROR:
      return {
        ...state,
        isFetching: false,
        err: action.err
      };

    // case SET_VISITED_LOCATIONS_REVIEWS_ON_SIGNIN:
    //   return {
    //     ...state,
    //     visitedLocations: action.visitedLocations,
    //     reviews: action.reviews
    //   };

    case SET_LAT_LON_ZOOM_FOR_UI_LIST:
      return {
        ...state,
        uiListRecenterCoords: action.uiListRecenterCoords
      };

    // on map onDragEnd, set the map's lat/lon.
    // on map zoom, set the map's lat/lon.
    case SET_MAP_LAT_LON_CENTER:

       lat = action.coords.lat;
       lon = action.coords.lng;

      return {
        ...state,
        mapCenterLat: lat,
        mapCenterLon: lon
      };

    case CLEAR_LOCATIONS_FROM_UI_LIST:
      return {
        ...state,
        mapCenterLat: mapConfig.US.lat,
        mapCenterLon: mapConfig.US.lon,
        mapZoom: mapConfig.US.zoom,
        displayedMapLocations: [],
        filteredListLocations: []
      };

    case CREATE_US_LOCATIONS_UI_LIST:
      return {
        ...state,
        displayedMapLocations: [...state.cachedLocations],
        filteredListLocations: [...state.cachedLocations],
        mapCenterLat: mapConfig.US.lat,
        mapCenterLon: mapConfig.US.lon,
        mapZoom: mapConfig.US.zoom,
      };

    case CREATE_STATE_LOCATIONS_UI_LIST:

      usStateAbbr = stateNameToAbbr[action.stateName];

      const locations = state.cachedLocations.filter((location) => {
        return location.state === usStateAbbr;
      });

      return {
        ...state,
        displayedMapLocations: [...locations],
        filteredListLocations: [...locations],
        mapCenterLat: mapConfig[usStateAbbr].lat,
        mapCenterLon: mapConfig[usStateAbbr].lon,
        mapZoom: mapConfig[usStateAbbr].zoom,
      };

    case MAP_SINGLE_LOCATIONS_FROM_UI_LIST:

      const location = state.cachedLocations.find(location => {
          return (location.name === action.singleLocationData.name)
        }
      );

      return {
        ...state,
        displayedMapLocations: [location],
        mapCenterLat: action.singleLocationData.lat,
        mapCenterLon: action.singleLocationData.lon,
        mapZoom: action.singleLocationData.zoom,
      };

    case MAP_ALL_LOCATIONS_FROM_UI_LIST:
      return {
        ...state,
        mapCenterLat: action.uiListRecenterCoords.lat,
        mapCenterLon: action.uiListRecenterCoords.lon,
        mapZoom: action.uiListRecenterCoords.zoom,
        displayedMapLocations: [...state.filteredListLocations],
      };

    // When User clicks a Map Maker, store the Location Id in Redux.
    // Location Id needed when User creates a Review.
    case SET_LOCATION_ID:
      return {
        ...state,
        locationId: action.locationId,
      };

    default:
      return state;
  }
}