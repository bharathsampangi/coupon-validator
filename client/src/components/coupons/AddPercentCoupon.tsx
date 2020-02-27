import React from "react";

class AddPercentCoupon extends React.Component {
  state = {
    coupon_code: "",
    minimum_amount: 0,
    discount_percentage: 0,
    maximum_amount: 0,
    validity: 0
  };

  handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    let {
      coupon_code,
      minimum_amount,
      discount_percentage,
      maximum_amount,
      validity
    } = this.state;
    const response = await fetch("/api/add-percent-coupon", {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        coupon_code,
        minimum_amount,
        discount_percentage,
        maximum_amount,
        validity
      })
    });
    const data = await response.json();
    console.log(data);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Add Percent Coupon</h1>
        <div className="form-group">
          <label>Coupon code</label>
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
          <label>Minimum cart value</label>
          <input
            type="number"
            name="minimum_amount"
            className="form-control"
            required
            onChange={evt => {
              this.setState({ minimum_amount: evt.target.value });
            }}
          />
        </div>
        <div className="form-group">
          <label>Discount percentage</label>
          <input
            type="number"
            name="discount_percentage"
            className="form-control"
            required
            min="0"
            max="100"
            onChange={evt => {
              this.setState({ discount_percentage: evt.target.value });
            }}
          />
        </div>
        <div className="form-group">
          <label>Maximum discount (max discount amount to be applied)</label>
          <input
            type="number"
            name="maximum_amount"
            className="form-control"
            required
            onChange={evt => {
              this.setState({ maximum_amount: evt.target.value });
            }}
          />
        </div>
        <div className="form-group">
          <label>Validity (in Days)</label>
          <input
            type="number"
            name="validity"
            className="form-control"
            required
            min="0"
            max="30"
            onChange={evt => {
              this.setState({ validity: evt.target.value });
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

export default AddPercentCoupon;
