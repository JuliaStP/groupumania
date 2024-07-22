// import { signingupSaga } from './signupSaga';
// import { saveSaga } from './saveSaga';
// import { signUp } from '../actions';
// import { serverSignup } from '../api';

// jest.mock('../api', () => ({ 
//   serverSignup: jest.fn(() => true)
// }));

// describe('signupSaga', () => {
//     describe('#SIGN_UP', () => {
//       it('signing up through api', async () => {
//         serverSignup
//         .mockImplementation(async () => true);
//         const dispatched = await saveSaga(
//           signingupSaga,
//             signUp('testlogin', 'testfirstname', 'testlastname', 'testpassword')
//         )
//         expect(dispatched).toEqual([{ type: 'LOG_IN' }])
//       });
//     });
// }); 