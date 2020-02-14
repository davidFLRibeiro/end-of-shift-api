const shiftService = {
  getAllShifts(knex) {
    return knex.select('*').from('shifts');
  },

  insertShift(knex, newShift) {
    return knex
      .insert(newShift)
      .into('shifts')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },

  getById(knex, id) {
    return knex
      .from('shifts')
      .select('*')
      .where('id', id)
      .first();
  },

  deleteShift(knex, id) {
    return knex('shifts')
      .where({ id })
      .delete();
  },

  updateShift(knex, id, newShiftFields) {
    return knex('shifts')
      .where({ id })
      .update(newShiftFields);
  }
};

module.exports = shiftService;
