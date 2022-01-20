// import model here
const { user } = require('../../models');

// import package here
const joi = require('joi');

exports.register = async (req, res) => {
  try {
    const data = req.body;

    const schema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().min(4).required(),
      name: joi.string().min(3).required(),
      status: joi.string().required(),
    });

    const { error } = schema.validate(data);

    if (error) {
      return res.send({
        error: error.details[0].message,
      });
    }

    await user.create(data);

    res.send({
      status: 'success',
      message: 'Register finished',
    });
  } catch (err) {
    console.log(err);
    res.send({
      status: 'failed',
      message: 'server error',
    });
  }
};

exports.login = async (req, res) => {
  try {
    const data = req.body;

    const schema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().min(4).required(),
    });

    const { error } = schema.validate(data);

    if (error) {
      return res.send({
        error: error.details[0].message,
      });
    }

    res.send({
      status: 'success',
      message: 'Login finished',
    });
  } catch (err) {
    console.log(err);
    res.send({
      status: 'failed',
      message: 'server error',
    });
  }
};
