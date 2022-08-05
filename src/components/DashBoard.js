import { Button } from "@mui/material";
import { Link } from "react-router-dom";
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

export { get, getPdf };
