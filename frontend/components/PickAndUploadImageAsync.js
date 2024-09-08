import * as ImagePicker from "expo-image-picker";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from "firebase/storage";
import firebase from "../firebaseconfig";

export const PickAndUploadImageAsync = async () => {
  try {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;
      const imageName = imageUri.substring(imageUri.lastIndexOf("/") + 1);
      console.log("Picked image URI:", imageUri);

      const response = await fetch(imageUri);
      const blob = await response.blob();
      console.log("Blob size:", blob.size);

      const storage = getStorage(firebase);

      const storageRef = ref(storage, `images/${imageName}`);
      console.log("Storage reference:", storageRef.fullPath);

      const uploadTask = uploadBytesResumable(storageRef, blob);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
          },
          (error) => {
            console.error("Upload error:", error);
            reject(error);
          },
          async () => {
            try {
              const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
              console.log("Download URL:", downloadUrl);
              resolve(downloadUrl);
            } catch (urlError) {
              console.error("Error getting download URL:", urlError);
              reject(urlError);
            }
          }
        );
      });
    } else {
      console.log("Image selection canceled");
      throw new Error("Image selection canceled");
    }
  } catch (error) {
    console.error("Error picking or uploading image:", error);
    throw error;
  }
};
