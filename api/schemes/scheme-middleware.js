const yup = require('yup');
const Schemes = require('./scheme-model');

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
async function checkSchemeId(req, res, next) {
  try {
    const schemeWithId = await Schemes.findById(req.params.scheme_id);
    if (!schemeWithId) {
      next({ status: 404, message: `scheme with ${req.params.scheme_id} not found` });
    } else {
      req.existingScheme = schemeWithId;
      next();
    }
  } catch (err) {
    next(err);
  }
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const schemeSchema = yup.object({
  scheme_name: yup.string()
    .trim()
    .min(1, 'invalid scheme_name')
    .required('invalid scheme_name')
});

async function validateScheme(req, res, next) {
  try {
    const validatedBody = await schemeSchema.validate(req.body, {
      stripUnknown: true
    })
    req.body = validatedBody;
    next();
  } catch (err) {
    next({ status: 400, message: err.message });
  }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const stepSchema = yup.object({
  instructions: yup.string()
    .trim()
    .min(1, 'invalid step')
    .required('invalid step'),
  step_number: yup.number()
    .min(1, 'invalid step')
    .required('invalid step')
});

async function validateStep(req, res, next) {
  try {
    const validatedBody = await stepSchema.validate(req.body, {
      stripUnknown: true
    })
    req.body = validatedBody;
    next();
  } catch (err) {
    next({ status: 400, message: err.message });
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
