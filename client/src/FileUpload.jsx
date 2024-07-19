import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import './FileUpload.css'

const FileUpload = ( {contract, account} ) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `ded707c7226d3c38bad7`,
            pinata_secret_api_key: `7048ca8fd3cd460db409e6110f6eb4c7f9d824c682edf63317fa8b1b88ef721e`,
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        contract.uploadFile(ImgHash);
        
        setFileName("No image selected");
        setFile(null);
      } catch (e) {
        alert("Unable to upload image to Pinata");
      }
    }
    alert("Please conform the transaction ...");
    setFileName("No image selected");
    setFile(null);
  };
  const retrieveFile = (e) => {
    const data = e.target.files[0]; 
    // console.log(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };
  return (

    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <p>Click on Choose Image for selecting file</p>
        <label htmlFor="file-upload" className="choose" style={{backgroundColor:"blue"}}>
          Choose Image
        </label>
        <input
          disabled={!account}
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
        />
        <span className="textArea">Image: {fileName}</span>
        <button type="submit" className="upload" disabled={!file}>
          Upload File
        </button>
      </form>
    </div>
  );
};


FileUpload.propTypes = {
  contract: PropTypes.object,
  account: PropTypes.string,
};
export default FileUpload;
