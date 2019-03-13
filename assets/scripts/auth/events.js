'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('../store')

const onSignUp = function (event) {
  event.preventDefault()
  const formData = getFormFields(event.target)
  api.signUp(formData)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

const onSignIn = function (event) {
  event.preventDefault()
  const formData = getFormFields(event.target)
  api.signIn(formData)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const onChangePassword = function (event) {
  event.preventDefault()
  const formData = getFormFields(event.target)
  api.changePassword(formData)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

const onSignOut = function (event) {
  event.preventDefault()
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

const onRegisterReveal = function (event) {
  event.preventDefault()
  ui.fadeOutSignIn()
}

const onSignInReveal = function (event) {
  event.preventDefault()
  ui.fadeInSignIn()
}

const onPassChangeClose = function (event) {
  ui.resetPassChangeForm($('#change-password-form'))
}

const onChangeRank = function (event) {
  event.preventDefault()
  const formData = getFormFields(event.target)
  api.changeRank(formData)
    .then(ui.changeRankSuccess)
    .catch(ui.failure)
}

const onRankChangeClose = function (event) {
  store.resetAllForms()
}

const onChangeName = function (event) {
  event.preventDefault()
  const formData = getFormFields(event.target)
  api.changeName(formData)
    .then(ui.changeNameSuccess)
    .catch(ui.failure)
}

const onNameChangeClose = function (event) {
  store.resetAllForms()
}

const addHandlers = () => {
  $('#sign-up-form').on('submit', onSignUp)
  $('#sign-in-form').on('submit', onSignIn)
  $('#change-password-form').on('submit', onChangePassword)
  $('#change-rank-form').on('submit', onChangeRank)
  $('#change-name-form').on('submit', onChangeName)
  $('#sign-out').on('click', onSignOut)
  $('#register-reveal').on('click', onRegisterReveal)
  $('#sign-in-reveal').on('click', onSignInReveal)
  $('#pass-change-close').on('click', onPassChangeClose)
  $('#rank-change-close').on('click', onRankChangeClose)
  $('#name-change-close').on('click', onNameChangeClose)
}

module.exports = {
  addHandlers
}
