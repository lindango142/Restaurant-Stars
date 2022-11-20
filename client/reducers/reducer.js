import * as types from '../constants/actionTypes';

const initialState = {
  id: 0,
  name: '',
  address: '',
  restaurantList: [],
  status: 'not visited',
  review: '',
  update: [],
  remove: {},
  markers: [],
  synced: true
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_RESTAURANT: {
      // return updated state
      return {
        ...state,
        restaurantList: state.restaurantList.concat({
          id: state.id + 1,
          name: action.payload.name,
          address: action.payload.address,
          status: state.status,
          review: state.review,
          marks: action.payload.mark
        }),
        id: state.id + 1,
        markers: state.markers.concat(action.payload.mark)
      };
    };

    case types.CHANGE_STATUS: {
      let update = [...state.update];
      const newRestaurantList = [...state.restaurantList];
      for (let i = 0; i < newRestaurantList.length; i++) {
        if (newRestaurantList[i].name === action.payload.name) {
          newRestaurantList[i].status = action.payload.status;
          update.push(newRestaurantList[i])
        }
      }
      return {
        ...state,
        restaurantList: newRestaurantList,
        update: update,
        synced: false
      };
    };
    
    case types.UPDATE_REVIEW: {
      let update = [...state.update];
      const newRestaurantList = [...state.restaurantList];
      for (let i = 0; i < newRestaurantList.length; i++) {
        if (newRestaurantList[i].name === action.payload.name) {
          newRestaurantList[i].review = action.payload.review;
          update.push(newRestaurantList[i])
        }
      }
      return {
        ...state,
        restaurantList: newRestaurantList,
        update: update,
        synced: false,
      };
    };

    case types.DELETE_RESTAURANT: {
      let data;
      const marks = [];
      const clone = [];
      for (let i = 0; i < state.restaurantList.length; i++) {
        if (state.restaurantList[i].name !== action.payload) {
          clone.push(state.restaurantList[i]);
          marks.push(state.markers[i])
        }
        if (state.restaurantList[i].name === action.payload) data = state.restaurantList[i];
      }
      return {
        ...state,
        restaurantList: clone,
        remove: data,
        markers: marks
      };
    };

    case types.SYNC_RESTAURANTS:
      return {
        ...state,
        synced: true,
      };

    case types.LOAD_RESTAURANTS:
      return {
        ...state,
        restaurantList: action.payload,
      };

    case types.SYNC_UPDATE:
      return {
        ...state,
        synced: true,
        update: []
      };

    case types.SYNC_DELETE:
      return {
        ...state,
        synced: true,
      };

    default: {
      return state;
    };
  }
};

export default reducer;