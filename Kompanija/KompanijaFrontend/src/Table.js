import React from 'react'



class Table extends React.Component {

    constructor() {
        super()
        this.state = {
            data: [],
            isLoading: true
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



    render() {

        if (!this.isLoading) {
            const rows = this.state.data.map(x => <tr key={x.Id}><td>{x.ImeIPrezime}</td><td>{x.GodinaRodjenja}</td><td>{x.Rola}</td><td>{x.Tim.Ime}</td></tr>)

            return (
                <div>
                    <br/>
                    <br/>
                    <div className= "col-sm-6 col-sm-push-1">
                    <table border="1px" className="table table-striped">
                        <thead>
                            <tr>
                                <th> Ime i Prezime</th>
                                <th> Godina Rodjenja</th>
                                <th> Rola</th>
                                <th> Tim</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                    </div>                    
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



export default Table