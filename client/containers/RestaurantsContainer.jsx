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
  remove: restaurants.remove
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const RestaurantsContainer = props => {
  if (Object.keys(props.remove).length) props.syncDelete(props.remove);
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
        syncCards={props.syncActionCreator}
        sync={props.sync}
        updateRev={props.updateReviewActionCreator}
        syncUpdate={props.syncUpdate}
        changeStatus={props.changeStatusActionCreator}
        deleteCard={props.deleteCardActionCreator}
        syncDelete={props.syncDelete}
        update={props.update}
        remove={props.remove}
      />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantsContainer);
