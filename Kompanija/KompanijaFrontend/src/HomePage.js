import React from 'react'
import Clock from './Clock'
import RegisteerForm from "./RegisteerForm"
import Table from "./Table"
import TableUlogovan from "./TableUlogovan"



class HomePage extends React.Component {

    handleClick = () => {

        sessionStorage.removeItem("token")
        sessionStorage.removeItem("user")
        window.location.reload()
    }

    render() {

        return (

            <div>
                <Clock />   
                          
                {sessionStorage.getItem("token") ? <h3>Prijavljeni korisnik: {sessionStorage.getItem("user")} </h3> : <h1 style={{ marginLeft: "20px" }}>Korisnik nije prijavljen na sistem!</h1>}
                {sessionStorage.getItem("token") ? null : <RegisteerForm />}
                {sessionStorage.getItem("token") ? <button className="btn btn-danger" style={{float:"right"}} onClick={this.handleClick} >Odjava</button> : null}
                <br/>
                {sessionStorage.getItem("token") ? <TableUlogovan /> : <Table />}
                

            </div>
        )

    }

}


export default HomePage