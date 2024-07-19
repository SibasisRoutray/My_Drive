import { useState } from "react";
import PropTypes from "prop-types";

const Display = ({ contract, account }) => {
  const [data, setData] = useState("");

  const getdata = async () => {
    let dataArray;
   

    try {
     
        dataArray = await contract.getFile(account);
      

      console.log("Data array:", dataArray);

      if (dataArray && dataArray.length > 0) {
        const str = dataArray.toString();
        const str_array = str.split(",");

        const images = str_array.map((item, i) => {
          let url;
          if (item.startsWith("https://") || item.startsWith("http://")) {
            url = item;
          } else {
            url = `https://gateway.pinata.cloud/ipfs/${item}`;
          }

          console.log(`Image URL: ${url}`);

          return (
            <a href={url} key={i} target="_blank" rel="noopener noreferrer">
              <img
                key={i}
                src={url}
                alt={`Image ${i}`}
                className="image-item"
                style={{ width: "100%", height: "auto" }}
              ></img>
            </a>
          );
        });
        setData(images);
      } else {
        alert("No image to display");
      }
    } catch (e) {
      console.error("Error fetching data:", e);
      alert("You don't have access or an error occurred");
    }
  };

  return (
    <>
    <br></br>
     <button className="center button" onClick={getdata}>
        Get Data
      </button>
      <br></br>
      <div
        className="image-list"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "10px",
    
          overflow: "auto",
        }}
      >
        {data}
      </div>
      
     
    </>
  );
};

Display.propTypes = {
  contract: PropTypes.object.isRequired,
  account: PropTypes.string.isRequired,
};

export default Display;
