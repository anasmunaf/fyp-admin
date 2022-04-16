/** @format */

import React, { useEffect, useState } from "react";
import CustomizedTables from "./table";
import Http from "./http";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

async function get() {
  const yearly = await Http.get(
    "https://slc-backend.herokuapp.com/api/yearly/",
  );
  let rows = [];
  yearly.data.map((arr) => {
    const { _id, subject, year, month, category, paper, pdf } = arr;
    rows.push({
      subject,
      year,
      month,
      category,
      paper,
      pdf: (
        <a
          style={{ color: "red", textDecoration: "none" }}
          href={`data:application/pdf;base64,${pdf.buffer}`}
        >
          {pdf.originalname}
        </a>
      ),
      SettingsIcon: (
        <div>
          <Link to={`/yearly/${_id}`}>
            <EditIcon />
          </Link>
          <DeleteIcon
            style={{ cursor: "pointer", hover: { color: "black" } }}
            onClick={async () =>
              await Http.delete(
                `https://slc-backend.herokuapp.com/api/yearly/${_id}`,
              ).then(() => window.location.reload())
            }
            sx={{ color: "red", ml: 4 }}
          />
        </div>
      ),
    });
  });
  return rows;
}

const heads = ["Subject", "Year", "Month", "Type", "Paper", "File-Name", ""];

const Yearly = () => {
  const [row, setRow] = useState();

  useEffect(() => {
    get().then((res) => {
      // console.log(row);
      setRow(res);
    });
  }, [row == undefined]);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Annual Data Management</h1>
      <Box sx={{ width: 1, display: "flex", justifyContent: "flex-end" }}>
        <Link
          to='/yearly/new'
          style={{
            margin: "0.5% 1%",
            textDecoration: "none",
          }}
        >
          <Button size={"large"} variant='contained'>
            NEW
          </Button>
        </Link>
      </Box>
      <CustomizedTables heads={heads} rows={row || []} />
    </div>
  );
};

export default Yearly;
