import axios from 'axios';
import * as types from '../constants/actionTypes';

export const addRestaurantActionCreator = (name, address, type) => ({
  type: types.ADD_RESTAURANT,
  payload: { name: name, address: address, type: type }
});

export const changeStatusActionCreator = (name, status) => ({
  type: types.CHANGE_STATUS,
  payload: { name: name, status: status }
});

export const updateReviewActionCreator = (name, review) => ({ 
  type: types.UPDATE_REVIEW,
  payload: {name: name, review: review}
});

export const deleteCardActionCreator = name =>  ({
  type: types.DELETE_RESTAURANT,
  payload: name
});

export const syncActionCreator = () => (dispatch, getState) => {
  axios.post('/restaurants', getState().restaurants.restaurantList)
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

export const syncUpdate = () => (dispatch, getState) => {
  axios.put('/restaurants', getState().restaurants.update)
    .then(({ status }) => {
      if (status === 200) dispatch({ type: types.SYNC_UPDATE });
    })
    .catch(console.error);
}

export const syncDelete = (input) => (dispatch, getState) => {
  console.log(input)
  axios.delete('/restaurants', { data: input})
    .then(({ status }) => {
      if (status === 200) dispatch({ type: types.SYNC_DELETE });
    })
    .catch(console.error);
}