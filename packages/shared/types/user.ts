export interface User {
  name: string;
}

export interface UpdateUserRequest {
  id: string;
  name: string;
}

export interface UpdateUserResponse {
  success: boolean;
  user: {
    id: string;
    name: string;
  };
}
