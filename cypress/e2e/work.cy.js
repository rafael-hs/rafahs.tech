/// <reference types="cypress" />

describe('Work Page', () => {
  beforeEach(() => {
    cy.visit('/work');
  });

  it('should display all work experience sections', () => {
    // Check that all accordion buttons exist
    cy.get('button.accordion').should('have.length', 7);
    
    // Check specific company names
    cy.contains('h3', 'Senior Software Engineer @ SWAP');
    cy.contains('h3', 'Software Engineer @ Jaya Tech');
    cy.contains('h3', 'Software Developer @ ITIX');
    cy.contains('h3', 'Fullstack Developer @ SEFAZ');
    cy.contains('h3', 'Developer Trainee @ Pentago');
    cy.contains('h3', 'Service Desk Agent @ Nexa');
    cy.contains('h3', 'Developer Trainee @ UniSales');
  });

  it('should load all company images', () => {
    cy.get('button.accordion img').should('have.length', 7);
    cy.get('button.accordion img').each(($img) => {
      // Check that images have src attributes and are loaded
      cy.wrap($img).should('have.attr', 'src').and('not.be.empty');
      cy.wrap($img).should('be.visible');
    });
  });

  it('should expand accordion panels when clicked', () => {
    // Test SWAP accordion
    cy.get('#swap').should('not.have.class', 'show');
    cy.get('#swap_button').click();
    cy.get('#swap').should('have.class', 'show');
    cy.get('#swap_button').should('have.class', 'active');
    
    // Content should be visible when expanded
    cy.get('#swap').contains('Swap is a company that was created thinking about removing barriers');
    cy.get('#swap').find('ul li').should('be.visible');
  });

  it('should collapse accordion panels when clicked again', () => {
    // Expand first
    cy.get('#jaya_button').click();
    cy.get('#jaya').should('have.class', 'show');
    
    // Then collapse
    cy.get('#jaya_button').click();
    cy.get('#jaya').should('not.have.class', 'show');
    cy.get('#jaya_button').should('not.have.class', 'active');
  });

  it('should display technology lists within accordion panels', () => {
    // Test Jaya Tech accordion content
    cy.get('#jaya_button').click();
    cy.get('#jaya').within(() => {
      cy.contains('h5', 'Technologies:');
      cy.contains('li', 'NodeJS (NestJS)');
      cy.contains('li', 'Elixir (Phoenix)');
    });
  });

  it('should allow multiple accordion panels to be open simultaneously', () => {
    // Open multiple panels
    cy.get('#swap_button').click();
    cy.get('#jaya_button').click();
    
    // Both should be visible
    cy.get('#swap').should('have.class', 'show');
    cy.get('#jaya').should('have.class', 'show');
  });
});

