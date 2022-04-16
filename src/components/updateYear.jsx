/** @format */
/** @format */

import React, { useState, useEffect, useLayoutEffect } from "react";
import SelectionField from "./selectionField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FileUploader from "./DnD.tsx";
import Http from "./http";
import { useParams } from "react-router-dom";

const UpdateYear = () => {
  const [options, setOptions] = useState({});
  const [File, setFile] = useState({});
  const [preData, setPreData] = useState({});
  const { id } = useParams();
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

  useEffect(() => {
    getDataById().then((res) => setPreData(res));
  }, []);

  let formData = new FormData();

  formData.append("subject", options.subject);
  formData.append("year", options.year);
  formData.append("month", options.month);
  formData.append("category", options.category);
  formData.append("paper", options.paper);
  formData.append("pdf", File.target?.files[0]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    Http.put(`http://localhost:5000/api/yearly/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }).then((res) => console.log(res));
  };
  const getDataById = async () => {
    return await Http.get(`http://localhost:5000/api/yearly/${id}`);
  };
  console.log(preData);
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
            preValue={preData.data?.subject}
          />
          <SelectionField
            selects={selections(selection)("year")}
            label={"Year"}
            menu={["2015", "2016", "2017", "2018", "2019", "2020"]}
            preValue={preData.data?.year}
          />
          <SelectionField
            selects={selections(selection)("month")}
            label={"Month"}
            menu={["Summer", "Winter"]}
            preValue={preData.data?.month}
          />
          <SelectionField
            selects={selections(selection)("category")}
            label={"Category"}
            menu={["QS", "MS"]}
            preValue={preData.data?.category}
          />
          <SelectionField
            selects={selections(selection)("paper")}
            label={"Variant"}
            menu={["P1", "P2"]}
            preValue={preData.data?.paper}
          />
        </Box>
        <br />
        <Button fullWidth variant='contained' component='label'>
          <input type='file' id='pdf' name='pdf' required onChange={setFile} />
        </Button>
        {/* <FileUploader fileData={setFile} /> */}
        <br />
        <br />
        <div
          style={{ display: "flex", flexWidth: 1, justifyContent: "center" }}
        >
          <Button
            type='submit'
            sx={{ p: 2, m: 3, width: "200px" }}
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

export default UpdateYear;

{
  /* <Button variant='contained' component='label'>
Upload File
<input type='file' hidden />
</Button> */
}
