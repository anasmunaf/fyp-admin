/** @format */

import React, { useState, useRef } from "react";
import SelectionField from "./selectionField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FileUploader from "./DnD.tsx";
// import Grid from "@mui/material/Grid";
import Http from "./http";
import axios from "axios";
const NewYear = () => {
  const [options, setOptions] = useState({});
  const [File, setFile] = useState({});

  // let file;

  // const func = () =>
  //   File.target ? (file = { ...File.target.files[0] }) : null;
  // // func();

  const selection = (name, value) => {
    options[name] = value ? value : null;
  };
  function selections(selection) {
    return function (a) {
      return function (b) {
        return selection(a, b);
      };
    };
  }
  let formData = new FormData();

  formData.append("subject", options.subject);
  formData.append("year", options.year);
  formData.append("month", options.month);
  formData.append("category", options.category);
  formData.append("paper", options.paper);
  formData.append("pdf", File.target?.files[0]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    Http.post("/api/yearly/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }).then((res) => console.log(res));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            p: 4,
            m: 4,
          }}
        >
          <SelectionField
            selects={selections(selection)("subject")}
            label={"Subject"}
            menu={["Maths", "Physics", "Chemistry"]}
          />
          <SelectionField
            selects={selections(selection)("year")}
            label={"Year"}
            menu={["2015", "2016", "2017", "2018", "2019", "2020"]}
          />
          <SelectionField
            selects={selections(selection)("month")}
            label={"Month"}
            menu={["Summer", "Winter"]}
          />
          <SelectionField
            selects={selections(selection)("category")}
            label={"Category"}
            menu={["QS", "MS"]}
          />
          <SelectionField
            selects={selections(selection)("paper")}
            label={"Variant"}
            menu={["P1", "P2"]}
          />
        </Box>
        <br />
        <Button fullWidth variant='contained' component='label'>
          <input type='file' id='pdf' name='pdf' required onChange={setFile} />
        </Button>
        {/* <FileUploader fileData={setFile} /> */}
        <div
          style={{ display: "flex", flexWidth: 1, justifyContent: "center" }}
        >
          <Button
            type='submit'
            sx={{ p: 2, m: 3 }}
            size={"large"}
            variant={"contained"}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewYear;

{
  /* <Button variant='contained' component='label'>
Upload File
<input type='file' hidden />
</Button> */
}
