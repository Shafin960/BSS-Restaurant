export interface IAuthResponse {
  token: string;
  user: UserDTO;
}

export interface UserDTO {
  id: string;
  fullName: string;
  email: string;
  image: string;
  userName: string;
  phoneNumber: string;
}
