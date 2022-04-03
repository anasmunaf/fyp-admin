/** @format */

import { useState } from "react";
import FileUpload from "react-material-file-upload";

export default function FileUploader({ fileData }) {
  const [files, setFiles] = useState([]);
  console.log(files);
  fileData(files);
  return (
    <div className='App'>
      <FileUpload value={files} onChange={setFiles} />
    </div>
  );
}
