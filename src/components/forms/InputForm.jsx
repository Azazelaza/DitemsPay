import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { EyeIcon, EyeOffIcon } from "../icons";
import forms from "../../scss/components/forms.module.scss";

export const InputForm = ({
  title,
  InputName,
  place = "",
  type = "text",
  register,
  errors,
  value = "",
  max = 99,
  textArea = false,
  min = 0,
  input = "",
  textStart = "",
  className = "",
  ...props
}) => {
  const [showPass, setShowPass] = useState(false);

  return (
    <Form.Group>
      <Form.Label>{title}</Form.Label>
      <InputGroup className="mb-3">
        {textStart && (
          <InputGroup.Text style={{ backgroundColor: "transparent" }}>
            {textStart}
          </InputGroup.Text>
        )}
        <Form.Control
          {...register(InputName)}
          type={type == "password" && showPass ? "text" : type}
          placeholder={place}
          as={textArea ? "textarea" : "input"}
          className={`${className} ${errors[InputName] && "error-input-form"}`}
          {...props}
        />
        {type == "password" && (
          <InputGroup.Text
            className={forms.showed}
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? <EyeOffIcon width="20px" /> : <EyeIcon width="20px" />}
          </InputGroup.Text>
        )}
      </InputGroup>
      {errors[InputName] && (
        <p className="text-danger">{errors[InputName]?.message}*</p>
      )}
    </Form.Group>
  );
};
