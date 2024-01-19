export type Auth = {
  user: User,
  isLoading: boolean;  
  isError: boolean;    
  errorMessage?: string; 
};

export type User = {
  userId: string;
  username: string;
}

export type UserSignUp = {
  username: string;
  email: string;
  password: string;
};

export type UserSignIn = {
  email: string;
  password: string;
};

export type SignInPayload = {
  uuid: string;
};
