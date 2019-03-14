'use strict'

const showMeritBadgesTemplate = require('../templates/merit_badge-listing.handlebars')
const store = require('../store.js')
const api = require('./api.js')

store.notes = {}
store.completed = {}

const getMeritBadgesSuccess = (data) => {
  const showMeritBadgesHtml = showMeritBadgesTemplate({ merit_badges: data.merit_badges })
  $('.content').append(showMeritBadgesHtml)

  updateStats(data)
}

const updateStats = (data) => {
  store.meritBadgeStats = data.merit_badges.reduce((accum, meritBadge) => {
    accum.total++
    if (meritBadge.completed) {
      accum.completed++
    } else {
      accum.inProgress++
    }
    return accum
  }, {total: 0, completed: 0, inProgress: 0})

  $('#badges-completed').html(`${store.meritBadgeStats.completed} badges completed! ⭐️`)
  $('#badges-in-progress').html(`${store.meritBadgeStats.inProgress} badges in progress`)
  $('#badges-total').html(`${store.meritBadgeStats.total} total badges`)
}

const clearMeritBadges = () => {
  $('.content').empty()
}

const deleteMeritBadgeSuccess = (id) => {
  $('#' + store.badgeId).remove()
  store.requestUpdateStats()
}

const updateMeritBadgeSuccess = (responseData) => {
  store.completed[`${responseData.merit_badge.id}`] = responseData.merit_badge.completed
  store.notes[`${responseData.merit_badge.id}`] = responseData.merit_badge.notes
  leaveEditMode(responseData.merit_badge.id)
  store.requestUpdateStats()
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
    store.completed[`${id}`] = true
    $('#' + id).find('.badge-completed').html(`<input name="merit_badge[completed]" type="checkbox" id="completed-box-${id}" checked> Completed?`)
  } else {
    store.completed[`${id}`] = false
    $('#' + id).find('.badge-completed').html(`<input name="merit_badge[completed]" type="checkbox" id="completed-box-${id}"> Completed?`)
  }

  // save existing Notes: string if it is anymore more than whitespace
  let notesString = $('#' + id).find('.badge-notes').html()
  notesString = notesString.slice(11 + notesString.indexOf('Notes: '))
  if (notesString.replace(/\s/g, '')) {
    store.notes[`${id}`] = notesString
  } else {
    store.notes[`${id}`] = ''
  }

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
    $('#' + id).find('.badge-completed').html('<strong>⭐️ Completed! ⭐️</strong>')
  } else {
    $('#' + id).find('.badge-completed').html('In progress...')
  }
  if (store.notes[`${id}`].replace(/\s/g, '')) {
    $('#' + id).find('.badge-notes').html(`Notes: <br>${store.notes[`${id}`]}`)
  } else {
    $('#' + id).find('.badge-notes').html('')
  }
}

const createMeritBadgeSuccess = (responseData) => {
  getMeritBadgesSuccess({merit_badges: [responseData.merit_badge]})
  $('#formModalMeritBadge').modal('hide')
  store.resetAllForms()
  store.updateUserDisplay()
  store.requestUpdateStats()
}

store.requestUpdateStats = function () {
  if (store.user) {
    api.getMeritBadges()
      .then(updateStats)
      .catch(failure)
  }
}

const failure = (error) => {
  createFeedback(error, 3000)
}

const createFeedback = function (feedbackText, delay) {
  $('.badges-status').html(feedbackText)
  $('.badges-status').fadeIn(300)

  setTimeout(() => {
    $('.badges-status').fadeOut(300)
  }, delay)
}

module.exports = {
  getMeritBadgesSuccess,
  deleteMeritBadgeSuccess,
  updateMeritBadgeSuccess,
  createMeritBadgeSuccess,
  clearMeritBadges,
  switchToEditMode,
  leaveEditMode,
  updateStats,
  failure
}
