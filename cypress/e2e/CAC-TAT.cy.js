import '../support/commands'

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

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', ()=> {
    cy.get('#firstName').type('Rodrigo')
    cy.get('#lastName').type('Ferrão')
    cy.get('#email').type('teste@email,com')
    cy.get('#open-text-area').type('teste')
    cy.get('button[type="submit"]').click()
    cy.get('span[class="error"]').should('be.visible')
  });

  it('Valida inserção de valor não númerico', ()=>{
    cy.get('#phone').type('abc')
    cy.get('#phone').should('have.value', '')
  });

  it('Valida mensagem de erro Telefone obrigatório', ()=>{
    cy.get('#firstName').type('Rodrigo')
    cy.get('#lastName').type('Ferrão')
    cy.get('#email').type('teste@email.com')
    cy.get('#open-text-area').type('Mensagem de feedback um pouco longa, porém com delay 0', {delay : 0})
    cy.get('#phone-checkbox').check()
    cy.get('button[type="submit"]').click()
    cy.get('span[class="error"]').should('be.visible')
  });

  it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName').type('Rodrigo')
    cy.get('#firstName').should('have.value', 'Rodrigo')
    cy.get('#firstName').clear()
    cy.get('#firstName').should('have.value', '')
    cy.get('#lastName').type('Ferrão')
    cy.get('#lastName').should('have.value', 'Ferrão')
    cy.get('#lastName').clear()
    cy.get('#lastName').should('have.value', '')
    cy.get('#email').type('teste@email.com')
    cy.get('#email').should('have.value', 'teste@email.com')
    cy.get('#email').clear()
    cy.get('#email').should('have.value', '')
    cy.get('#phone').type('123')
    cy.get('#phone').should('have.value', '123')
    cy.get('#phone').clear()
    cy.get('#phone').should('have.value', '')
  })

  it('Valida mensagem de erro - Campos Obrigatórios', () => {
  cy.get('button[type="submit"]').click()
  cy.get('span[class="error"]').should('be.visible')
})

  it('envia o formuário com sucesso usando um comando customizado', () => {
    
/*     Adicionar dados customizados ao teste */
      const data = {
      firstName: 'Rodrigo',
      lastName: 'Ferrao',
      email: 'rodrigo@teste.com',
      text: 'Mensagem de teste',    
    }
    
    cy.fillMandatoryFieldsAndSubmit(data)
    cy.get('span[class="success"]').should('be.visible')
  })

});




