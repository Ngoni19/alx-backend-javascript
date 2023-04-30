export default async function asyncUploadUser() {
  try {
    let [photo, user] = await Promise.all([uploadPhoto(), createUser()]);
    return { photo, user };
  } catch (error) {
    console.log(error);
    return { photo: null, user: null };
  }
}
