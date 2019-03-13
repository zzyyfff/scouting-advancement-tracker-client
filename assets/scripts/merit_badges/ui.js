'use strict'

const showMeritBadgesTemplate = require('../templates/merit_badge-listing.handlebars')
const store = require('../store.js')

store.notes = {}
store.completed = {}

const getMeritBadgesSuccess = (data) => {
  console.log(data)
  const showMeritBadgesHtml = showMeritBadgesTemplate({ merit_badges: data.merit_badges })
  $('.content').append(showMeritBadgesHtml)
}

const clearMeritBadges = () => {
  $('.content').empty()
}

const deleteMeritBadgeSuccess = (id) => {
  console.log(`delete from api successful for id: ${store.badgeId}`)
  $('#' + store.badgeId).remove()
}

const updateMeritBadgeSuccess = (responseData) => {
  store.completed[`${responseData.merit_badge.id}`] = responseData.merit_badge.completed
  store.notes[`${responseData.merit_badge.id}`] = responseData.merit_badge.notes
  leaveEditMode(responseData.merit_badge.id)
}

const switchToEditMode = (id) => {
  $('#editMeritBadgeButton-' + id).text('Save')
  $('#editMeritBadgeButton-' + id).addClass('saveMeritBadgeButton')
  $('#editMeritBadgeButton-' + id).removeClass('editMeritBadgeButton')
  $('#deleteMeritBadgeButton-' + id).text('Cancel')
  $('#deleteMeritBadgeButton-' + id).addClass('cancelEditMeritBadgeButton')
  $('#deleteMeritBadgeButton-' + id).removeClass('deleteMeritBadgeButton')

  // switch display to input
  if ($('#' + id).find('.badge-completed').text().includes('Completed!')) {
    $('#' + id).find('.badge-completed').html(`<input name="merit_badge[completed]" type="checkbox" id="completed-box-${id}" checked> Completed?`)
  } else {
    $('#' + id).find('.badge-completed').html(`<input name="merit_badge[completed]" type="checkbox" id="completed-box-${id}"> Completed?`)
  }

  // save existing Notes: string
  let notesString = $('#' + id).find('.badge-notes').text()
  notesString = notesString.slice(7 + notesString.indexOf('Notes: '))
  store.notes[`${id}`] = notesString

  // convert Notes: to editable textarea
  $('#' + id).find('.badge-notes').html(`Notes:<textarea name="merit_badge[notes]" cols="40" rows="3">${store.notes[`${id}`]}</textarea>`)
}

const leaveEditMode = (id) => {
  // change both buttons back
  $('#editMeritBadgeButton-' + id).text('Edit')
  $('#editMeritBadgeButton-' + id).addClass('editMeritBadgeButton')
  $('#editMeritBadgeButton-' + id).removeClass('saveMeritBadgeButton')
  $('#deleteMeritBadgeButton-' + id).text('Remove')
  $('#deleteMeritBadgeButton-' + id).addClass('deleteMeritBadgeButton')
  $('#deleteMeritBadgeButton-' + id).removeClass('cancelEditMeritBadgeButton')

  // return form fields to display-only mode
  if (store.completed[`${id}`]) {
    $('#' + id).find('.badge-completed').html('Completed!')
  } else {
    $('#' + id).find('.badge-completed').html('In progress.')
  }
  if (store.notes[`${id}`]) {
    $('#' + id).find('.badge-notes').html(`Notes: ${store.notes[`${id}`]}`)
  } else {
    $('#' + id).find('.badge-notes').html('')
  }
}

const createMeritBadgeSuccess = (responseData) => {
  getMeritBadgesSuccess({merit_badges: [responseData.merit_badge]})
  $('#formModalMeritBadge').modal('hide')
  store.resetAllForms()
}

const failure = (error) => {
  console.error(error)
}

module.exports = {
  getMeritBadgesSuccess,
  deleteMeritBadgeSuccess,
  updateMeritBadgeSuccess,
  createMeritBadgeSuccess,
  clearMeritBadges,
  switchToEditMode,
  leaveEditMode,
  failure
}
