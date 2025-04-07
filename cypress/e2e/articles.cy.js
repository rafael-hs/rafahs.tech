/// <reference types="cypress" />

describe('Articles Page', () => {
  // Mock response data for reuse
  const mockArticleResponse = {
    "status": "ok",
    "feed": {
      "url": "https://medium.com/feed/@rafael-hs",
      "title": "Rafael Honório Silva",
      "description": "Medium blog feed"
    },
    "items": [
      {
        "title": "Understanding Elixir's Pattern Matching",
        "link": "https://medium.com/@rafael-hs/understanding-elixir-pattern-matching",
        "pubDate": "2024-03-15T12:00:00Z",
        "thumbnail": "https://example.com/thumbnail1.jpg",
        "description": "A deep dive into Elixir's pattern matching feature"
      },
      {
        "title": "Building Resilient Systems with OTP",
        "link": "https://medium.com/@rafael-hs/building-resilient-systems-with-otp",
        "pubDate": "2024-02-20T12:00:00Z",
        "thumbnail": "https://example.com/thumbnail2.jpg",
        "description": "Guide to building fault-tolerant applications with Elixir/OTP"
      }
    ]
  };
  
  it('should display loading state initially', () => {
    // Intercept the request to the RSS API with a wildcard pattern BEFORE visiting
    cy.intercept('GET', '**/api.rss2json.com/**', {
      delay: 1000, // Add delay to test loading state
      body: mockArticleResponse
    }).as('getArticles');
    
    // Visit after setting up the intercept
    cy.visit('/articles');
    
    // Check for loading state using the correct selector
    cy.get('.loading-box').should('be.visible');
    cy.get('.loading-box h1').contains('Loading articles').should('be.visible');
    
    // Wait for the request to complete
    cy.wait('@getArticles', { timeout: 10000 });
    
    // Loading should disappear after data is loaded
    cy.get('.loading-box').should('not.exist', { timeout: 5000 });
  });

  it('should render the list of articles after loading', () => {
    // Mock the API response with a more permissive pattern
    cy.intercept('GET', '**/api.rss2json.com/**', {
      statusCode: 200,
      body: mockArticleResponse
    }).as('getArticles');

    // Visit after setting up the intercept
    cy.visit('/articles'); 
    
    // Wait for data to be loaded with increased timeout
    cy.wait('@getArticles', { timeout: 10000 });

    // Check for article elements with the correct class
    cy.get('.articles-for', { timeout: 8000 }).should('have.length', 2);
      
    // Check article titles
    cy.get('.articles-for .title').eq(0).contains('Understanding Elixir\'s Pattern Matching');
    cy.get('.articles-for .title').eq(1).contains('Building Resilient Systems with OTP');
  });

  it('should display formatted publication dates', () => {
    // Use a simpler response with just one article
    const simpleMockResponse = {
      ...mockArticleResponse,
      items: [mockArticleResponse.items[0]] // Just use the first article
    };
    
    // Intercept with wildcard pattern
    cy.intercept('GET', '**/api.rss2json.com/**', {
      statusCode: 200,
      body: simpleMockResponse
    }).as('getArticles');

    cy.visit('/articles');
    cy.wait('@getArticles', { timeout: 10000 });

    // Check for date in UTC format (as processed by toUTCString())
    cy.get('.pub-date', { timeout: 5000 }).contains('Published:').should('exist');
    // Check that date string appears to be in UTC format
    cy.get('.pub-date').invoke('text').should('match', /Published: .*(GMT|UTC)/);
  });

  it('should have clickable article links that open in new tabs', () => {
    // Use a simpler response with just one article
    const simpleMockResponse = {
      ...mockArticleResponse,
      items: [mockArticleResponse.items[0]] // Just use the first article
    };
    
    // Intercept with wildcard pattern
    cy.intercept('GET', '**/api.rss2json.com/**', {
      statusCode: 200,
      body: simpleMockResponse
    }).as('getArticles');

    cy.visit('/articles');
    cy.wait('@getArticles', { timeout: 10000 });

    // Check if links have the target="_blank" attribute
    cy.get('.articles-for a', { timeout: 5000 }).first()
      .should('have.attr', 'target', '_blank');

    // Verify link href matches the expected URL
    cy.get('.articles-for a').first()
      .should('have.attr', 'href')
      .and('include', 'medium.com/@rafael-hs');
  });

  it('should display article thumbnails', () => {
    // Use a simpler response with just one article
    const simpleMockResponse = {
      ...mockArticleResponse,
      items: [mockArticleResponse.items[0]] // Just use the first article
    };
    
    // Intercept with wildcard pattern
    cy.intercept('GET', '**/api.rss2json.com/**', {
      statusCode: 200,
      body: simpleMockResponse
    }).as('getArticles');

    cy.visit('/articles');
    cy.wait('@getArticles', { timeout: 10000 });

    // Verify thumbnails are displayed
    cy.get('.articles-for img', { timeout: 5000 }).should('be.visible');
    
    // Check thumbnail has correct src attribute
    cy.get('.articles-for img').should('have.attr', 'src')
      .and('include', 'example.com');
  });
});
