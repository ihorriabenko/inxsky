import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import uuid from 'react-native-uuid';

export const uploadImageToServer = async (imageLocalePath: string): Promise<string> => {
  try {
    const storage = getStorage();
    const response = await fetch(imageLocalePath);
    const blob = await response.blob();
    const uniqueId = uuid.v4();
    const storageRef = ref(storage, `PostsImages/${uniqueId}`);
    const uploadedString = await uploadBytes(storageRef, blob);
    const url = await getDownloadURL(uploadedString.ref);
    return url;
  } catch (error) {
    console.error(error);
    return ''
  }
};
