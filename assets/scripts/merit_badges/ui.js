'use strict'

const showMeritBadgesTemplate = require('../templates/merit_badge-listing.handlebars')
const store = require('../store.js')

const getMeritBadgesSuccess = (data) => {
  console.log(data)
  const showMeritBadgesHtml = showMeritBadgesTemplate({ merit_badges: data.merit_badges })
  $('.content').append(showMeritBadgesHtml)
}

const clearMeritBadges = () => {
  $('.content').empty()
}

const deleteMeritBadgeSuccess = (id) => {
  console.log(`delete from api successful for id: ${store.id}`)
  $('#' + store.id).remove()
}

const failure = (error) => {
  console.error(error)
}

module.exports = {
  getMeritBadgesSuccess,
  deleteMeritBadgeSuccess,
  clearMeritBadges,
  failure
}
