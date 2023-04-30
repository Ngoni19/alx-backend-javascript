import signUpUser from './4-user-promise';
import uploadPhoto from './5-photo-reject';

export default function handleProfileSignup(firstName, lastName, fileName) {
  const promises = [signUpUser(firstName, lastName), uploadPhoto(fileName)];
  
  return Promise.all(promises)
    .then(([userData, photoData]) => {
      return [
        { status: 'fulfilled', value: userData },
        { status: 'fulfilled', value: photoData }
      ];
    })
    .catch(error => {
      return [{ status: 'rejected', value: error.toString() }];
    });
}
