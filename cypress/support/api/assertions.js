class Assertions {

    shouldHaveStatus(response, status){
        expect(response.status, `status is ${status}`).to.eq(status)
    }

    validateContractOf(response, schema){
        return cy.wrap(response.body).should(
            schema 
         )
    }

    shouldBookingIdIsBePresent(response){
        expect(response.body.bookingid, 'bookingid exists').to.not.be.null;
    }

    shouldHaveDefaultHeaders(response){
        expect(response.headers, 'defult headers includes').to.include({
            server: 'Cowboy',
            connection: 'keep-alive',
            'x-powered-by': 'Express'
        })
    }

    shouldHaveContentTypeAppJson(response){
        expect(response.headers, 'content type inlude').to.include({
            'content-type':	'application/json; charset=utf-8'
    
        })
    }
    
    shouldDurationByFast(response){
        expect(response.duration, 'duration').lessThan(900);
    }
    
}

export default new Assertions();