describe('Teste de Integração com API do Laravel Para Doadores, Itens e Categorias', () => {
  
  const baseUrl = 'http://localhost:5174'; 

  it('Deve listar os itens cadastrados', () => {

    cy.intercept('GET', '**/v1/itens').as('getItensReal');

    cy.visit(`${baseUrl}/itens`);

    cy.wait('@getItensReal').its('response.statusCode').should('eq', 200);

    cy.get('body').should('contain', 'Arroz'); 

  });

  it('Deve listar as categorias cadastradas', () => {

    cy.intercept('GET', '**/v1/categorias').as('getCategoriasReal');

    cy.visit(`${baseUrl}/categorias`);
  
    cy.wait('@getCategoriasReal').its('response.statusCode').should('eq', 200);

    cy.get('body').should('contain', 'Alimento'); 
  });
 
  it('Deve listar as Organizações cadastradas', () => {

    cy.intercept('GET', '**/v1/organizacoes').as('getOrganizacoesReal');

    cy.visit(`${baseUrl}/organizacoes`);
  
    cy.wait('@getOrganizacoesReal').its('response.statusCode').should('eq', 200);

    cy.get('body').should('contain', 'Sociedade União'); 
  });

});