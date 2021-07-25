/// <reference types="cypress" />

import req from '../support/api/requests'
import schemas from '../support/api/schemas'
import assertions from '../support/api/assertions'

context('Booking', () => {
    before(() => { 
        req.doAuth()
    })
    it('Validar o contrato de GET booking @contract', {tags: 'critica'}, () => {
        
        req.getBooking().then(getBookingResponse => {
           assertions.validateContractOf(getBookingResponse, schemas.getBookingSchema())
        });
    });

    it('Criar uma reserva com sucesso @functional', {tags: ['critica', 'sucesso']}, () => {
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

    context('Alteracao da reserva', () =>{
        it('Alterar uma reserva com sucesso @functional', {tags: ['critica', 'sucesso']}, () => {
            req.postBooking().then(postBookingResponse =>{
                
                req.updateBooking(postBookingResponse).
                    then(putBookingResponse => { 
                        assertions.shouldHaveStatus(putBookingResponse, 200)
                        assertions.shouldBookingIdIsBePresent(postBookingResponse)
                        assertions.shouldHaveDefaultHeaders(postBookingResponse)
                        assertions.shouldHaveContentTypeAppJson(postBookingResponse)
                        assertions.shouldDurationByFast(postBookingResponse)
                });
            })
        });

        it('Tentar alterar um reserva com token invalid @functional', () => {
            req.postBooking().then(postBookingResponse =>{
                
                req.updateBookingWithoutTokenInvalid(postBookingResponse).
                    then(putBookingResponse => { 
                        assertions.shouldHaveStatus(putBookingResponse, 403)
                });
            })
        });

        it('Alterar uma reserva inexistente @functional', () => {
            req.postBooking().then(postBookingResponse =>{
                
                req.updateBookingInexistente(postBookingResponse).
                    then(putBookingResponse => { 
                        assertions.shouldHaveStatus(putBookingResponse, 405)
                });
            })
        });
    })

    context('Exclucao da reserva', () => {
        it('Excluir uma reserva com sucesso @healthcheck', {tags: ['critica', 'sucesso']}, () => {
            req.postBooking().then(postBookingResponse => {
                req.deleteBooking(postBookingResponse)
                    .then(deleteBookinResponse => {
                    assertions.shouldHaveStatus(deleteBookinResponse, 201)
                    assertions.shouldBookingIdIsBePresent(postBookingResponse)
                    assertions.shouldHaveDefaultHeaders(postBookingResponse)
                    assertions.shouldHaveContentTypeAppJson(postBookingResponse)
                    assertions.shouldDurationByFast(postBookingResponse)
                })
            })
        });

        it('Tentar excluir uma reserva inexistente @healthcheck', () => {
            req.postBooking().then(postBookingResponse => {
                req.deleteBookingInexistente(postBookingResponse)
                    .then(deleteBookinResponse => {
                    assertions.shouldHaveStatus(deleteBookinResponse, 405)
                })
            })
        });

        it('Tentar excluir uma reserva sem token @healthcheck', () => {
            req.postBooking().then(postBookingResponse => {
                req.deleteBookingSemToken(postBookingResponse)
                    .then(deleteBookinResponse => {
                    assertions.shouldHaveStatus(deleteBookinResponse, 403)
                })
            })
        });

        it('Tentar excluir uma reserva com token invalido @healthcheck', () => {
            req.postBooking().then(postBookingResponse => {
                req.deleteBookingInvalido(postBookingResponse)
                    .then(deleteBookinResponse => {
                    assertions.shouldHaveStatus(deleteBookinResponse, 403)
                })
            })
        });
    })

});
