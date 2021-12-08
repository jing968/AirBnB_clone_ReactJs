context('Signup flow - happy path', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/register');
  })

  it('Successfully sign up', () => {
    // credentials
    const name = 'Test name';
    const email = 'Test email';
    const password = 'Test password';
    // sign up
    cy.get('input[name=name]')
      .focus()
      .type(name);
    cy.get('input[name=email]')
      .focus()
      .type(email);
    cy.get('input[name=password]')
      .focus()
      .type(password);
    cy.get('input[name=confirmPassword]')
      .focus()
      .type(password);
    cy.get('button:contains("SignUp")')
      .click();
    cy.get('button:contains("Confirm")')
      .click();
    // log in
    cy.get('a[href*="auth"]')
      .click();
    cy.get('input[name=email]')
      .focus()
      .type(email);
    cy.get('input[name=password]')
      .focus()
      .type(password);
    cy.get('button:contains("Login")')
      .click();
    // triiger create listing
    cy.get('a[href*="newlisting"]')
      .click();
    // fill in new listing info
    const title = 'test title';
    const address = 'test address';
    const price = '750';
    const type = 'test type';
    const bath = 2;
    const beds = 3;
    const master = 1;
    const guest = 1;
    const amenities = 'swimming pool'
    cy.get('input[name=title]')
      .focus()
      .type(title);
    cy.get('input[name=address]')
      .focus()
      .type(address);
    cy.get('input[name=price]')
      .focus()
      .type(price)
    cy.get('input[name=type]')
      .focus()
      .type(type)
    cy.get('input[name=bath]')
      .focus()
      .clear()
      .type(bath)
    cy.get('input[name=beds]')
      .focus()
      .clear()
      .type(beds)
    cy.get('input[name=master]')
      .focus()
      .clear()
      .type(master)
    cy.get('input[name=guest]')
      .focus()
      .clear()
      .type(guest)
    cy.get('input[name=amenities]')
      .focus()
      .type(amenities)
    cy.get('button:contains("Add")')
      .click();
    // trigger listing management
    const newTitle = '-modified'
    const thumbnail = '../integration/happyPath/home.png'
    cy.get('a[href*="listingProfile"]')
      .click();
    cy.get('input[name=title]')
      .focus()
      .type(newTitle)
    cy.get('input[type=file]')
      .attachFile(thumbnail)
    cy.get('button:contains("Update")')
      .click();
    cy.get('button:contains("Confirm")')
      .click();
    cy.get('button:contains("Confirm")')
      .click();
    // publishing listing
    cy.get('[id$=booking]')
      .click()
    const startDate = '2021-12-10';
    const endDate = '2021-12-20';
    cy.get('input[name=startDate]')
      .focus()
      .type(startDate)
    cy.get('input[name=endDate]')
      .focus()
      .type(endDate)
    cy.get('button:contains("Add")')
      .click();
    cy.get('button:contains("Publish Now")')
      .click();
    // unpublish listing
    cy.get('button:contains("Unpublish this listing")')
      .click();
    // making a booking
    const bookStart = '2021-12-01';
    const bookEnd = '2021-12-05';
    cy.get('a[href*="home"]')
      .click();
    cy.get('a[href*="view/listingProfile"]')
      .click();
    cy.get('button:contains("Book Now")')
      .click();
    cy.get('input[name=startDate]')
      .focus()
      .type(bookStart)
    cy.get('input[name=endDate]')
      .focus()
      .type(bookEnd)   
    cy.get('button:contains("Post")')
      .click();
    // logout
    cy.get('[id$=profile]')
      .click()
    cy.get('[id$=logout]')
      .click()     
    // login
    cy.get('a[href*="auth"]')
      .click();
    cy.get('input[name=email]')
      .focus()
      .type(email);
    cy.get('input[name=password]')
      .focus()
      .type(password);
    cy.get('button:contains("Login")')
      .click();    
  })
})