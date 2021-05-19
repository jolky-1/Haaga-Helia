import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

function AddTraining(props) {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({
    date: "",
    activity: "",
    duration: "",
    customer: props.link,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    props.addTraining(training);
    setOpen(false);
  };

  const InputChanged = (event) => {
    setTraining({ ...training, [event.target.name]: event.target.value });
  };
  return (
    <div>
      <Button color="primary" onClick={handleClickOpen}>
        Add Training
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          New Training for {props.customer.firstname} {props.customer.lastname}
        </DialogTitle>
        <DialogContent>
          <TextField
            type="date"
            margin="dense"
            name="date"
            value={training.date}
            onChange={InputChanged}
            fullWidth
          />
          <FormControl style={{ width: "40%" }}>
            <InputLabel>Activity</InputLabel>
            <Select
              label="Activity"
              name="activity"
              value={training.activity}
              onChange={InputChanged}
              fullWidth
            >
              <MenuItem value="Jogging">Jogging</MenuItem>
              <MenuItem value="Boxing">Boxing</MenuItem>
              <MenuItem value="Cycling">Cycling</MenuItem>
              <MenuItem value="Gym training">Gym training</MenuItem>
              <MenuItem value="Spinning">Spinning</MenuItem>
              <MenuItem value="Zumba">Zumba</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Duration (min)"
            name="duration"
            value={training.duration}
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

export default AddTraining;
