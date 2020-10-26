import React from 'react'
import axios from 'axios'


class Registracije extends React.Component {
    constructor() {
        super()
        this.state = {
            isPrijava: true,
            email: "",
            password: "",
            password2: ""
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target

        this.setState({ [name]: value })

    }
    register = () => {


        const registerData = {
            Email: this.state.email,
            Password: this.state.password,
            ConfirmPassword: this.state.password2,
        }

        axios("http://localhost:49772/api/Account/Register", {
            method: "POST",
            data: registerData
        }).then(() => {
            this.setState({ email: "", password: "", password2: "" })
            alert("Registracija Korisnika je USPESNA!")
        })
            .catch(() => {
                alert("Registracija Korisnika NEUSPESNA! \nMolimo Vas popunite sva polja! Lozinka mora da sadrzi najmanje kombinaciju 6 simbola, slova (jedno slovo mora da bude veliko) i broja!")
            })
    }

    prijava = () => {
        fetch("http://localhost:49772/Token", {
            method: "POST",
            body: 'grant_type=password&username=' + this.state.email + '&password=' + this.state.password,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(response => response.json())
            .then(data => {
                if (!data.access_token) {
                    alert("GRESKA pri prijavi! \nMolimo Vas pokusajte ponovo! ")
                    this.setState({ email: "", password: "" })
                    return;
                }
                
                sessionStorage.setItem("token", data.access_token)
                console.log(sessionStorage.getItem("token"))
                sessionStorage.setItem("user", this.state.email)
                this.setState({ email: "", password: "" })
                window.location.reload()
            })
    }

    handleClick = (event) => {
        event.preventDefault()
        this.setState(prevState => {
            return ({ isPrijava: !prevState.isPrijava })
        })

    }

    navigateBack = function () {
        this.goHomePage();
        
    } 

    handleSubmit = (event) => {
        event.preventDefault()
        if (!this.state.isPrijava) {
            this.register()
        } else {
            this.prijava()
        }
    }

    render() {
        return (
            
            <div className= "col-sm-3">
            <form className="form-group" style={{ marginTop: "50px" }}>
                <label> <strong> Korisnicko ime: </strong> </label>
                <input type="text"
                    placeholder="Korisnicko ime"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                />
                <br />
                <label> <strong> Lozinka: </strong> </label>
                <input type="password"
                    placeholder="Lozinka"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                />
                <br />

                {this.state.isPrijava ? null : <div>
                    <label> <strong> Ponovi lozinku: </strong> </label>
                    <input type="password"
                        placeholder="Lozinka2"
                        className="form-control"
                        name="password2"
                        value={this.state.password2}
                        onChange={this.handleChange}
                    />
                    <br />
                </div>
                
                }

                <button onClick={this.handleClick} className="btn btn-primary" style={{ marginRight: "5px" }}> {this.state.isPrijava ? "Registracija" : "Prijava"} </button>
                <button onClick={this.handleSubmit} className="btn btn-primary" style={{ marginRight: "5px" }}> {this.state.isPrijava ? "Prijavi se" : "Registruj se"}  </button>
                <button onClick={this.navigateBack} className="btn btn-warning" > Nazad </button> 
               
            </form>
            </div>
        )
    }
}

export default Registracije