const db = require('../../data/db-config');

function find() {

  // SELECT
  //     sc.*,
  //     count(st.step_id) as number_of_steps
  // FROM schemes as sc
  // LEFT JOIN steps as st
  //     ON sc.scheme_id = st.scheme_id
  // GROUP BY sc.scheme_id
  // ORDER BY sc.scheme_id ASC;

  return db('schemes as sc')
    .leftJoin('steps as st', 'sc.scheme_id', 'st.scheme_id')
    .select('sc.*')
    .count('st.step_id as number_of_steps')
    .groupBy('sc.scheme_id')
  ;
}

async function findById(scheme_id) {

  // SELECT
  //     sc.scheme_name,
  //     st.*
  // FROM schemes as sc
  // LEFT JOIN steps as st
  //     ON sc.scheme_id = st.scheme_id
  // WHERE sc.scheme_id = 1
  // ORDER BY st.step_number ASC;

  const rows = await db('schemes as sc')
    .leftJoin('steps as st', 'sc.scheme_id', 'st.scheme_id')
    .where('sc.scheme_id', scheme_id)
    .select('st.*', 'sc.scheme_name', 'sc.scheme_id')
    .orderBy('st.step_number')
  ;

  const result = {
    scheme_id: rows[0].scheme_id,
    scheme_name: rows[0].scheme_name,
    steps: []
  }

  rows.forEach(row => {
    if (row.step_id) {
      result.steps.push({
        step_id: row.step_id,
        step_number: row.step_number,
        instructions: row.instructions
      })
    }
  })

  return result;
}

async function findSteps(scheme_id) {

  // SELECT
  //     step_id,
  //     step_number,
  //     instructions,
  //     scheme_name
  // FROM schemes as sc
  // LEFT JOIN steps as st
  //     ON sc.scheme_id = st.scheme_id
  // WHERE sc.scheme_id = 1
  // ORDER BY step_number;

  const rows = await db('schemes as sc')
    .leftJoin('steps as st', 'sc.scheme_id', 'st.scheme_id')
    .select('st.step_id', 'st.step_number', 'instructions', 'sc.scheme_name')
    .where('sc.scheme_id', scheme_id)
    .orderBy('st.step_number')
  ;

  if (!rows[0].step_id) return []
  return rows;
}

function add(scheme) { // EXERCISE D
  /*
    1D- This function creates a new scheme and resolves to _the newly created scheme_.
  */
}

function addStep(scheme_id, step) { // EXERCISE E
  /*
    1E- This function adds a step to the scheme with the given `scheme_id`
    and resolves to _all the steps_ belonging to the given `scheme_id`,
    including the newly created one.
  */
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
}
