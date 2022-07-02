/** @format */

import * as React from "react";
import { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectionField(props) {
  const { menu, label, selects, preValue } = props;
  const [value, setValue] = useState();
  const [name, setName] = useState();

  useEffect(() => {
    setValue(preValue);
  }, [preValue]);
  selects(value);
  return (
    <div sx={{ m: 1, minWidth: 120 }}>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id={label}>{label}</InputLabel>
        <Select
          required={true}
          labelId={label}
          id={label}
          label={label}
          name={label}
          value={value || ""}
          onChange={(e) => {
            setValue(e.target.value);
            setName(e.target.name);
          }}
        >
          <MenuItem>
            <em>None</em>
          </MenuItem>
          {menu.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
