const yup = require('yup');
const Schemes = require('./scheme-model');

async function checkSchemeId(req, res, next) {
  try {
    const schemeWithId = await Schemes.findById(req.params.scheme_id);
    if (!schemeWithId) {
      next({ status: 404, message: `scheme with scheme_id ${req.params.scheme_id} not found` });
    } else {
      req.existingScheme = schemeWithId;
      next();
    }
  } catch (err) {
    next({ status: 404, message: `scheme with scheme_id ${req.params.scheme_id} not found` });
  }
}

const schemeSchema = yup.object({
  scheme_name: yup.string()
    .trim()
    .required('invalid scheme_name')
});

async function validateScheme(req, res, next) {
  if (typeof req.body.scheme_name !== 'string') {
    next({ status: 400, message: 'invalid scheme_name' });
  }
  try {
    const validatedBody = await schemeSchema.validate(req.body, {
      stripUnknown: true
    })
    req.body = validatedBody;
    next();
  } catch (err) {
    next({ status: 400, message: 'invalid scheme_name' });
  }
}

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
    next({ status: 400, message: 'invalid step' });
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
