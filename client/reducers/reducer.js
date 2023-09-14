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
  edit: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_RESTAURANT: {
      // return updated state
      return {
        ...state,
        // array of info from the restaurant card 
        restaurantList: state.restaurantList.concat({
          id: state.id + 1,
          name: action.payload.name,
          address: action.payload.address,
          status: state.status,
          review: state.review,
          marks: action.payload.mark
        }),
        // object that will be passed into post request to add restaurant to db
        sync: {
          id: state.id + 1,
          name: action.payload.name,
          address: action.payload.address,
          status: state.status,
          review: state.review,
          marks: action.payload.mark
        },
        id: state.id + 1,
      };
    }

    case types.CHANGE_STATUS: {
      let update;
      const newRestaurantList = [...state.restaurantList];
      for (let i = 0; i < newRestaurantList.length; i++) {
        if (newRestaurantList[i].name === action.payload.name) {
          // if the names match, change the status of that restaurant in the list
          newRestaurantList[i].status = action.payload.status;
          // update will be an object of the restaurant that was updated
          update = newRestaurantList[i]
        }
      }
      return {
        ...state,
        restaurantList: newRestaurantList,
        // update passed into put request to the db
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
        update: update,
        edit: false
      };
    }

    case types.EDIT_BUTTON: {
      return {
        ...state,
        edit: true
      }
    }

    case types.DELETE_RESTAURANT: {
      let data;
      const clone = [];
      for (let i = 0; i < state.restaurantList.length; i++) {
        if (state.restaurantList[i]._id !== action.payload) {
          clone.push(state.restaurantList[i]);
        }
        if (state.restaurantList[i]._id === action.payload) data = state.restaurantList[i];
      }
      return {
        ...state,
        restaurantList: clone,
        remove: data,
      };
    }

    case types.LOAD_RESTAURANTS:
      return {
        ...state,
        restaurantList: action.payload,
      };

    case types.SYNC_RESTAURANTS:
      return {
        ...state,
        sync: {}
      };

    case types.SYNC_UPDATE:
      return {
        ...state,
        update: {}
      }

    case types.SYNC_DELETE:
      return {
        ...state,
        remove: {}
      }

    default: {
      return state;
    }
  }
};

export default reducer;