//import * as firebase from 'firebase';

export class AuthService {
  // token: string;
  // signupUser(email: string, password: string) {
  //   firebase.auth().createUserWithEmailAndPassword(email, password).
  //     then( response => console.log(response)).
  //   catch( error => console.log(error));
  //}

  signinUser(email: string, password: string) {
    // firebase.auth().signInWithEmailAndPassword(email, password)
    //   .then( response => {
    //     firebase.auth().currentUser.getIdToken()
    //       .then ((token: string) => {
    //       this.token = token;
    //       localStorage.setItem('userDataToken', token);
    //       localStorage.setItem('userName', email);
    //         });

    //   }
    // ).
    // catch(error => console.log(error));
  }
  deleteToken() {
    // this.token = '';
    // localStorage.removeItem('userDataToken');
    // localStorage.removeItem('userName');
  }
  getToken() {
    // localStorage.getItem('firebase');
    // const tempToken =  localStorage.getItem('userDataToken');
    // if (tempToken  != null) {
    //   return tempToken;
    // }

    // return this.token;
  }
}
