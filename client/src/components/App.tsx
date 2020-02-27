import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./Header";
import Coupon from "./coupons/Coupon";
import AddFlatCoupon from "./coupons/AddFlatCoupon";
import AddPercentCoupon from "./coupons/AddPercentCoupon";
import ShowStatus from "./status/ShowStatus";

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <Header />
          <Route path="/" exact component={Coupon} />
          <Route path="/addflat" component={AddFlatCoupon} />
          <Route path="/addpercent" component={AddPercentCoupon} />
          <Route path="/status" component={ShowStatus} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
