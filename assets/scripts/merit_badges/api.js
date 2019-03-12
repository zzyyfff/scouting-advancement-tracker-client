'use strict'

const config = require('../config')

const getMeritBadges = function () {
  return $.ajax({
    url: config.apiUrl + '/merit_badges'
  })
}

const deleteMeritBadge = function (id) {
  return $.ajax({
    url: `${config.apiUrl}/merit_badges/${id}`,
    method: 'DELETE'
  })
}

module.exports = {
  getMeritBadges,
  deleteMeritBadge
}
