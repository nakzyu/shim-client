import React, { useRef, useState, useEffect } from "react";

import "./ImageUpload.css";

const ImageUpload = props => {
  const [file, setFile] = useState();
  const [previewUrl, setPreivewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreivewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = event => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className="center">
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className={`image-upload center`} onClick={pickImageHandler}>
        <div
          className={`${
            props.addPost
              ? "add-post-image-upload__preview"
              : "image-upload__preview"
          }`}
        >
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>PICK A IMAGE!</p>}
        </div>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
