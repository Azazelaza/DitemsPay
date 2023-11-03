import React, { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";

export const SelectForm = ({
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
  options,
  className = "",
  ...props
}) => {
  return (
    <Form.Group>
      <Form.Label>{title}</Form.Label>
      <InputGroup className="mb-3">
        <Form.Select
          {...register(InputName)}
          as={textArea ? "textarea" : "input"}
          className={`${className} ${errors[InputName] && "error-input-form"}`}
          {...props}
        >
          <option className="d-none">Selecciona una opcion...</option>
          {options.map((item, index) => (
            <option key={index} value={item.value ?? item.id}>
              {item.name}
            </option>
          ))}
        </Form.Select>
      </InputGroup>
      {errors[InputName] && (
        <p className="text-danger">{errors[InputName]?.message}*</p>
      )}
    </Form.Group>
  );
};
