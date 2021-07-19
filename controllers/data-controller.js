const { firestoreRef } = require('./../drivers/firestore');
const { successResponse, errorToResponse } = require('./../utils/responses-handler');

const collectionName = 'random_data';

const getItemsFromDb = (req, res) => {
  if (firestoreRef) {
    return firestoreRef.collection(collectionName).get()
      .then((snapshot) => {
        const items = [];
        snapshot.forEach((doc) => {
          items.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        // snapshot._query = undefined;
        return res.send(successResponse(items));
      })
      .catch(
        (err) => res.status(500).send(errorToResponse(err, 'Error getting data from firestore'))
      );
  } else {
    return res.status(500).send(errorToResponse('Couldn\'t connect to database'));
  }
};

const getItemFromDbById = (req, res) => {
  if (firestoreRef) {
    return firestoreRef.collection(collectionName).doc(req.params.id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = {
            ...doc.data(),
            id: req.params.id,
          };
          return res.send(data);
        }
        return res.status(500)
          .send(errorToResponse(`Document with id ${req.params.id} does not exist`));
      });
  } else {
    return res.status(500).send(errorToResponse('Couldn\'t connect to database'));
  }
};

const createItemInDb = async (req, res) => {
  if (firestoreRef) {
    const doc = firestoreRef.collection(collectionName).doc();
    try {
      await doc.set(req.body);
      return res.send({ success: true, doc: { id: doc.id, data: req.body } });
    } catch (err) {
      return res.status(500).send(errorToResponse(err, 'Error saving data to firestore'));
    }
  } else {
    return res.status(500).send({ success: false, error: 'Couldn\'t connect to database' });
  }
};

const updateItemInDb = async (req, res) => {
  if (firestoreRef) {
    const doc = firestoreRef.collection(collectionName).doc(req.params.id);
    if (doc) {
      try {
        await doc.set(req.body);
        return res.send(successResponse({ id: doc.id, data: req.body }));
      } catch (err) {
        return res.status(500).send(errorToResponse(err, 'Error saving data to firestore'));
      }
    } else {
      return res.status(500)
        .send(errorToResponse(`Document with id ${req.params.id} does not exist`));
    }
  } else {
    return res.status(500).send(errorToResponse('Couldn\'t connect to database'));
  }
};

const deleteItemFromDb = async (req, res) => {
  if (firestoreRef) {
    const doc = firestoreRef.collection(collectionName).doc(req.params.id);
    if (doc) {
      try {
        await doc.delete();
        return res.send(successResponse());
      } catch (err) {
        return res.status(500).send(errorToResponse(err, 'Error deleting data from firestore'));
      }
    } else {
      return res.status(500)
        .send(errorToResponse(`Document with id ${req.params.id} does not exist`));
    }
  } else {
    return res.status(500).send(errorToResponse('Couldn\'t connect to database'));
  }
};

module.exports = {
  getItemsFromDb,
  getItemFromDbById,
  createItemInDb,
  updateItemInDb,
  deleteItemFromDb,
};
