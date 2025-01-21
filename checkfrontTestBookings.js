import { PrivateAuth } from './privateAuth.js';
import axios from 'axios';

// Define the username and password
const username = PrivateAuth.username;
const password = PrivateAuth.password;

// Create a basic auth header
//const auth = {
//  username,
//  password,
//};

const authHeader = `Basic ${btoa(`${username}:${password}`)}`;

axios
  .get('https://imaginepuntacana.checkfront.com/api/3.0/booking/164/invoice', {
    headers: {
      Authorization: authHeader,
    },
  })
  .then((response) => {
    console.log('Response:', response.data);
  })
  .catch((error) => {
    console.error('Error:', error.message);
  });
