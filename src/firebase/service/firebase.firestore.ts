import {firestore} from '../firebase.config';
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
import {uploadImageToServer} from './firebase.storage';
import {PostsFromFirebase, postToUpload} from './firebase.type';
import React from "react";

export const uploadPostToServer = async (postToUpload: postToUpload) => {
  const {userId, selectedImageUri, description, location} = postToUpload;
  let url = '';

  try {
    if (selectedImageUri) {
      url = await uploadImageToServer(selectedImageUri);
    }

    await addDoc(collection(firestore, 'posts'), {
      userId,
      url,
      description,
      location,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};

export const listenPosts = (callback: React.Dispatch<React.SetStateAction<PostsFromFirebase[]>>) => {
  const postCollection = collection(firestore, 'posts')
  const postsQuery = query(postCollection, orderBy('createdAt', 'desc'))

  const unsubscribe = onSnapshot(postsQuery, (querySnapshot) => {
    const posts: PostsFromFirebase[] = []

    querySnapshot.docs.map(item => {
      posts.push({
        id: item.id,
        ...item.data() as Omit<PostsFromFirebase, 'id'>
      })
    })

    callback(posts)
  })

  return unsubscribe
}


