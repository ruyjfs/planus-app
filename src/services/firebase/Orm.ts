import firestore from '@react-native-firebase/firestore';
import _ from 'lodash';

const orm = (model: any, interfaceModel: any = null) => {
  function treateDataToSave(data, id = null) {
    if (interfaceModel) {
      data = {...interfaceModel, ...data};
    }
    data.updatedAt = firestore.FieldValue.serverTimestamp();
    if (typeof data.id !== 'undefined') delete data.id;
    if (!id) data.createdAt = firestore.Timestamp.now();
    return data;
  }

  function autoQuery(query, where, whereType = '==') {
    if (where) {
      _.each(where, (value, collumn) => {
        if (value) {
          query = query.where(collumn, whereType, value);
        }
      });
    }
    return query;
  }

  let functions = {
    treateDataToSave: (data: any, id = null) => treateDataToSave(data, id),
    save: async (data, id = null) => {
      data = treateDataToSave(data, id);

      if (id) {
        model.doc(id).update(data);
        const newData = await model
          .doc(id)
          .get()
          .then((doc) => doc.data());
        return {status: true, data: {...{id: id}, ...newData}};
      }

      return await model
        .add(data)
        .then(async (docRef) => {
          return {status: true, data: {...{id: docRef.id}, ...data}};
        })
        .catch((error) => {
          return {status: false, error: error};
        });
    },
    delete: async (id) => {
      return await model
        .doc(id)
        .delete()
        .then(function () {
          return {status: true, message: 'Document successfully deleted!'};
        })
        .catch((error) => {
          return {status: false, error: error};
        });
    },
    getAll: async (where: any = null, page = 0, whereArray = null) => {
      let query = model,
        result = {};
      query = autoQuery(query, where);
      if (whereArray) {
        query = autoQuery(query, where, 'array-contains');
      }
      query = query.orderBy('createdAt', 'desc'); //TODO criar metodo automatico depois
      if (page > 0) {
        query = query.limit(page * 30);
      }

      const docs = await query
        .get()
        .then((querySnapshot) => querySnapshot.docs);
      docs.forEach((doc) => {
        result[doc.id] = {...{id: doc.id}, ...doc.data()};
      });
      return result;
    },
    find: async (id) => {
      return await model
        .doc(id)
        .get()
        .then((doc) => {
          const data = doc.data();
          return data ? {...{id: id}, ...data} : null;
        });
    },
    get: async (where = null) => {
      let query = model;
      return await autoQuery(query, where)
        .limit(1)
        .get()
        .then((querySnapshot) => {
          return querySnapshot.docs[0]
            ? {
                ...{id: querySnapshot.docs[0].id},
                ...querySnapshot.docs[0].data(),
              }
            : null;
        });
    },
    deleteBy: async (where) => {
      try {
        const result = await functions.getAll(where);
        _.each(_.keys(result), (docId) => {
          functions.delete(docId);
        });
        return {status: true, data: result};
      } catch (error) {
        console.log(error.toString());
        return {status: false, error: error};
      }
    },
    getAllCollection: async (nameCollection, docId) => {
      return await orm(model.doc(docId).collection(nameCollection)).getAll();
    },
    async getLikes(id: string) {
      let likes = {};
      return new Promise(async function (resolve, reject) {
        return await model
          .doc(id)
          .collection('likes')
          .orderBy('createdAt', 'asc')
          .get()
          .then(async (querySnapshot) => {
            await _.each(await querySnapshot.docs, async (doc) => {
              return (likes[doc.id] = doc.data());
            });
            resolve();
          });
      }).then(() => {
        // console.log('LIKES', likes);
        return likes;
      });
    },
  };
  return functions;
};

export default orm;
