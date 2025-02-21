describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(() => {
    cy.visit('./src/index.html')
  });
  
  it('Verifica o título da aplicação', () => { 
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  });

  it('Preenche os campos obrigatórios e envia o formulário', ()=> {
    cy.get('#firstName').type('Rodrigo')
    cy.get('#lastName').type('Ferrão')
    cy.get('#email').type('teste@email.com')
    cy.get('#open-text-area').type('Mensagem de feedback um pouco longa, porém com delay 0', {delay : 0})
    cy.get('button[type="submit"]').click()
    cy.get('span[class="success"]').should('be.visible')
  });

});




