import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();

exports.createProfile = functions.auth.user().onCreate((user) => {
  const userObject = {
    firstName: "",
    lastName: "",
    username: user.displayName ?? user.email ?? "Anonymous",
    profilePictureName: uuidv4(),
  };

  const bucket = admin.storage().bucket();

  const fileUpload = bucket.file("outline_face_black_48dp.png")
      .copy(user.uid + "/images/profile_picture.jpg");
  const userUpload = admin
      .firestore()
      .doc("users/" + user.uid)
      .set(userObject);

  return Promise.all([fileUpload, userUpload]);
});

/**
 * Creates a UUID
 * @return {string} the create UUID
 */
function uuidv4(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0; const v = c == "x" ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
