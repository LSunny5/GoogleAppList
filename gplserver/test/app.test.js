const supertest = require('supertest');
const app = require('../app');
const { expect } = require('chai');

describe('GET /apps', () => {
    
    it('should return an array of apps', () => {
        return supertest(app)
          .get('/apps')
          .expect(200)
          .expect('Content-Type', /json/)
          .then(res => {
                   expect(res.body).to.be.an('array');
                   expect(res.body).to.have.lengthOf.at.least(1);
                    const oneApp = res.body[0];
                    expect(oneApp).to.include.all.keys(
                        'Rating', 'Price', 'Reviews', 'Size', 'Installs', 'Type', 'Content Rating', 'Genres', 'Last Updated', 'Current Ver', 'Android Ver'
                    );
                 });
      })

      it('should be 400 if genre is incorrect', () => {
        return supertest(app)
          .get('/apps')
          .query({ genre: 'wrong' })
          .expect(200, []);
      });      

      it('should filter by genre', () => {
        return supertest(app)
          .get('/apps')
          .query({ genre: 'action' })
          .expect(200)
          .expect('Content-Type', /json/)
          .then(res => {
            expect(res.body).to.be.an('array');
            let found = true;
            let i = 0;

            while (i < res.body.length) {
                const appAtI = res.body[i];
                if (appAtI.Genre === 'action') {
                    found = false;
                }
                i++;
            }
            expect(found).to.be.true;
        });
    });

    it('should sort by app name', () => {
        return supertest(app)
          .get('/apps')
          .query({ sort: 'name' })
          .expect(200)
          .expect('Content-Type', /json/)
          .then(res => {
            expect(res.body).to.be.an('array');
            let sorted = true;
    
            let i = 0;
            // iterate once less than the length of the array
            // because we're comparing 2 items in the array at a time
            while (i < res.body.length - 1) {
              // compare book at `i` with next book at `i + 1`
              const appAtI = res.body[i];
              const appAtIPlus1 = res.body[i + 1];
              // if the next book is less than the book at i,
              if (appAtIPlus1.App.toLowerCase() < appAtI.App.toLowerCase()) {
                // the books were not sorted correctly
                sorted = false;
                break; // exit the loop
              }
              i++;
            }
            expect(sorted).to.be.true;
          });
      });

      it('should sort by rating', () => {
        return supertest(app)
          .get('/apps')
          .query({ sort: 'rating' })
          .expect(200)
          .expect('Content-Type', /json/)
          .then(res => {
            expect(res.body).to.be.an('array');
            let sorted = true;
    
            let i = 0;
            // iterate once less than the length of the array
            // because we're comparing 2 items in the array at a time
            while (i < res.body.length - 1) {
              // compare book at `i` with next book at `i + 1`
              const appAtI = res.body[i];
              const appAtIPlus1 = res.body[i + 1];
              // if the next book is less than the book at i,
              if (appAtIPlus1.Rating < appAtI.Rating) {
                // the books were not sorted correctly
                sorted = false;
                break; // exit the loop
              }
              i++;
            }
            expect(sorted).to.be.true;
          });
      });
});