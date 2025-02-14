/// <reference types="Cypress"/>

describe ('Login', () =>{

    beforeEach('Acessar o ambiente BugBank', () => {
        cy.acessoUrl()
    })

    it('Validar criação de conta com saldo', () => {
        cy.cadastroComSaldo()

        cy.get('input[name="email"]').eq(0).type('teste@automacao.com', {force: true})
        cy.get('input[name="password"]').eq(0).type('1234', {force: true})
        cy.contains('Acessar').click()

        // const numero = cy.data(numero)
        // cy.get('#textAccountNumber > span').invoke('text').then(texto => {
        //     expect(texto).to.contain(cy.data(numero));
        //   });

        // // const numero = numero
        cy.get('#textAccountNumber').should('contain', 'Conta digital:') 
        cy.get('#textBalance').contains('R$ 1.000,00') 
            
        // // })  
    })

    it('Validar criação de conta sem saldo', () => {
        cy.cadastroSemSaldo()

        cy.get('input[name="email"]').eq(0).type('teste@automacao.com', {force: true})
        cy.get('input[name="password"]').eq(0).type('1234', {force: true})
        cy.contains('Acessar').click()

        // cy.get('#textAccountNumber > span').invoke('text').then((frase) => {
        //     frase.match(numero)[0];
        //     cy.data = numero
        // })

        cy.get('#textAccountNumber').should('contain', 'Conta digital:') 
        cy.get('#textBalance').contains('R$ 0,00')

        

    })

    it('Validar campos obrigatórios de Login da conta', () => {
        cy.contains('Acessar').click()
        cy.get('p:contains("obrigatório")').eq(0).should('have.text', 'É campo obrigatório')
        cy.get('p:contains("obrigatório")').eq(1).should('have.text', 'É campo obrigatório')
        cy.get('input[name="email"]').eq(0).type('teste@automacao.com', {force: true})
        cy.contains('Acessar').click()
        cy.get('p:contains("obrigatório")').eq(0).should('have.text', 'É campo obrigatório')
        cy.get('input[name="email"]').eq(0).clear().should('have.text', '')
        cy.get('input[name="password"]').eq(0).type('1234', {force: true})
        cy.contains('Acessar').click()
        cy.get('p:contains("obrigatório")').eq(0).should('have.text', 'É campo obrigatório')

    })

    it('Validar a tentativa de login de usuário não cadastrado', () => {
        cy.get('input[name="email"]').eq(0).type('testeauromacao@automacao.com', {force: true})
        cy.get('input[name="password"]').eq(0).type('123456', {force: true})
        cy.contains('Acessar').click()
        
        cy.get('.styles__ContainerContent-sc-8zteav-1').should('be.visible')
        cy.get('#modalText').contains('Usuário ou senha inválido. Tente novamente ou verifique suas informações!')
        cy.get('#btnCloseModal').click()
    })

    it('Validar a tentativa de login sem usuário', () => {
        cy.get('input[name="password"]').eq(0).type('123456', {force: true})
        cy.contains('Acessar').click()
        cy.get('p:contains("obrigatório")').eq(0).should('have.text', 'É campo obrigatório')

    })

    it('Validar a tentativa de login sem a senha', () => {
        cy.get('input[name="email"]').eq(0).type('testeauromacao@automacao.com', {force: true})
        cy.contains('Acessar').click()
        cy.get('p:contains("obrigatório")').eq(0).should('have.text', 'É campo obrigatório')
    })

    it('Validar a tentativa de login com senha inválida', () => {
        cy.cadastroComSaldo()

        cy.get('input[name="email"]').eq(0).type('teste@automacao.com', {force: true})
        cy.get('input[name="password"]').eq(0).type('12345', {force: true})
        cy.contains('Acessar').click()

        cy.get('.styles__ContainerContent-sc-8zteav-1').should('be.visible')
        cy.get('#modalText').contains('Usuário ou senha inválido. Tente novamente ou verifique suas informações!')
        cy.get('#btnCloseModal').click()

  
    })

})