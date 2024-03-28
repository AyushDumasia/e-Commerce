import React, { useEffect } from "react";

function Dashboard() {
  let valideUser = async () => {
    let token = localStorage.getItem("usersdatatoken");
    // console.log(token);
    const res = await fetch("http://localhost:3000/validUser", {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: token },
    });

    const data = await res.json();
    console.log(data);
    if (data.status == 401 || !data) {
      history("*");
    } else {
      console.log("user verify");
      //   setLoginData(data);
      history("/dash");
    }
  };

  useEffect(() => {
    valideUser();
  });

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}

export default Dashboard;
