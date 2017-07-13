export class User {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  age: string;
  location: string;
  phone: string;
  constructor(props) {
    this.username = props['username'] || '';
    this.email = props['email'] || '';
    this.firstName = props['firstName'] || '';
    this.lastName = props['lastName'] || '';
    this.age = props['age'] || '';
    this.location = props['location'] || '';
    this.phone = props['phone'] || '';
  }
}