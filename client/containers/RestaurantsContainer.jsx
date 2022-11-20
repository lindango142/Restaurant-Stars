import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';
import AutoComplete from '../components/AutoComplete.jsx';
import RestaurantsDisplay from '../components/RestaurantsDisplay.jsx'

const mapStateToProps = ({ restaurants }) => ({
  restaurantList: restaurants.restaurantList,
  sync: restaurants.sync,
  update: restaurants.update,
  remove: restaurants.remove,
  edit: restaurants.edit
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const RestaurantsContainer = props => {
  if (Object.keys(props.update).length) props.syncUpdate();
  if (Object.keys(props.remove).length) props.syncDelete();

  return (
    <div className="innerbox">
      <AutoComplete
        restaurantList={props.restaurantList}
        sync={props.sync}
        addRestaurant={props.addRestaurantActionCreator}
        syncCards={props.syncActionCreator}
      />
      <RestaurantsDisplay
        restaurantList={props.restaurantList}
        updateRev={props.updateReviewActionCreator}
        changeStatus={props.changeStatusActionCreator}
        deleteCard={props.deleteCardActionCreator}
        editActionCreator={props.editActionCreator}
        edit={props.edit}
      />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantsContainer);
