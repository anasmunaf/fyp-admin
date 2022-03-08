/** @format */

import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectionField(props) {
  const { menu, label } = props;
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id={label}>{label}</InputLabel>
        <Select labelId={label} id={label} label={label} onChange={undefined}>
          <MenuItem value={""}>
            <em>None</em>
          </MenuItem>
          {menu.map((item) => (
            <MenuItem key={item} value={item || ""}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
