const Person = require('./../models/person');
const { successResponse, errorToResponse } = require('./../utils/responses-handler');

// CRUD
// req -> request
// res -> response
const createPerson = (req, res) => {
  // query -> https://url.com?name=valor&other=value
  // params -> https://url.com/api/people/123 '/api/people/:id'
  // body -> json
  // const { name, other } = req.query;
  // const { id } = req.params;
  // const { otherName } = req.body;
  const { name, age, email } = req.body;
  const newPerson = new Person({ name, age, email });
  newPerson.save((err, result) => {
    if (err) {
      return res.status(400).send(errorToResponse(err, 'Error inesperado'));
    }
    return res.send(successResponse(result));
  });
};

const getPeople = (req, res) => {
  const { id } = req.params;
  const filters = {};
  if (id) {
    // eslint-disable-next-line no-underscore-dangle
    filters._id = id;
  }
  // Pagination -> aggregations
  Person.find(filters, (err, result) => {
    if (err) {
      return res.status(400).send(errorToResponse(err, 'Error inesperado'));
    }
    return res.send(successResponse(result));
  });
};

const updatePerson = (req, res) => {
  const { id } = req.params;
  Person.updateOne({ _id: id }, req.body, (err, result) => {
    if (err) {
      return res.status(400).send(errorToResponse(err, 'Error inesperado'));
    }
    const ok = result.ok || 0;
    if (!ok) {
      return res.status(400).send(errorToResponse('Error inesperado'));
    }

    return Person.find({ _id: id }, (err2, result2) => {
      if (err) {
        return res.status(400).send(errorToResponse(err2, 'Error inesperado'));
      }
      return res.send(successResponse(result2));
    });
  });
};

const deletePerson = (req, res) => {
  Person.deleteOne({ _id: req.params.id }, (err, result) => {
    if (err) {
      return res.status(400).send(errorToResponse(err, 'Error inesperado'));
    }
    const ok = result.ok || 0;
    if (!ok) {
      return res.status(400).send(errorToResponse('Error inesperado'));
    }

    return res.send(successResponse(result));
  });
};

module.exports = {
  createPerson,
  getPeople,
  updatePerson,
  deletePerson,
};
