/// <reference path="../support/commands.d.ts" />
/* eslint-disable cypress/no-unnecessary-waiting */
//cypress/integration/authenticatedScenarios.spec.js
describe('Scenarios where authentication is pre-requirement',()=>{
  beforeEach(()=>{
    cy.intercept('GET','**/notes').as('getNotes')
    cy.login()
  })
  it('CRUDs a note',() => {
    const faker = require('faker')
    const noteDescription = faker.lorem.words(4)

    //cy.intercept('GET','**/notes').as('getNotes')
    //cy.login()

    cy.createNote(noteDescription)
    cy.wait('@getNotes')

    const updateNoteDescription = faker.lorem.words(4)
    const attachFile = true

    cy.editNote(noteDescription,updateNoteDescription,attachFile)
    cy.wait('@getNotes')

    cy.deleteNote(updateNoteDescription)
    cy.wait('@getNotes')

  })

  it('successfully submit the form',() => {
    cy.intercept('POST','**/prod/billing').as('paymentRequest')
    cy.fillSettingsFormAndSubmit()
    cy.wait('@getNotes')
    cy.wait('@paymentRequest').then(response => {
      expect(response.state).to.equal('Complete')
    })
  })
  it('log out',{tags:'@desktop-and-tablet'},() => {
    cy.visit('/')
    cy.wait('@getNotes')
    if (Cypress.config('viewportWidth') < Cypress.env('viewportWidthBreakpoint')) {
      cy.get('.navbar-toggle.collapsed')
        .should('be.visible')
        .click()
    }




    /* ==== Generated with Cypress Studio ==== */
    cy.get('.nav > :nth-child(2) > a').click()
    cy.get('#email').should('be.visible')
    /* ==== End Cypress Studio ==== */
  })

})