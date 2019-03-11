'use strict'

const store = require('../store')
const gameLogic = require('../game/game-logic')
const gameUi = require('../game/ui')

const createFeedback = function (feedbackText, delay) {
  $('.auth-status').html(feedbackText)
  $('.auth-status').fadeIn(300)

  setTimeout(() => {
    $('.auth-status').fadeOut(300)
  }, delay)
}

const signUpSuccess = function (responseData) {
  createFeedback('Sign-up successfull.', 3000)
  resetAllForms()
  fadeInSignIn()
}

const signInSuccess = function (responseData) {
  store.user = responseData.user
  const name = store.user.email.split('@', 1)
  $('#winner').hide()
  $('#welcome-name').html(`Welcome, ${name[0]}!`)
  gameUi.updateStats()
  fadeInWelcome()
  fadeOutAuth()
  resetAllForms()
}

const changePasswordSuccess = function (responseData) {
  $('#formModalCenter').modal('hide')
  createFeedback(`Successfully changed password.`, 3000)
  resetAllForms()
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
    resetAllForms()
    $('#pass-change-help').removeClass('muted')
    $('#pass-change-help').addClass('small-error')
    $('#pass-change-help').html(`Incorrect Entry. Please enter your correct old and new passwords to make the change.<br>&nbsp;`)
  }
}

const signOutSuccess = function (responseData) {
  store.user = null
  fadeOutWelcome()
  gameUi.fadeOutResetGameButton()
  gameUi.fadeOutGameStatus()
  resetAllForms()
  fadeInAuth()
  $('#start-game-button').html('Start A New Game!')
  setTimeout(gameUi.fadeInNewGameButton, 310)

  // reset board with blank game on sign-out
  const game = new gameLogic.Game(0, 0, 'dummy@game')
  gameUi.renderBoard(game)
  store.game = null
  store.readyToAcceptNewGame = true
}

const failure = function (responseData) {
  createFeedback(`Someting went wrong; please try again.`, 4000)
}

const signInFailure = function (responseData) {
  resetAllForms()
  createFeedback(`Incorrect username or password; please try again.`, 4000)
}

const signUpFailure = function (responseData) {
  resetAllForms()
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

  $('#pass-change-help').removeClass('red')
  $('#pass-change-help').addClass('muted')
  $('#pass-change-help').html(`Enter both your old and new passwords to make the change.<br>&nbsp;`)
}

const resetAllForms = function () {
  $('form').find('input:text, input:password, input:file, select, textarea').val('')
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure,
  createFeedback,
  fadeOutSignIn,
  fadeInSignIn,
  resetPassChangeForm,
  failure
}
