export class User {
  id: number = 0;
  firstName: string = '';
  lastName: string = '';
  phoneNumber: number = 0;
  profileImage: string = '';
  email: string = '';
  password: string = '';
  interest: string = '';
  role: string = '';
  address = {
    streetAddress: '',
    city: '',
    zip: '',
    state: '',
  };
}
