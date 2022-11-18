import axios from 'axios';
import * as types from '../constants/actionTypes';

export const addRestaurantActionCreator = (name, address) => ({
  type: types.ADD_RESTAURANT,
  payload: { name: name, address: address }
});

export const changeStatusActionCreator = status => ({
  type: types.CHANGE_STATUS,
  payload: status
});

export const updateReviewActionCreator = review => ({ 
  type: types.UPDATE_REVIEW,
  payload: location
});

export const deleteCardActionCreator = marketId =>  ({
  type: types.DELETE_RESTAURANT,
  payload: marketId
});

export const syncActionCreator = () => (dispatch, getState) => {
  axios.post('/restaurants', getState().restaurants.sync)
    .then(({ status }) => {
      if (status === 200) dispatch({ type: types.SYNC_RESTAURANTS });
    })
    .catch(console.error);
}

export const loadActionCreator = () => (dispatch) => {
  axios.get('/restaurants')
  .then(({ data }) => {
    dispatch({
      type: types.LOAD_RESTAURANTS,
      payload: data,
    });
  })
  .catch(console.error);
}