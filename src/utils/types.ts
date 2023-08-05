// Register User Types
export interface RegisterRequestBody {
  name: string;
  email: string;
  password: string;
}

export type RegisterUserResponse = {
  message?: string;
  _id: string;
  name: string;
  email: string;
};

// Auth/Login User Types
export interface AuthUserRequestBody {
  email: string;
  password: string;
}

export type AuthUserResponse = {
  message?: string;
  _id: string;
  name: string;
  email: string;
};
