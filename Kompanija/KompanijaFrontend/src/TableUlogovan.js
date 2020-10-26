import React from 'react'
import DodajZaposlenog from "./DodajZaposlenog"
import axios from "axios"


class TableUlogovan extends React.Component {

    constructor() {
        super()
        this.state = {
            data: [],
            isLoading: true,
            zaposlen: ""

        }
    }

    componentDidMount() {
        fetch("http://localhost:49772//api/Zaposleni", { method: "GET" })
            .then(response => response.json())
            .then(data => {

                this.setState({
                    data: data
                })
                this.setState({ isLoading: false })
            })
    }

    handleClick = (event) => {

        axios("http://localhost:49772/api/Zaposleni/" + event.target.name, {
            method: "DELETE",
            headers: { Authorization: "Bearer " + this.state.token }
        })
            .then(() => { window.location.reload() }) 
             
       
    }



    render() {

        if (!this.isLoading) {
            const rows = this.state.data.map(x => <tr key={x.Id}><td>{x.ImeIPrezime}</td><td>{x.GodinaRodjenja}</td><td>{x.Rola}</td><td>{x.Tim.Ime}</td><td>{x.Plata}</td>
                <td><button onClick={this.handleClick} className="btn btn-danger" name={x.Id}>Obrisi</button></td></tr>)

            return (
                <div>
                    <div style={{ marginTop: 50 }}>
                        <div className="col-sm-8 col-sm-push-2">

                            <table border="1px" className="table table-striped">
                                <thead>
                                    <tr>
                                        <th> Ime i Prezime</th>
                                        <th> Godina Rodjenja</th>
                                        <th> Rola</th>
                                        <th> Tim</th>
                                        <th> Plata</th>
                                        <th> Akcija</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows}
                                </tbody>
                            </table>

                        </div>
                    </div>
                    {sessionStorage.getItem("token") ? <DodajZaposlenog /> : null}
                </div>
            )
        }


        else {
            return (
                <h1> Jos se ucitava </h1>
            )
        }

    }
}



export default TableUlogovan