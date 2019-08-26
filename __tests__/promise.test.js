const NPromise = require('../new_promise.js');

describe('Promise', () => {

  it('should return error when create a new Promise without executor function', () => {
    try{
      const promise = new NPromise();
    } catch(err) {
      expect(err.message).toBe('Executor must be a function');
    }
  });

  it('should create a new Promise with pending state', () => {
    const promise = new NPromise(() => {});
    expect(promise.state).toBe('pending');
    expect(promise.value).toBe(undefined);
  });

});

describe('When fulfilled', () => {
    
  it('should then a Promise', done => {
    return new NPromise( resolve => resolve({ data: 'fake'}))
      .then(response => {
        expect(response.data).toBe('fake');
        done();
      });
  })
})