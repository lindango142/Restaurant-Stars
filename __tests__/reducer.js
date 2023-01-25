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

});