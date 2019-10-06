import React, { Component } from "react";
import "./App.scss";

export default class App extends Component {
  state = {
    report: {
      name: "",
      email: "",
      message: ""
    },
    formSubmitted: false
  };

  handleChange = this.handleChange.bind(this);
  handleSubmit = this.handleSubmit.bind(this);

  handleChange(field, value) {
    this.setState({
      report: Object.assign({}, this.state.report, { [field]: value })
    });
  }

  handleSubmit(event, report) {
    event.preventDefault();
    (async () => {
      const rawResponse = await fetch(
        "https://YOUR-AWS-ENDPOINT.execute-api.YOUR-REGION.amazonaws.com/dev/email/send",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(report)
        }
      );
      if (rawResponse.ok) {
        alert("Sent! :)");
      } else {
        alert("Error! :(");
      }
    })();
  }

  render() {
    return (
      <div className="container">
        <form
          className="form"
          onSubmit={e => this.handleSubmit(e, this.state.report)}
        >
          <h1>Contact form</h1>
          <p>Name</p>
          <input
            name="name"
            onChange={event =>
              this.handleChange("name", event.target.value)
            }
            placeholder="Sarah"
          />
          <p>Email</p>
          <input
            name="email"
            type="email"
            onChange={event => this.handleChange("email", event.target.value)}
            placeholder="hey@sarah.com"
          />
          <p>Message</p>
          <textarea
            onChange={event => this.handleChange("message", event.target.value)}
            placeholder="I like your cool websites and I would love you to build mine! :)"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
