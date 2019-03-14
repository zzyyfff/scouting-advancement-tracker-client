'use strict'

const store = require('../store')
const meritBadgesUi = require('../merit_badges/ui')
const meritBadgesApi = require('../merit_badges/api')

const createFeedback = function (feedbackText, delay) {
  $('.auth-status').html(feedbackText)
  $('.auth-status').fadeIn(300)

  setTimeout(() => {
    $('.auth-status').fadeOut(300)
  }, delay)
}

const signUpSuccess = function (responseData) {
  createFeedback('Sign-up successfull.', 3000)
  store.resetAllForms()
  fadeInSignIn()
}

const getDisplayName = function () {
  if (store.user.first_name) {
    return store.user.first_name
  } else {
    return store.user.email.split('@', 1)[0]
  }
}

store.updateUserDisplay = function () {
  store.displayName = getDisplayName()
  $('#welcome-name').text(`Welcome, ${store.displayName}!`)
  $('.name-display').text(store.user.first_name + ' ' + store.user.last_name)
  $('.rank-display').text('Rank: ' + store.user.scout_rank)
  $('#first-name-field').val(store.user.first_name)
  $('#last-name-field').val(store.user.last_name)
}

const signInSuccess = function (responseData) {
  meritBadgesUi.clearMeritBadges()
  store.user = responseData.user
  // ***** GET Merit Badges Gallery HERE*****
  meritBadgesApi.getMeritBadges()
    .then(meritBadgesUi.getMeritBadgesSuccess)
    .catch(meritBadgesUi.failure)
  fadeInWelcome()
  fadeOutAuth()
  store.resetAllForms()
  store.updateUserDisplay()
}

const changePasswordSuccess = function (responseData) {
  $('#formModalCenter').modal('hide')
  createFeedback(`Successfully changed password.`, 3000)
  store.resetAllForms()
  store.updateUserDisplay()
  $('#pass-change-help').removeClass('small-error')
  $('#pass-change-help').addClass('muted')
  $('#pass-change-help').html(`Enter both your old and new passwords to make the change.<br>&nbsp;`)
}

const changePasswordFailure = function (responseData) {
  if (responseData.responseText.includes('HTTP Token: Access denied')) {
    createFeedback(`Your account is signed in on another device. Please sign in again.[Bad token on Password Change]`, 5000)
    signOutSuccess()
    $('#formModalCenter').modal('hide')
  } else {
    store.resetAllForms()
    store.updateUserDisplay()
    $('#pass-change-help').removeClass('muted')
    $('#pass-change-help').addClass('small-error')
    $('#pass-change-help').html(`Incorrect Entry. Please enter your correct old and new passwords to make the change.<br>&nbsp;`)
  }
}

const signOutSuccess = function (responseData) {
  store.user = null
  fadeOutWelcome()
  store.resetAllForms()
  fadeInAuth()
  meritBadgesUi.clearMeritBadges()
}

const failure = function (responseData) {
  createFeedback(`Someting went wrong; please try again.`, 4000)
}

const signInFailure = function (responseData) {
  store.resetAllForms()
  createFeedback(`Incorrect username or password; please try again.`, 4000)
}

const signUpFailure = function (responseData) {
  store.resetAllForms()
  createFeedback(`Username already taken or passwords do not patch; please try again.`, 4000)
}

const signOutFailure = function (responseData) {
  createFeedback(`Sign out failure; please sign-in again.`, 4000)
  signOutSuccess()
}

const fadeOutSignIn = function () {
  $('.sign-in-div').fadeOut(300)
}
const fadeInSignIn = function () {
  $('.sign-in-div').fadeIn(300)
}
const fadeOutAuth = function () {
  $('.initial-auth-form').fadeOut(300)
}
const fadeInAuth = function () {
  $('.initial-auth-form').fadeIn(300)
}
const fadeOutWelcome = function () {
  $('.welclome-dropdown').fadeOut(300)
}
const fadeInWelcome = function () {
  $('.welclome-dropdown').fadeIn(300)
}

const resetPassChangeForm = function (form) {
  form.find('input:text, input:password, input:file, select, textarea').val('')
  store.updateUserDisplay()
  $('#pass-change-help').removeClass('red')
  $('#pass-change-help').addClass('muted')
  $('#pass-change-help').html(`Enter both your old and new passwords to make the change.<br>&nbsp;`)
}

store.resetAllForms = function () {
  $('form').find('input:text, input:password, input:file, select, textarea').val('')
}

const changeRankSuccess = function (responseData) {
  store.user.scout_rank = responseData.user.scout_rank
  store.resetAllForms()
  store.updateUserDisplay()
  $('#formModalRank').modal('hide')
}

const changeNameSuccess = function (responseData) {
  store.user.first_name = responseData.user.first_name
  store.user.last_name = responseData.user.last_name
  store.resetAllForms()
  store.updateUserDisplay()
  $('#formModalName').modal('hide')
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  changeRankSuccess,
  changeNameSuccess,
  signOutSuccess,
  signOutFailure,
  createFeedback,
  fadeOutSignIn,
  fadeInSignIn,
  resetPassChangeForm,
  failure
}
