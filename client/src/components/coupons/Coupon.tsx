import React from "react";
import { Redirect } from "react-router-dom";

class Coupon extends React.Component {
  state = { total_amount: 0, coupon_code: "", navigate: false, data: "" };

  handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    let total = this.state.total_amount;
    let coupon = this.state.coupon_code;
    const response = await fetch("/api/validate", {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        total_amount: total,
        coupon_code: coupon
      })
    });
    const data = await response.json();
    this.setState({ data });
    this.setState({ navigate: true });
  };

  render() {
    if (this.state.navigate) {
      return (
        <Redirect
          to={{
            pathname: "/status",
            state: this.state.data
          }}
        />
      );
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Validate Coupon</h3>
        <div className="form-group">
          <label htmlFor="coupon_code">Coupon Code</label>
          <input
            type="text"
            className="form-control"
            name="coupon_code"
            required
            onChange={evt => {
              this.setState({ coupon_code: evt.target.value });
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="total_amount">Total amount</label>
          <input
            type="number"
            name="total_amount"
            className="form-control"
            required
            onChange={evt => {
              this.setState({ total_amount: evt.target.value });
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}

export default Coupon;
