import firestore from '@react-native-firebase/firestore';
import _ from 'lodash';

import ormBase from './Orm';

const model = firestore().collection('tasks'),
  interfaceModel = {
    text: '',
    done: false,
    userId: '',
    dayWeek: '',
    createdAt: '',
    updatedAt: '',
  },
  interfaceLike = {
    status: true,
    userId: '',
  },
  interfaceReport = {
    text: '',
    userId: '',
  },
  orm = ormBase(model, interfaceModel);

export {model};

const service = {
  model: model,
  ...orm,
  ...{
    loadViews: async (docId) => {
      const docs = await model
        .doc(docId)
        .collection('views')
        .get()
        .then((querySnapshot) => querySnapshot.docs);

      let result = {};
      docs.forEach((doc) => {
        result[doc.id] = {...{id: doc.id}, ...doc.data()};
      });

      // console.log(result, 'VIEWS');
      return result;
      // if (result) {
      //   dispatch({
      //     type: 'PUBLICATION_VIEW_ADD',
      //     value: result,
      //     parentId: item.id,
      //     id: auth.id,
      //   });
      // }
    },
    like: async (docId, userId) => {
      const ormLikes = ormBase(
        model.doc(docId).collection('likes'),
        interfaceLike,
      );
      let data = {status: true, userId: userId},
        likeId = null;

      const like = await ormLikes.get({userId: userId});
      if (like) {
        data.status = !like.status;
        likeId = like.id;
      }

      return ormLikes.save({...like, ...data}, likeId);
    },
    saveView: async (docId, userId) => {
      const isExist = await model
        .doc(docId)
        .collection('views')
        .doc(userId)
        .get()
        .then((docRef) => docRef.data());

      let data = {
        userId: userId,
        updatedAt: firestore.FieldValue.serverTimestamp(),
        createdAt: isExist ? isExist.createdAt : firestore.Timestamp.now(),
      };

      return model
        .doc(docId)
        .collection('views')
        .doc(userId)
        .set(data)
        .then(async (docRef) => {
          return {status: true, data: {...{id: userId}, ...data}};
        })
        .catch((error) => {
          return {status: false, error: error};
        });
    },
    report: async (docId, data, id = null) => {
      return await ormBase(
        model.doc(docId).collection('reports'),
        interfaceReport,
      ).save(data, id);
    },
    getCategoryByType(type: String, category: String) {
      const categoriesByType = service.getCategories();
      if (type && category) {
        return categoriesByType[type].filter(
          (item) => item.name === category,
        )[0]?.label;
      }
      return '';
    },
    getCategories() {
      return {
        question: [
          {name: 'family', label: 'Familia'},
          {name: 'financy', label: 'Financeiro'},
          {name: 'relationship', label: 'Relacionamento'},
          {name: 'social', label: 'Social'},
          {name: 'work', label: 'Trabalho'},
          {name: 'life', label: 'Vida'},
          {name: 'other', label: 'Outros'},
        ],
        grateful: [
          {name: 'family', label: 'Familia'},
          {name: 'financy', label: 'Financeiro'},
          {name: 'relationship', label: 'Relacionamento'},
          {name: 'social', label: 'Social'},
          {name: 'work', label: 'Trabalho'},
          {name: 'life', label: 'Vida'},
          {name: 'other', label: 'Outros'},
        ],
        text: [
          {name: 'dialog', label: 'Dialogo'},
          {name: 'text', label: 'Reflexão'},
          {name: 'poem', label: 'Poema'},
          {name: 'phrase', label: 'Citação'},
          {name: 'suggestion', label: 'Sugestão'},
          {name: 'junk', label: 'Piada'},
          {name: 'question', label: 'Pergunta'},
          {name: 'affirmative', label: 'Afirmação'},
          {name: 'goal', label: 'Desafio'},
        ],
        feedback: [
          {name: 'suggestion', label: 'Sugestão'},
          {name: 'question', label: 'Pergunta'},
          {name: 'congratulation', label: 'Elogio'},
          {name: 'complaint', label: 'Reclamação'},
        ],
        dream: [
          {name: 'real', label: 'Sonhei com...'},
          {name: 'wish', label: 'Sonho em ter...'},
        ],
      };
    },
  },
};

export default service;
