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
  });

  it('should call then just when the async code is resolved', done => {
    return new NPromise( resolve => {
      setTimeout( () => resolve({data: 'fake'}), 10);
    })
    .then(response => {
      expect(response.data).toBe('fake');
      done();
    });
  });

  it('should allow the same promise to be thenable multiple times', done => {

    const p1 = new NPromise(resolve => setTimeout( () => resolve( { data: 'fake'}), 10));

    p1.then(response => expect(response.data).toBe('fake'));
    p1.then(response => {
      expect(response.data).toBe('fake');
      done();
    })
  });

  it('should support chain of promises on which promises are returned', done => {

    const fakeFSPromise = new Promise(resolve => setTimeout(() => resolve({file: 'photo.jpg'}),10));

    return new NPromise(resolve => {
      setTimeout( () => resolve({data: 'promise1'}),10);
    }).then(response => {
      expect(response.data).toBe('promise1');
      return fakeFSPromise;
    }).then(response => {
      expect(response.file).toBe('photo.jpg');
      done();
    })
  });
});

describe('Error handling', ()  => {

  it('should call catch when an error is thrown', done => {
    const errorMessage = 'Promise has been rejected';

    return new NPromise( (resolve, reject) => {
      setTimeout( () => reject(new Error(errorMessage)), 10);
    })
    .catch(error => {
      expect(error.message).toBe(errorMessage);
      done();
    })
  });

  it('should allow catch to be thenable', done => {
    const errorMessage = 'Promise has been rejected';

    return new NPromise( (resolve, reject) => {
      setTimeout( () => reject(new Error(errorMessage)), 10);
    })
    .catch(error => {
      expect(error.message).toBe(errorMessage);
      return { data: 'someData'};
    })
    .then(response => {
      expect(response.data).toBe('someData');
      done();
    })
  });

  it('should allow to catch an error thrown by a previous catch method', done => {

    const errorMessage = 'Promise has been rejected';

    return new NPromise( (resolve, reject) => {
      setTimeout( () => reject(new Error(errorMessage)), 10);
    })
    .catch(error => {
      expect(error.message).toBe(errorMessage);
      throw new Error('That is another error');
    })
    .catch(error => {
      expect(error.message).toBe('That is another error');
      done();
    });

  });

});
