'use strict'

const config = require('../config')
const store = require('../store')

const getMeritBadges = function () {
  return $.ajax({
    url: config.apiUrl + '/merit_badges',
    method: 'GET',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    }
  })
}

const deleteMeritBadge = function (id) {
  return $.ajax({
    url: `${config.apiUrl}/merit_badges/${id}`,
    method: 'DELETE',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    }
  })
}

const updateMeritBadge = function (id, formData) {
  return $.ajax({
    url: `${config.apiUrl}/merit_badges/${id}`,
    method: 'PATCH',
    headers: {
      'Authorization': 'Token token=' + store.user.token
    },
    data: formData
  })
}


module.exports = {
  getMeritBadges,
  deleteMeritBadge,
  updateMeritBadge
}
