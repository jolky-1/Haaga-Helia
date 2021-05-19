import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import moment from "moment";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Snackbar from "@material-ui/core/Snackbar";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

function Trainings() {
  const [trainings, setTrainings] = useState([]);
  const [open, setOpen] = useState(false);

  const openSnackbar = () => {
    setOpen(true);
  };

  const closeSnackbar = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then((response) => response.json())
      .then((data) => {
        setTrainings(data);
      })
      .catch((err) => console.error(err));
  };

  const deleteTraining = (id) => {
    if (window.confirm("Are you sure?")) {
      fetch("https://customerrest.herokuapp.com/api/trainings/" + id, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            openSnackbar();
            fetchTrainings();
          } else alert("Something went wrong!");
        })
        .catch((err) => console.error(err));
    }
  };

  const columns = [
    {
      field: "activity",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Duration(min)",
      field: "duration",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Date",
      field: "date",
      sortable: true,
      filter: true,
      cellRendererFramework: (params) =>
        moment(params.value).format("MMM DD YYYY h:mm A"),
    },
    {
      headerName: "Customer",
      field: "customer.firstname",
      sortable: true,
      filter: true,
      width: 200,
    },
    {
      headerName: "",
      field: "customer.lastname",
      sortable: true,
      filter: true,
      width: 100,
    },
    {
      headerName: "",
      field: "links.0.href",
      width: 100,
      cellRendererFramework: (params) => (
        <IconButton
          color="secondary"
          onClick={() => deleteTraining(params.data.id)}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <div
      className="ag-theme-alpine"
      style={{ height: 550, width: "60%", margin: "auto" }}
    >
      <AgGridReact
        rowData={trainings}
        columnDefs={columns}
        pagination={true}
        paginationPageSize={10}
        suppressCellSelection={true}
      ></AgGridReact>
      <Snackbar
        open={open}
        message="Training deleted"
        autoHideDuration={3000}
        onClose={closeSnackbar}
      />
    </div>
  );
}

export default Trainings;
