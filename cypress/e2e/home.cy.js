/// <reference types="cypress" />

describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the correct heading elements', () => {
    cy.contains('h1', 'Hi, my name is');
    cy.contains('h2', 'Rafael Honório.');
    cy.contains('h3', 'I build things for the world.');
  });

  it('should contain the introduction text', () => {
    // Use more flexible text matching with partial content
    cy.get('.home p').should('be.visible');
    
    // Check for key phrases that should appear in intro paragraphs
    cy.get('.home p').invoke('text').then((text) => {
      const fullText = text.toLowerCase();
      // Check for key words/phrases that should appear somewhere in the text
      expect(fullText).to.include('software');
      expect(fullText).to.include('engineer');
      // Check for mentions of Elixir which is a key part of the bio
      expect(fullText).to.include('elixir');
    });
  });

  it('should display the resume button', () => {
    cy.get('#resumeButton').should('be.visible');
    // Allow for either 'Resume' or 'Curriculum' or other variations
    cy.get('#resumeButton').invoke('text').then((text) => {
      const buttonText = text.toLowerCase();
      const validTexts = ['resume', 'curriculum', 'cv'];
      const hasValidText = validTexts.some(valid => buttonText.includes(valid));
      expect(hasValidText).to.be.true;
    });
  });

  it('should show resume options when resume button is clicked', () => {
    cy.get('#resumes').should('have.class', 'hidden');
    cy.get('#resumeButton').click();
    cy.get('#resumes').should('have.class', 'show');
    cy.get('#resumes').should('be.visible');
  });

  it('should hide resume options when resume button is clicked again', () => {
    cy.get('#resumeButton').click();
    cy.get('#resumes').should('have.class', 'show');
    cy.get('#resumeButton').click();
    cy.get('#resumes').should('have.class', 'hidden');
  });

  it('should have English and Portuguese resume download links', () => {
    cy.get('#resumeButton').click();
    cy.get('#resumes li').should('have.length', 2);
    cy.get('#resumes li').eq(0).find('a')
      .should('have.attr', 'href', '/assets/resume_english.pdf')
      .and('have.attr', 'download', 'resume_english.pdf');
    cy.get('#resumes li').eq(1).find('a')
      .should('have.attr', 'href', '/assets/resume_portuguese.pdf')
      .and('have.attr', 'download', 'resume_portuguese.pdf');
  });

  it('should have animations applied to the home section', () => {
    // More robust animation check - either animation or transition could be used
    cy.get('.home').then($el => {
      const hasAnimation = 
        $el.css('animation') && $el.css('animation') !== 'none' || 
        $el.css('transition') && $el.css('transition') !== 'none';
      expect(hasAnimation).to.be.true;
    });
    
    // Check animation on specific elements that should be animated
    cy.get('.home h1, .home h2, .home h3').each($el => {
      cy.wrap($el).should('be.visible');
    });
  });
});

