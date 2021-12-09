const db = require('../../data/db-config')

async function find() { 
  const rows = await db('schemes as sc')
    .leftJoin('steps as st', 'sc.scheme_id', 'st.scheme_id')
    .select('sc.*')
    .count('st.step_id as number_of_steps')
    .groupBy('sc.scheme_id')
    .orderBy('sc.scheme_id')
  return rows;
}

async function findById(scheme_id) { 
  const rows = await db('schemes as sc')
  .leftJoin('steps as st', 'sc.scheme_id', 'st.scheme_id')
  .select('sc.scheme_name', 'st.*')
  .where('sc.scheme_id', scheme_id)
  .orderBy('st.step_number')
  
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
  return result  
}
  

async function findSteps(scheme_id) { 
  const rows = await db('schemes as sc')
  .leftJoin('steps as st', 'sc.scheme_id', 'st.scheme_id')
  console.log(rows)
  return(rows)
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
