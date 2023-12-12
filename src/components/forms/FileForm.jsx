import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { startUploadTax } from "../../redux/slices/address/thunk";

export const FileForm = ({ setValue, name, text, data = [], errors }) => {
  const dispatch = useDispatch();
  const [files, setFiles] = useState(null);

  const handleAddDocuments = async (event) => {
    if(!event.target.files[0]){
      return
    }
    const file = await dispatch(startUploadTax(event.target.files[0]));
    setValue(name, file);
    setFiles(file);
  };
  return (
    <>
      <div>{text}</div>
      <div>
        <input
          id={name}
          className="invisible absolute"
          type="file"
          onChange={handleAddDocuments}
        />
      </div>
      {files ? (
        <>
          <p>Se subio correctamente la constancia</p>
        </>
      ) : (
        <label htmlFor={name} className="cursor-pointer">
          <>
            <div>
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                width={80}
                height={80}
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
            </div>
            <div>Subir Constancia</div>
          </>
        </label>
      )}
      {errors[name] && <p className="text-danger">{errors[name]?.message}*</p>}
    </>
  );
};
