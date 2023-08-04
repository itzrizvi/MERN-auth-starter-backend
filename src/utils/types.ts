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
