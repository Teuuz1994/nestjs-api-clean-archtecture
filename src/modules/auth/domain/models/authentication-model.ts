export interface AuthenticationModel {
  data: {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  };
  access_token: string;
}
