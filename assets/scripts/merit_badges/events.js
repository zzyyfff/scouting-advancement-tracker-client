'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api.js')
const ui = require('./ui.js')
const store = require('../store.js')

const onDeleteMeritBadge = (event) => {
  event.preventDefault()
  store.badgeId = $(event.target).parent().data('id')
  api.deleteMeritBadge(store.badgeId)
    .then(ui.deleteMeritBadgeSuccess)
    .catch(ui.failure)
}

const onEditMeritBadge = (event) => {
  event.preventDefault()
  store.badgeId = $(event.target).parent().data('id')
  ui.switchToEditMode(store.badgeId)
}

const formatMeritBadgeUpdateData = (event) => {
  const formData = getFormFields($(event.target).parent().find('form').get()[0])
  if ('completed' in formData.merit_badge && formData.merit_badge.completed === 'on') {
    formData.merit_badge.completed = true
  } else {
    formData.merit_badge.completed = false
  }
  return formData
}

const onSaveMeritBadge = (event) => {
  event.preventDefault()
  store.badgeId = $(event.target).parent().data('id')

  const formData = formatMeritBadgeUpdateData(event)

  api.updateMeritBadge(store.badgeId, formData)
    .then(ui.updateMeritBadgeSuccess)
    .catch(ui.failure)
}

const onCancelEditMeritBadge = (event) => {
  event.preventDefault()
  store.badgeId = $(event.target).parent().data('id')
  ui.leaveEditMode(store.badgeId)
}

const onCreateMeritBadge = (event) => {
  event.preventDefault()
  const formData = getFormFields(event.target)
  api.createMeritBadge(formData)
    .then(ui.createMeritBadgeSuccess)
    .catch(ui.failure)
}

const addHandlers = () => {
  $('body').on('click', '.deleteMeritBadgeButton', onDeleteMeritBadge)
  $('body').on('click', '.editMeritBadgeButton', onEditMeritBadge)
  $('body').on('click', '.saveMeritBadgeButton', onSaveMeritBadge)
  $('body').on('click', '.cancelEditMeritBadgeButton', onCancelEditMeritBadge)
  $('#create-merit-badge-form').on('submit', onCreateMeritBadge)
}

module.exports = {
  addHandlers
}
