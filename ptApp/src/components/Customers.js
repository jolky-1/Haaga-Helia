import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";
import Snackbar from "@material-ui/core/Snackbar";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);

  const openSnackbar = () => {
    setOpen(true);
  };

  const closeSnackbar = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data.content))
      .catch((err) => console.error(err));
  };

  const addCustomer = (newCustomer) => {
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      body: JSON.stringify(newCustomer),
      headers: { "Content-type": "application/json" },
    })
      .then((response) => {
        if (response.ok) fetchCustomers();
        else alert("Something went wrong");
      })
      .catch((err) => console.error(err));
  };

  const editCustomer = (url, updatedCustomer) => {
    fetch(url, {
      method: "PUT",
      body: JSON.stringify(updatedCustomer),
      headers: { "Content-type": "application/json" },
    })
      .then((response) => {
        if (response.ok) fetchCustomers();
        else alert("Something went wrong");
      })
      .catch((err) => console.error(err));
  };

  const deleteCustomer = (url) => {
    if (window.confirm("Are you sure?")) {
      fetch(url, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            openSnackbar();
            fetchCustomers();
          } else alert("Something went wrong!");
        })
        .catch((err) => console.error(err));
    }
  };

  const addTraining = (newTraining) => {
    fetch("https://customerrest.herokuapp.com/api/trainings", {
      method: "POST",
      body: JSON.stringify(newTraining),
      headers: { "Content-type": "application/json" },
    })
      .then((response) => {
        if (response.ok) console.log("excercise added");
        else console.log("oops smth went wrong");
      })
      .catch((err) => console.error(err));
  };

  const columns = [
    { field: "firstname", sortable: true, filter: true },
    { field: "lastname", sortable: true, filter: true },
    { field: "streetaddress", sortable: true, filter: true },
    { field: "postcode", sortable: true, filter: true },
    { field: "email", sortable: true, filter: true },
    { field: "phone", sortable: true, filter: true },
    {
      headerName: "",
      field: "links.0.href",
      cellRendererFramework: (params) => (
        <AddTraining
          customer={params.data}
          link={params.value}
          addTraining={addTraining}
        />
      ),
    },
    {
      headerName: "",
      field: "links.0.href",
      width: 50,
      cellRendererFramework: (params) => (
        <EditCustomer
          link={params.value}
          customer={params.data}
          editCustomer={editCustomer}
        />
      ),
    },
    {
      headerName: "",
      field: "links.0.href",
      width: 60,
      cellRendererFramework: (params) => (
        <IconButton
          color="secondary"
          onClick={() => deleteCustomer(params.value)}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <div
      className="ag-theme-alpine"
      style={{ height: 550, width: "80%", margin: "auto" }}
    >
      <AddCustomer addCustomer={addCustomer} />
      <AgGridReact
        rowData={customers}
        columnDefs={columns}
        pagination={true}
        paginationPageSize={10}
        suppressCellSelection={true}
      ></AgGridReact>
      <Snackbar
        open={open}
        message="Customer deleted"
        autoHideDuration={3000}
        onClose={closeSnackbar}
      />
    </div>
  );
}

export default Customers;
