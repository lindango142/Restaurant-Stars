import * as types from '../constants/actionTypes';

const initialState = {
  id: 0,
  name: '',
  address: '',
  restaurantList: [],
  status: 'not visited',
  review: '',
  sync: {},
  update: {},
  remove: {},
  markers: []
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
          markers: state.markers.concat(action.payload.mark)
        }),
        sync: {
          id: state.id + 1,
          name: action.payload.name,
          address: action.payload.address,
          status: state.status,
          review: state.review,
          markers: state.markers.concat(action.payload.mark)
        },
        id: state.id + 1,
        markers: state.markers.concat(action.payload.mark)
      };
    }

    case types.CHANGE_STATUS: {
      let update;
      const newRestaurantList = [...state.restaurantList];
      for (let i = 0; i < newRestaurantList.length; i++) {
        if (newRestaurantList[i].name === action.payload.name) {
          newRestaurantList[i].status = action.payload.status;
          update = newRestaurantList[i]
        }
      }
      return {
        ...state,
        restaurantList: newRestaurantList,
        update: update
      };
    }
    
    case types.UPDATE_REVIEW: {
      let update;
      const newRestaurantList = [...state.restaurantList];
      for (let i = 0; i < newRestaurantList.length; i++) {
        if (newRestaurantList[i].name === action.payload.name) {
          newRestaurantList[i].review = action.payload.review;
          update = newRestaurantList[i]
        }
      }
      return {
        ...state,
        restaurantList: newRestaurantList,
        update: update
      };
    }

    case types.DELETE_RESTAURANT: {
      let data;
      const clone = [];
      for (let i = 0; i < state.restaurantList.length; i++) {
        if (state.restaurantList[i].name !== action.payload) clone.push(state.restaurantList[i]);
        if (state.restaurantList[i].name === action.payload) data = state.restaurantList[i];
      }
      return {
        ...state,
        restaurantList: clone,
        remove: data,
      };
    }

    case types.SYNC_RESTAURANTS:
      return {
        ...state,
      };

    case types.LOAD_RESTAURANTS:
      return {
        ...state,
        restaurantList: action.payload,
      };

    case types.SYNC_UPDATE:
      return {
        ...state,
      }

    case types.SYNC_DELETE:
      return {
        ...state
      }

    default: {
      return state;
    }
  }
};

export default reducer;