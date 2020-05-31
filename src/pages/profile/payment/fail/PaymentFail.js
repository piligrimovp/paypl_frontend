import React from "react";
import {Alert} from "react-bootstrap";

export default function PaymentFail(props) {
    console.log(props)
    return <>
        <section className={'container pb-5 p-0'}>
            <div className={'row justify-content-center'}>
                <div className={'col-6'}>
                    <Alert variant={'danger'}>
                        <div className={'row'}>
                            <div className={'col-4'}>
                                <div className={'payment-glyphicon'}>
                                    <span className="glyphicon glyphicon-remove" aria-hidden="true"/>
                                </div>
                            </div>
                            <div className={'col-8'}>

                            </div>
                        </div>
                    </Alert>
                </div>
            </div>
        </section>
    </>
}