const express = require('express');
const xss = require('xss');
const shiftService = require('./shift-service');
const path = require('path');
const shiftRouter = express.Router();
const jsonParser = express.json();

shiftRouter
  .route('/')
  .get((req, res, next) => {
    shiftService
      .getAllShifts(req.app.get('db'))
      .then(shifts => {
        res.json(shifts);
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const {
      id,
      cupping,
      vault_money,
      shift_money,
      jetwash,
      galp_fleet,
      local_credit,
      affractions,
      discount_card,
      local_credit,
      discount,
      intern_consumption,
      devolutions,
      escapes,
      resume_genesis,
      atm,
      visa,
      date_created
    } = req.body;
    const newShift = {
      id,
      cupping,
      vault_money,
      shift_money,
      jetwash,
      galp_fleet,
      local_credit,
      affractions,
      discount_card,
      local_credit,
      discount,
      intern_consumption,
      devolutions,
      escapes,
      resume_genesis,
      atm,
      visa,
      date_created
    };

    for (const [key, value] of Object.entries(newShift))
      if (value == null) {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request vody` }
        });
      }
    shiftService
      .insertShift(req.app.get('db'), newShift)
      .then(shift => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `${shift.id}`))
          .json(shift);
      })
      .catch(next);
  });

shiftRouter
  .route('/:shift_id')
  .all((req, res, next) => {})
  .get((req, res, next) => {})
  .delete((req, res, next) => {})
  .patch(jsonParser, (req, res, next) => {});
