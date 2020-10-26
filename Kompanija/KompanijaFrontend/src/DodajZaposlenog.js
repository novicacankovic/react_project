import React from 'react'
import axios from "axios"

class DodajZaposlenog extends React.Component {

    constructor() {
        super()
        this.state = {
            id: "",
            imeIPrezime: "",
            godinaRodjenja: "",
            rola: "",
            godinaZaposlenja: "",
            plata: "",
            tim: "",
            timovi: [],
            errors: []
        }

        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleOnBlur = this.handleOnBlur.bind(this);
    }


    handleSubmit = (event) => {
        console.log("usao u event")
        event.preventDefault()
        axios("http://localhost:49772/api/Zaposleni/", {
            method: "POST",
            headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
            data: {

                ImeIPrezime: this.state.imeIPrezime,
                GodinaRodjenja: this.state.godinaRodjenja,
                GodinaZaposlenja: this.state.godinaZaposlenja,
                Rola: this.state.rola,
                Plata: this.state.plata,
                TimId: this.state.tim
            }
        }).then(() => alert("Zaposleni je uspesno unet u sistem!"))
            .then(() => { window.location.reload() })

            .catch(() => {
                alert("Doslo je do greske! Molim Vas popunite sva polja! ")
            })

    }

    handleChange = (event) => {
        const { value, name } = event.target
        this.setState({ [name]: value })
    }

    handleSelectChange(event) {
        this.setState({ tim: event.target.value });
    }

    handleOnBlur(event) {
        const value = event.target.value;
        const errors = [...this.state.errors];

        if (value === "") {
            errors[event.target.name] = true;
            this.setState({ errors });
        } else {
            errors[event.target.name] = false;
            this.setState({ errors });
        }
    }

    componentDidMount() {
        fetch("http://localhost:49772/api/Timovi/", { method: "GET" })
            .then(response => response.json())
            .then(data => {
                console.log(this.state.tim)


                this.setState({ timovi: data })
            })
    }

    render() {
        const option1 = <option></option>
        const options = this.state.timovi.map(x => <option value={x.Id} key={x.Id} className="form-control"> {x.Ime} </option>)

        console.log(this.state.errors);
        return (
            <div className="col-sm-6 col-sm-push-4">
                <form className="form-group" style={{ marginTop: "50px" }}>
                    <h4>Dodaj novog Zaposlenog:</h4>
                    <label> <strong> Tim: </strong> </label>
                    <select name="tim" className="form-control" onChange={this.handleSelectChange} value={this.state.tim}>
                        [{option1},{options}]
                    </select>
                    <br />
                    <label> <strong> Ime i prezime: </strong> </label>
                    <input type="text"
                        className="form-control"
                        name="imeIPrezime"
                        value={this.state.imeIPrezime}
                        onChange={this.handleChange}
                        onBlur={this.handleOnBlur}
                    />
                    {
                        this.state.errors['imeIPrezime'] && (
                            <small className="text-danger">Ovo polje je obavezno!</small>
                        )
                    }
                    <br />
                    <label> <strong> Godina rodjenja: </strong> </label>
                    <input type="number"
                        className="form-control"
                        name="godinaRodjenja"
                        value={this.state.godinaRodjenja}
                        onChange={this.handleChange}
                        onBlur={this.handleOnBlur}
                    />
                    {
                        this.state.errors['godinaRodjenja'] && (
                            <small className="text-danger">Ovo polje je obavezno! Molim Vas uneseti interval izmedju 1960-1994. godine</small>
                        )
                    }
                    <br />
                    <label> <strong> Godina zaposlenja: </strong> </label>
                    <input type="number"
                        className="form-control"
                        name="godinaZaposlenja"
                        value={this.state.godinaZaposlenja}
                        onChange={this.handleChange}
                        onBlur={this.handleOnBlur}
                    />
                    {
                        this.state.errors['godinaZaposlenja'] && (
                            <small className="text-danger">Ovo polje je obavezno! Molim Vas uneseti interval izmedju 2001-2019. godine</small>
                        )
                    }
                    <br />
                    <label> <strong> Rola: </strong> </label>
                    <input type="text"
                        className="form-control"
                        name="rola"
                        value={this.state.rola}
                        onChange={this.handleChange}
                        onBlur={this.handleOnBlur}
                    />
                    {
                        this.state.errors['rola'] && (
                            <small className="text-danger">Ovo polje je obavezno!</small>
                        )
                    }
                    <br />
                    <label> <strong> Plata: </strong> </label>
                    <input type="number"
                        className="form-control"
                        name="plata"
                        value={this.state.plata}
                        onChange={this.handleChange}
                        onBlur={this.handleOnBlur}
                    />
                    {
                        this.state.errors['plata'] && (
                            <small className="text-danger">Ovo polje je obavezno!</small>
                        )
                    }
                    <br />
                    <button onClick={this.handleSubmit} className="btn btn-primary" style={{ marginRight: "5px" }}> Dodaj  </button>
                    <button onClick={this.handleCancel} className="btn btn-warning"> Odustani  </button>
                </form>
            </div>
        )
    }
}




export default DodajZaposlenog