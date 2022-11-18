import * as types from '../constants/actionTypes';

const initialState = {
  id: 0,
  name: '',
  address: '',
  restaurantList: [],
  status: 'not visited',
  review: '',
  sync: {},
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
        }),
        sync: {
          id: state.id + 1,
          name: action.payload.name,
          address: action.payload.address,
          status: state.status,
          review: state.review,
        },
        id: state.id + 1,
      };
    }
    
    // case types.ADD_CARD: {
    //   return {
    //     ...state,
    //   };
    // }

    // case types.DELETE_CARD: {
 
    //   return {
    //     ...state,
    //   };
    // }

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

    default: {
      return state;
    }
  }
};

export default reducer;