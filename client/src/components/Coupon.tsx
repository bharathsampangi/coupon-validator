import React from "react";

class Coupon extends React.Component {
  render() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="couponCode">Coupon Code</label>
          <input className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="Total amount">Total amount</label>
          <input className="form-control" />
        </div>
      </form>
    );
  }
}

export default Coupon;
