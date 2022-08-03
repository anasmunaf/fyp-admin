/** @format */

import React, { useEffect, useState } from "react";
import CustomizedTables from "./table";
import Http from "./http";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

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
    "https://slc-backend.herokuapp.com/api/yearly/"
  );
  let rows = [];
  yearly.data.map((arr) => {
    const { _id, subject, year, month, category, paper } = arr;
    rows.push({
      subject,
      year,
      month,
      category,
      paper,
      pdf: (
        <Button
          onClick={async (event) => {
            event.preventDefault();
            const data = await getPdf(_id);
          }}
        >
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
            onClick={async () =>
              await Http.delete(
                `https://slc-backend.herokuapp.com/api/yearly/${_id}`
              ).then(() => window.location.reload())
            }
          />
        </div>
      ),
    });
  });
  return rows;
}

const heads = ["Subject", "Year", "Month", "Type", "Paper", "File", "Actions"];
const Yearly = () => {
  const [row, setRow] = useState();

  useEffect(() => {
    get().then((res) => {
      setRow(res);
    });
  }, [row == undefined]);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Annual Data Management</h1>
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

export default Yearly;
