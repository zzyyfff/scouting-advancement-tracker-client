'use strict'

const api = require('./api.js')
const ui = require('./ui.js')
const store = require('../store.js')

const onGetMeritBadges = (event) => {
  event.preventDefault()
  api.getMeritBadges()
    .then(ui.getMeritBadgesSuccess)
    .catch(ui.failure)
}

const onClearMeritBadges = (event) => {
  event.preventDefault()
  ui.clearMeritBadges()
}

const onDeleteMeritBadge = (event) => {
  event.preventDefault()
  store.id = $(event.target).parent().data('id')
  api.deleteMeritBadge(store.id)
    .then(ui.deleteMeritBadgeSuccess)
    .catch(ui.failure)
}

const onEditMeritBadge = (event) => {
  event.preventDefault()
  store.id = $(event.target).parent().data('id')
  // create edit UI
}

const onSaveEditMeritBadge = (event) => {
  event.preventDefault()
  store.id = $(event.target).parent().data('id')
  api.updateMeritBadge(store.id)
    .then(ui.updateMeritBadgeSuccess)
    .catch(ui.failure)
}

const addHandlers = () => {
  $('#getMeritBadgesButton').on('click', onGetMeritBadges)
  $('#clearMeritBadgesButton').on('click', onClearMeritBadges)
  $('body').on('click', '.deleteMeritBadgeButton', onDeleteMeritBadge)
  $('body').on('click', '.editMeritBadgeButton', onEditMeritBadge)
    $('body').on('click', '.editMeritBadgeButton', onSaveEditMeritBadge)
}

module.exports = {
  addHandlers
}
