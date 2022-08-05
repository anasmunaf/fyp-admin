/** @format */

import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CustomizedTables from "./table";
import Http from "./http";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function debugBase64(base64URL) {
  var win = window.open();
  win.document.write(
    '<iframe src="' +
      base64URL +
      '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>'
  );
}

async function getPdf(id) {
  await Http.get(`https://slc-backend.herokuapp.com/api/yearly/pdf/${id}`).then(
    (data) => {
      debugBase64(`data:application/pdf;base64,${data?.data?.pdf.buffer}`);
    }
  );
}

async function get() {
  const yearly = await Http.get(
    "https://slc-backend.herokuapp.com/api/topical/o-level/"
  );
  let rows = [];
  yearly.data.map((arr) => {
    const {
      _id,
      topic,
      subject,
      year,
      month,
      category,
      paper,
      question,
      answer,
    } = arr;
    rows.push({
      subject,
      topic,
      year,
      month,
      category,
      paper,
      question: (
        <Button target="_blank" href={question}>
          Open PDF
        </Button>
      ),
      answers: (
        <Button target="_blank" href={answer}>
          Open PDF
        </Button>
      ),

      SettingsIcon: (
        <div>
          <Link to={`/yearly/${_id}`}>
            <EditIcon />
          </Link>
          <DeleteIcon
            sx={{ color: "red", ml: 4 }}
            style={{ cursor: "pointer", hover: { color: "black" } }}
          />
        </div>
      ),
    });
  });
  return rows;
}

const heads = [
  "Subject",
  "Topic",
  "Year",
  "Month",
  "Type",
  "Paper",
  "Question",
  "Answers",
  "Actions",
];

const Topical = () => {
  const [row, setRow] = useState();

  useEffect(() => {
    get().then((res) => {
      setRow(res);
    });
  }, []);
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Categorical Data Management </h1>
      <Box sx={{ width: 1, display: "flex", justifyContent: "flex-end" }}>
        <Link
          to="/yearly/new"
          style={{
            margin: "0.5% 1%",
            textDecoration: "none",
          }}
        >
          <Button size={"large"} variant="contained">
            NEW
          </Button>
        </Link>
      </Box>
      <CustomizedTables heads={heads} rows={row} />
    </div>
  );
};

export default Topical;
