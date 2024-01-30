import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Location} from '../lib/type';

export type {NativeStackScreenProps} from '@react-navigation/native-stack';
export type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
export type ProfileScreenProps = CompositeScreenProps<
  NativeStackScreenProps<ProfileStackParamList, 'Profile'>,
  NativeStackScreenProps<PostStackParamList>
>;

export type AuthStackParamList = {
  Start: undefined;
  SignUp: undefined;
  SignIn: undefined;
};

export type BottomTabParamList = {
  ProfileNativeStack: NavigatorScreenParams<ProfileStackParamList>;
  CreatePost: undefined;
  Posts: undefined;
};

export type PostStackParamList = {
  Post: { location: Location | undefined, url: string | undefined, description: string };
  Comments: undefined;
  Map: { location: Location };
};

export type ProfileStackParamList = {
  Profile: undefined;
  PostStack: NavigatorScreenParams<PostStackParamList>;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList
      extends AuthStackParamList,
        BottomTabParamList,
        PostStackParamList,
        ProfileStackParamList {
    }
  }
}
