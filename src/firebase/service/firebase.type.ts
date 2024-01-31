import { Location } from '../../lib/type';

export type postToUpload = {
  userId: string;
  selectedImageUri: string | null;
  description: string;
  location: Location | null;
};

export type PostsFromFirebase = {
  id: string;
  userId: string;
  description: string;
  url: string;
  location: Location
  createdAt: CreatedAt;
};

export type CreatedAt = {
  nanoseconds: number;
  seconds: number;
};
