import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();

exports.createProfile = functions.auth.user().onCreate((user) => {
  const userObject = {
    firstName: "",
    lastName: "",
    username: user.displayName ?? user.email ?? "Anonymous",
    profilePictureName: null,
  };
  return admin
      .firestore()
      .doc("users/" + user.uid)
      .set(userObject);
});
