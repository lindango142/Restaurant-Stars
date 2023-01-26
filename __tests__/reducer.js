import subject from '../client/reducers/reducer';

describe('Reducer', () => {
  let state;

  beforeEach(() => {
    state = {
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
  });

  describe('default state', () => {
    it('should return a default state when given an undefined input', () => {
      expect(subject(undefined, { type: undefined })).toEqual(state);
    });
  });

  describe('unrecognized action types', () => {
    it('should return the original without any duplication', () => {
      const action = { type: 'aajsbicawlbejckr' };
      expect(subject(state, action)).toBe(state);
    });
  });

  describe('ADD_RESTAURANT', () => {
    const action = {
      type: 'ADD_RESTAURANT',
      payload: { name: 'Marugame Udon', address: 'Los Angeles', mark: { lat: 34.0522, lng: 118.2437}},
    };

    it('adds a restaurant to restaurantList', () => {
      const { restaurantList } = subject(state, action);
      expect(restaurantList[0]).toEqual({
        id: 1,
        name: "Marugame Udon",
        address: 'Los Angeles',
        status: "not visited",
        review: "",
        marks: {
          lat: 34.0522,
          lng: 118.2437,
        },
      });
    });

    it('adds a restaurant to sync', () => {
      const { sync } = subject(state, action);
      expect(sync).toEqual({
        id: 1,
        name: "Marugame Udon",
        address: 'Los Angeles',
        status: "not visited",
        review: "",
        marks: {
          lat: 34.0522,
          lng: 118.2437,
        },
      });
    });

    it('returns a state object not strictly equal to the original', () => {
      const result = subject(state, action);
      expect(result).not.toBe(state);
    });

    it('includes a restaurantList not strictly equal to the original', () => {
      const result = subject(state, action);
      expect(result.restaurantList).not.toBe(state.restaurantList);
    });
  });

  describe('CHANGE_STATUS', () => {
    beforeEach(() => {
      state = {
        id: 0,
        name: '',
        address: '',
        restaurantList: [{
          id: 1,
          name: "Marugame Udon",
          address: 'Los Angeles',
          status: "not visited",
          review: "",
          marks: {
            lat: 34.0522,
            lng: 118.2437,
          },
        }],
        status: 'not visited',
        review: '',
        sync: {},
        update: {},
        remove: {},
        edit: false,
      };
    });

    const action = {
      type: 'CHANGE_STATUS',
      payload: { name: 'Marugame Udon', status: 'recommended'},
    };

    it('updates status to the restaurant in restaurantList', () => {
      const { restaurantList } = subject(state, action);
      expect(restaurantList[0]).toEqual({
        id: 1,
        name: "Marugame Udon",
        address: 'Los Angeles',
        status: "recommended",
        review: "",
        marks: {
          lat: 34.0522,
          lng: 118.2437,
        },
      });
    });

    it('adds updated restaurant to "update"', () => {
      const { update } = subject(state, action);
      expect(update).toEqual({
        id: 1,
        name: "Marugame Udon",
        address: 'Los Angeles',
        status: "recommended",
        review: "",
        marks: {
          lat: 34.0522,
          lng: 118.2437,
        },
      });
    });
  });

  describe('UPDATE_REVIEW', () => {
    beforeEach(() => {
      state = {
        id: 0,
        name: '',
        address: '',
        restaurantList: [{
          id: 1,
          name: "Marugame Udon",
          address: 'Los Angeles',
          status: "not visited",
          review: "",
          marks: {
            lat: 34.0522,
            lng: 118.2437,
          },
        }],
        status: 'not visited',
        review: '',
        sync: {},
        update: {},
        remove: {},
        edit: false,
      };
    });

    const action = {
      type: 'UPDATE_REVIEW',
      payload: { name: 'Marugame Udon', review: 'Food was good'},
    };

    it('updates status to the restaurant', () => {
      const { restaurantList } = subject(state, action);
      expect(restaurantList[0]).toEqual({
        id: 1,
        name: "Marugame Udon",
        address: 'Los Angeles',
        status: "not visited",
        review: "Food was good",
        marks: {
          lat: 34.0522,
          lng: 118.2437,
        },
      });
    });

    it('adds updated restaurant to "update"', () => {
      const { update } = subject(state, action);
      expect(update).toEqual({
        id: 1,
        name: "Marugame Udon",
        address: 'Los Angeles',
        status: "not visited",
        review: "Food was good",
        marks: {
          lat: 34.0522,
          lng: 118.2437,
        },
      });
    });

    it('sets edit to false', () => {
      const { edit } = subject(state, action);
      expect(edit).toEqual(false);
    })

  });

  describe('EDIT_BUTTON', () => {
    beforeEach(() => {
      state = {
        id: 0,
        name: '',
        address: '',
        restaurantList: [{
          id: 1,
          name: "Marugame Udon",
          address: 'Los Angeles',
          status: "not visited",
          review: "",
          marks: {
            lat: 34.0522,
            lng: 118.2437,
          },
        }],
        status: 'not visited',
        review: '',
        sync: {},
        update: {},
        remove: {},
        edit: false,
      };
    });

    const action = {
      type: 'EDIT_BUTTON',
    };

    it('changes edit to true', () => {
      const { edit } = subject(state, action);
      expect(edit).toEqual(true);
    });
  });

  describe('DELETE_RESTAURANT', () => {
    beforeEach(() => {
      state = {
        id: 0,
        name: '',
        address: '',
        restaurantList: [{
          id: 1,
          name: "Marugame Udon",
          address: 'Los Angeles',
          status: "not visited",
          review: "",
          marks: {
            lat: 34.0522,
            lng: 118.2437,
          },
        }],
        status: 'not visited',
        review: '',
        sync: {},
        update: {},
        remove: {},
        edit: false,
      };
    });

    const action = {
      type: 'DELETE_RESTAURANT',
      payload: 'Marugame Udon',
    };

    it('updates status to the restaurant', () => {
      const { restaurantList } = subject(state, action);
      expect(restaurantList).toEqual([]);
    });

    it('sets "remove" state to the removed restaurant', () => {
      const { remove } = subject(state, action);
      expect(remove).toEqual({
        id: 1,
        name: "Marugame Udon",
        address: 'Los Angeles',
        status: "not visited",
        review: "",
        marks: {
          lat: 34.0522,
          lng: 118.2437,
        },
      });
    });

  });

  describe('LOAD_RESTAURANTS', () => {
    beforeEach(() => {
      state = {
        id: 0,
        name: '',
        address: '',
        restaurantList: [{
          id: 1,
          name: "Marugame Udon",
          address: 'Los Angeles',
          status: "not visited",
          review: "",
          marks: {
            lat: 34.0522,
            lng: 118.2437,
          },
        }],
        status: 'not visited',
        review: '',
        sync: {},
        update: {},
        remove: {},
        edit: false,
      };
    });

    const action = {
      type: 'LOAD_RESTAURANTS',
      payload: { name: 'Marugame Udon', status: 'recommended'},
    };

    it('updates restaurantList to the payload', () => {
      const { restaurantList } = subject(state, action);
      expect(restaurantList).toEqual(action.payload);
    });

  });

  describe('SYNC_RESTAURANTS', () => {
    beforeEach(() => {
      state = {
        id: 0,
        name: '',
        address: '',
        restaurantList: [{
          id: 1,
          name: "Marugame Udon",
          address: 'Los Angeles',
          status: "not visited",
          review: "",
          marks: {
            lat: 34.0522,
            lng: 118.2437,
          },
        }],
        status: 'not visited',
        review: '',
        sync: {
          id: 1,
          name: "Marugame Udon",
          address: 'Los Angeles',
          status: "not visited",
          review: "",
          marks: {
            lat: 34.0522,
            lng: 118.2437,
          },
        },
        update: {},
        remove: {},
        edit: false,
      };
    });

    const action = {
      type: 'SYNC_RESTAURANTS',
    };

    it('clears sync object', () => {
      const { sync } = subject(state, action);
      expect(sync).toEqual({});
    });

  });

  describe('SYNC_UPDATE', () => {
    beforeEach(() => {
      state = {
        id: 0,
        name: '',
        address: '',
        restaurantList: [{
          id: 1,
          name: "Marugame Udon",
          address: 'Los Angeles',
          status: "not visited",
          review: "",
          marks: {
            lat: 34.0522,
            lng: 118.2437,
          },
        }],
        status: 'not visited',
        review: '',
        sync: {},
        update: {
          id: 1,
          name: "Marugame Udon",
          address: 'Los Angeles',
          status: "recommended",
          review: "",
          marks: {
            lat: 34.0522,
            lng: 118.2437,
          },
        },
        remove: {},
        edit: false,
      };
    });

    const action = {
      type: 'SYNC_UPDATE',
    };

    it('clears update object', () => {
      const { update } = subject(state, action);
      expect(update).toEqual({});
    });

  });

  describe('SYNC_DELETE', () => {
    beforeEach(() => {
      state = {
        id: 0,
        name: '',
        address: '',
        restaurantList: [{
          id: 1,
          name: "Marugame Udon",
          address: 'Los Angeles',
          status: "not visited",
          review: "",
          marks: {
            lat: 34.0522,
            lng: 118.2437,
          },
        }],
        status: 'not visited',
        review: '',
        sync: {},
        update: {},
        remove: {
          id: 1,
          name: "Marugame Udon",
          address: 'Los Angeles',
          status: "not visited",
          review: "",
          marks: {
            lat: 34.0522,
            lng: 118.2437,
          },
        },
        edit: false,
      };
    });

    const action = {
      type: 'SYNC_DELETE',
    };

    it('clears remove object', () => {
      const { remove } = subject(state, action);
      expect(remove).toEqual({});
    });

  });
});