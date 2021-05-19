import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

function EditCustomer(props) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState({
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: "",
  });

  const handleClickOpen = () => {
    setCustomer({
      firstname: props.customer.firstname,
      lastname: props.customer.lastname,
      streetaddress: props.customer.streetaddress,
      postcode: props.customer.postcode,
      city: props.customer.city,
      email: props.customer.email,
      phone: props.customer.phone,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    props.editCustomer(props.link, customer);
    setOpen(false);
  };

  const InputChanged = (event) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };
  return (
    <div>
      <IconButton variant="outlined" color="primary" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Customer</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Firstname"
            name="firstname"
            value={customer.firstname}
            onChange={InputChanged}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Lastname"
            name="lastname"
            value={customer.lastname}
            onChange={InputChanged}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Street address"
            name="streetaddress"
            value={customer.streetaddress}
            onChange={InputChanged}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Postcode"
            name="postcode"
            value={customer.postcode}
            onChange={InputChanged}
            fullWidth
          />
          <TextField
            margin="dense"
            label="City"
            name="city"
            value={customer.city}
            onChange={InputChanged}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            value={customer.email}
            onChange={InputChanged}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Phone"
            name="phone"
            value={customer.phone}
            onChange={InputChanged}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditCustomer;
