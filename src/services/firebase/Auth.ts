// import firebase from './index'
import auth from '@react-native-firebase/auth';

export default {
  async signup(email, password) {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      return {status: true};
    } catch (error) {
      console.log(error.toString());
      return {status: false, error: error};
    }
  },
  async login(email, password) {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      return {status: true};
    } catch (error) {
      return {status: false, error};
    }
  },
  async logout() {
    try {
      await auth().signOut();
    } catch (error) {
      console.log(error);
    }
  },
  async changePassword(email: string, oldPassword: string, password: string) {
    try {
      await auth().signInWithEmailAndPassword(email, oldPassword);
      await auth().currentUser.updatePassword(password);
      return {status: true};
    } catch (error) {
      return {status: false, error: error};
    }
  },
  async sendPasswordResetEmail(email: string) {
    try {
      await auth().sendPasswordResetEmail(email);
      return {status: true};
    } catch (error) {
      return {status: false, error: error};
    }
  },
  async user() {
    return await auth().currentUser;
  },
};
