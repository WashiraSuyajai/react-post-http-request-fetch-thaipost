import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getResult = this.getResult.bind(this)
    this.state = {
      postToken: null,
      barcode: "",
      data: ""
    };
  }

  componentDidMount() {
    // POST request using fetch with set headers
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Token X#W/K|McRkXjCrO=Z@M$EzEQBWFcWfOKWpI0ThHNEHAsXQG%TwY_Q?TcCaY7APGQAeSIM5CzNSAkP$FNQkBcR;IWX&Y7O!BXSHDz"
      },
      body: JSON.stringify({ title: "React POST Request Example" })
    };
    // Fetch to response JWT
    fetch(
      "https://trackapi.thailandpost.co.th/post/api/v1/authenticate/token",
      requestOptions
    )
      .then(response => response.json())
      .then(data => this.setState({ postToken: data.token }));
  }

  getResult(){
    // POST request using fetch with set headers and body
    const requestJwt = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + this.state.postToken
      },
      body: JSON.stringify({
        status: "all",
        language: "TH",
        barcode: [this.state.barcode] //Sample Track "EF071817398TH"
      })
    };
    // Fetch to response Data
    fetch("https://trackapi.thailandpost.co.th/post/api/v1/track", requestJwt)
      .then(response => response.json())
      .then(result => this.setState({ data: result }));
    // .then(result => this.setState({data:result}))
    // .then(result => console.log(result))
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ barcode: this.element.value });
    this.getResult()
  }

  render() {
    const { postToken } = this.state;
    const { barcode } = this.state;
    const { data } = this.state;
    return (
      <div>
        <div className="container card text-center m-3">
          <h5 className="card-header">
            POST Request with Set Headers to require JWT Token
          </h5>
          <div className="card-body">Returned JWT : {postToken}</div>
        </div>
        {/* Form to enter track barcode which require data */}
        <form
          className="container form-group mx-sm-3 mb-2"
          onSubmit={this.handleSubmit}
        >
          <label>
            <h5 className="">Enter Track Barcode Here</h5>
            <input
              className="form-control"
              type="text"
              ref={el => (this.element = el)}
            />
          </label>
          <br />
          <input
            className="btn btn-primary mb-2"
            type="submit"
            value="Submit"
          />
          <div className="card-body">Returned barcode : {barcode}</div>
        </form>
        {/* https://stackoverflow.com/questions/44767821/react-js-how-to-set-state-on-form-submit */}

        <div className="container card text-center m-3">
          <h5 className="card-header">
            POST Request with Set Headers to get data
          </h5>
          <div className="card-body">Returned data : {data.message}</div>
        </div>
      </div>
    );
  }
}

export default App;