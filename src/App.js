import React, { useState } from "react";
import MaterialTable from "material-table";
import axios from "axios";

import "./App.css";

function App() {
  const [order, setOrder] = useState({ field: "name", order: "name" });

  const loadData = (resolve, reject, query) => {
    let url =
      "https://gateway.marvel.com/v1/public/characters?ts=emerson&apikey=7b0eb4dbf3375d03258105ffa79204ff&hash=b040881fe4b12a2c9dd797071055c52d";
    //url += "per_page=" + query.pageSize; ou page_size
    //url += "&page=" + (query.page + 1);

    axios
      .get(url, {
        params: {
          limit: query.pageSize,
          offset: query.page + 1,
          orderBy: order.order,
        },
      })
      .then((result) => {
        console.log(result.data.data);
        resolve({
          data: result.data.data.results,
          page: result.data.data.offset - 1,
          totalCount: result.data.data.total,
        });
      });
  };

  const colunas = [
    {
      title: "Thumb",
      field: "thumbnail",
      sorting: false,
      render: (rowData) => (
        <img
          style={{ height: 82, borderRadius: "20%" }}
          src={rowData.thumbnail.path + ".jpg"}
          alt="thumb"
        />
      ),
    },
    { title: "Id", field: "id", sorting: false },
    { title: "Name", field: "name" },
    { title: "Description", field: "description", sorting: false },
  ];

  return (
    <div className="App">
      <MaterialTable
        title="Usuários"
        columns={colunas}
        data={(query) =>
          new Promise((resolve, reject) => {
            loadData(resolve, reject, query);
          })
        }
        onOrderChange={(colId, ord) => {
          let ordem = "name";
          if (ord === "desc") {
            ordem = "-name";
          }

          setOrder({ field: "name", order: ordem });
        }}
      />
    </div>
  );
}

export default App;
