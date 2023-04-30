import { uploadPhoto, createUser } from './utils';

export default async function asyncUploadUser() {
  let pic;
  let _user;
  try {
    pic = await uploadPhoto();
    _user = await createUser();
  } catch (error) {
    pic = null;
    _user = null;
  }
  return { pic, _user };
}
