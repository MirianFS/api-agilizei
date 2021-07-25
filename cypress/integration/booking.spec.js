/// <reference types="cypress" />

import req from '../support/api/requests'
import schemas from '../support/api/schemas'
import assertions from '../support/api/assertions'

context('Booking', () => {
    before(() => { 
        req.doAuth()
    })
    it('Validar o contrato de GET booking @contract', () => {
        
        req.getBooking().then(getBookingResponse => {
           assertions.validateContractOf(getBookingResponse, schemas.getBookingSchema())
        });
    });

    it('Criar uma reserva com sucesso @functional', () => {
        req.postBooking().then(postBookingResponse => {
            assertions.shouldHaveStatus(postBookingResponse, 200)
            assertions.shouldBookingIdIsBePresent(postBookingResponse)
            assertions.shouldHaveDefaultHeaders(postBookingResponse)
            assertions.shouldHaveContentTypeAppJson(postBookingResponse)
            assertions.shouldDurationByFast(postBookingResponse)
        });
    })

    it('Tentar alterar um reserva sem token @functional', () => {
        req.postBooking().then(postBookingResponse =>{
            
            req.updateBookingWithoutToken(postBookingResponse).
                then(putBookingResponse => { 
                    assertions.shouldHaveStatus(putBookingResponse, 403)
            });
        })
    });

    it('Alterar uma reserva com sucesso @functional', () => {
        req.postBooking().then(postBookingResponse =>{
            
            req.updateBooking(postBookingResponse).
                then(putBookingResponse => { 
                    assertions.shouldHaveStatus(putBookingResponse, 200)
            });
        })
    });
    // tentar alterar uma reserva inexistente -> 405
    // tentar alterar uma reserva sem token -> 403
    // tentar alterar uma reserva com token invalido -> 403
    // alterar reserva com sucesso -> 200

    // tentar excluir uma reserva inexistente -> 405
    // tentar excluir uma reserva sem token -> 403
    // tentar excluir uma reserva com token invalido -> 403
    // excluir reserva com sucesso -> 201
 
    it('Excluir uma reserva com sucesso @healthcheck', () => {
        req.postBooking().then(postBookingResponse => {
            req.deleteBooking(postBookingResponse)
                .then(deleteBookinResponse => {
                assertions.shouldHaveStatus(deleteBookinResponse, 201)
            })
        })
    });

    it('Excluir uma reserva com sucesso2 critica', () => {
        req.postBooking().then(postBookingResponse => {
            req.deleteBooking(postBookingResponse)
                .then(deleteBookinResponse => {
                assertions.shouldHaveStatus(deleteBookinResponse, 201)
            })
        })
    });
    it('Excluir uma reserva com sucesso3', {tags: 'critica'}, () => {
        req.postBooking().then(postBookingResponse => {
            req.deleteBooking(postBookingResponse)
                .then(deleteBookinResponse => {
                assertions.shouldHaveStatus(deleteBookinResponse, 201)
            })
        })
    });

});
