describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')

        const user = {
          name: 'Tarkastaja Mutteri',
          username: 'Tarkastaja',
          password: 'salainen'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user) 

        cy.visit('http://localhost:3000')
    })
    

  describe('Login',function() {
    it('Login form is shown', function() {
      cy.contains('username')
      cy.contains('password')

    })

    it('login fails with wrong credentials', function() {
      cy.get('#username').type('mikki')
      cy.get('#password').type('hiiri')
      cy.get('#login-button').click()

      cy.get('.failNot').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.contains('wrong credentials')
    })

    it('login succeeds with correct credentials', function() {
      cy.get('#username').type('Tarkastaja')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Tarkastaja Mutteri logged in')
    })
  })
    describe('When logged in', function() {
      beforeEach(function() {
        cy.get('#username').type('Tarkastaja')
        cy.get('#password').type('salainen')
        cy.get('#login-button').click()
      })

      it('A blog can be created', function() {
        cy.get('#newBlogButton').click()

        cy.get('#title').type('Harjulan taistelu')
        cy.get('#author').type('Heimo Huima')
        cy.get('#url').type('/.../')
        cy.get('#createBlog').click()

        cy.contains('Harjulan taistelu Heimo Huima')
      })
    })

    describe('When logged in', function() {
      beforeEach(function() {
        cy.get('#username').type('Tarkastaja')
        cy.get('#password').type('salainen')
        cy.get('#login-button').click()

        cy.get('#newBlogButton').click()

        cy.get('#title').type('Harjulan taistelu')
        cy.get('#author').type('Heimo Huima')
        cy.get('#url').type('/.../')
        cy.get('#createBlog').click()

    })

      it('A like is given', function() {
        cy.get('#show').click()
        cy.contains('0')
        cy.get('#like').click()
        cy.contains('1')

      })
    })

    describe('When logged in', function() {
      beforeEach(function() {
        cy.get('#username').type('Tarkastaja')
        cy.get('#password').type('salainen')
        cy.get('#login-button').click()

        cy.get('#newBlogButton').click()

        cy.get('#title').type('Harjulan taistelu')
        cy.get('#author').type('Heimo Huima')
        cy.get('#url').type('/.../')
        cy.get('#createBlog').click()

      })

      it('A blog can be deleted', function() {
        cy.get('#show').click()
        cy.get('#like').click()
        cy.get('#delete').click()

        cy.should('not.contain', 'Harjulan taistelu Heimo Huima')

      })
    })

    describe('When logged in', function() {
      beforeEach(function() {
        cy.get('#username').type('Tarkastaja')
        cy.get('#password').type('salainen')
        cy.get('#login-button').click()

        cy.get('#newBlogButton').click()
        cy.get('#title').type('Harjulan taistelu')
        cy.get('#author').type('Heimo Huima')
        cy.get('#url').type('/.../')
        cy.get('#createBlog').click()

        cy.get('#newBlogButton').click()
        cy.get('#title').type('Harjulan taistelu II')
        cy.get('#author').type('Heimo Huima')
        cy.get('#url').type('/.../')
        cy.get('#createBlog').click()


        

      })

      it('Blogs are listed by likes', function() {
        cy.get('div').eq(0).should('contain', 'Harjulan taistelu Heimo Huima')
        cy.get('div').eq(1).should('contain', 'Harjulan taistelu II Heimo Huima')
        cy.get('div').eq(1).get('#show').click()
        cy.get('div').eq(1).get('#like').click()
        cy.get('div').eq(1).should('contain', 'Harjulan taistelu Heimo Huima')
        cy.get('div').eq(0).should('contain', 'Harjulan taistelu II Heimo Huima')
        
        

        

      })
    })


})