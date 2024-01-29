export default interface PropertyType {
  number: string;
  apartment: string;
  street: string;
  postcode: string;
  city: string;
}

export interface Contact {
  firstName: string, 
  lastName: string,
  email: string,
  password: string
};

export interface Login {
  email: string,
  password: string
};