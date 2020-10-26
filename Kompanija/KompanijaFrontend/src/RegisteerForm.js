import React from 'react'
import Registracije from "./Registracije"




class RegisteerForm extends React.Component {

    constructor() {
        super()
        this.state = {
            showForm: false

        }
    }


    handleClick = (event) => {
        event.preventDefault()

        this.setState(prevState => {
            return ({ showForm: !prevState.showForm })
        })
    }



    render() {
        return (


            !this.state.showForm ?
                <div className= "col-sm-2 col-sm-push-1">
                <button onClick={this.handleClick} className="btn btn-success"> Registracija i Prijava </button>
                </div>
                :
                <Registracije />
        )
    }



}



export default RegisteerForm