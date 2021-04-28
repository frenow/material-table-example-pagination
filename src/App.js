import React, { useState } from "react";
import MaterialTable from "material-table";
import axios from "axios";

import "./App.css";

function App() {

  const [selectedRowId, setSelectedRowId] = useState(null);
  const [selected, setSelected] = useState(false);

  const loadData = (resolve, reject, query) => {
    let url =
      "https://gateway.marvel.com/v1/public/characters?ts=emerson&apikey=7b0eb4dbf3375d03258105ffa79204ff&hash=b040881fe4b12a2c9dd797071055c52d";
    console.log(query);
    let orderBy = "";
    let direction = "";
    let params = "";
    if (query.orderDirection === "desc") {
      direction = "-";
    }
    if (query.orderBy) {
      orderBy = direction + query.orderBy.field;
    }

    query.search
      ? (params = {
          limit: query.pageSize,
          offset: query.page + 1,
          orderBy: orderBy,
          nameStartsWith: query.search,
        })
      : (params = {
          limit: query.pageSize,
          offset: query.page + 1,
          orderBy: orderBy,
        });

    axios
      .get(url, {
        params: params,
      })
      .then((result) => {
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
    { title: "Name", field: "name", defaultSort: "asc" },
    { title: "Description", field: "description", sorting: false },
  ];

  return (
    <div className="App">
      <MaterialTable
        title="Marvel Heroes"
        columns={colunas}

        options={{
          rowStyle: rowData => ({
            backgroundColor:
              selected &&
              rowData.tableData.id === selectedRowId
                ? "#87CEEB"
                : "#FFF"
          })
        }} 
        actions={[
          {
            icon: () => <button>Editar</button>,
            onClick: (event, rowData) =>
              new Promise((resolve, reject) => {
                if (rowData.tableData.id === selectedRowId){
                  setSelected(false);
                  setSelectedRowId(null);
                } else {
                  setSelected(true);
                  setSelectedRowId(rowData.tableData.id);
                }
              }),
          },
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
