import React from "react";
import MaterialTable from "material-table";
import axios from "axios";

import "./App.css";

function App() {
  const loadData = (resolve, reject, query) => {
    let url = "https://reqres.in/api/users?";
    url += "per_page=" + query.pageSize;
    url += "&page=" + (query.page + 1);
    axios.get(url).then((result) => {
      console.log(url);
      console.log(result.data);
      resolve({
        data: result.data.data,
        page: result.data.page - 1,
        totalCount: result.data.total,
      });
    });
  };
  return (
    <div className="App">
      <MaterialTable
        title="Usuários"
        columns={[
          { title: "Id", field: "id" },
          { title: "First Name", field: "first_name" },
          { title: "Last Name", field: "last_name" },
          { title: "Email", field: "email" },
        ]}
        data={(query) =>
          new Promise((resolve, reject) => {
            loadData(resolve, reject, query);
          })
        }
      />
    </div>
  );
}

export default App;
