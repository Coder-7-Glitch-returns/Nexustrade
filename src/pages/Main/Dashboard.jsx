import React from "react";
import Cards from "../../components/Main/Dashboard/Cards";
import Holdings from "../../components/Main/Dashboard/Holdings";

function Dashboard() {
  return (
    <div className="space-y-8 min-h-screen">
      <Cards />
      <Holdings />
    </div>
  );
}

export default Dashboard;
