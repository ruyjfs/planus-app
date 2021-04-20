import firestore from '@react-native-firebase/firestore';

const model = firestore().collection('users');
export default {
  async insertOrUpdate(data) {
    let user = await model
      .where('uid', '==', data.uid)
      .get()
      .then((querySnapshot) => {
        return querySnapshot.docs.map((doc) => {
          let result = doc.data();
          return result;
        });
      });
    // console.log('Tem usuário?', user);

    if (user.length > 0) {
      return user[0];
    }

    return await this.save(data);
  },
  async save(data, id = null) {
    data.updatedAt = firestore.FieldValue.serverTimestamp();

    if (typeof data.id !== 'undefined') {
      delete data.id;
    }

    if (id) {
      model.doc(id).update(data);
      return id;
    } else {
      data.createdAt = firestore.Timestamp.now();
    }

    return await model
      .add(data)
      .then(function (docRef) {
        return docRef.id;
      })
      .catch(function (error) {
        console.error('Error adding document: ', error);
      });
  },
  async get() {
    return await model.get().then((querySnapshot) => {
      return querySnapshot.docs.map((doc) => {
        let result = doc.data();
        // model.doc(doc.id).collection('users').get().then(querySnapshot => {
        //   return querySnapshot.docs.map(doc => doc.data());
        // }).then(data => {
        //   result.users = data;
        //   result.totalReceived = data.length;
        // });
        return result;
      });
    });
  },
  async getByUid(uid) {
    let result = await model
      .where('uid', '==', uid)
      .get()
      .then((querySnapshot) => {
        return querySnapshot.docs.map((doc) => {
          let result = doc.data();
          result.id = doc.id;
          return result;
        });
      });
    return result.length > 0 ? result[0] : null;
  },
  async findById(id: string) {
    return await model
      .doc(id)
      .get()
      .then((querySnapshot) => {
        return {...querySnapshot.data(), ...{id: querySnapshot.id}};
      });
  },
  async getByEmail(email) {
    // console.log('MODEO->', firestore());

    // model.get().then(async querySnapshot => {
    //   let result = await querySnapshot.docs.map(doc => doc.data());
    //   console.log('ALL', result);
    // });

    let result = await model
      .where('email', '==', email)
      .get()
      .then((querySnapshot) => {
        // console.log('querySnapshot -', querySnapshot);

        return querySnapshot.docs.map((doc) => {
          let result = doc.data();
          // console.log('result', result);
          result.id = doc.id;
          // model.doc(doc.id).collection('users').get().then(querySnapshot => {
          //   return querySnapshot.docs.map(doc => doc.data());
          // }).then(data => {
          //   result.users = data;
          //   result.totalReceived = data.length;
          // });
          return result;
        });
      });
    return result.length > 0 ? result[0] : null;
  },
};
