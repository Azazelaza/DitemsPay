import * as yup from "yup";

export const login = yup.object().shape({
  email: yup.string().email("El correo no es valido").required("Agrega un correo"),
  password: yup.string().min(8, "Contraseña de minimo 8 caracteres").max(32, "Contraseña de maximo 32 caracteres").required("Contraseña requerida"),
});

export const validateRegister = yup.object().shape({
  email: yup.string().email("El correo no es valido").required("Agrega un correo"),
  name: yup.string().required('Agrega tu nombre'),
  last_name: yup.string().required('Agrega tu apellido'),
  phone: yup.string().required('Agrega tu telefono'),
  birthday: yup.date().required('Agrega tu fecha de nacimiento'),
  gender: yup.mixed().oneOf(['male', 'female', 'other']).required('Agrega tu genero'),
  password: yup.string().min(8, "Contraseña de minimo 8 caracteres").max(32, "Contraseña de maximo 32 caracteres").required("Contraseña requerida"),
});

export const address = yup.object().shape({
  street: yup.string().required("Agrega una calle valida"),
  suburb: yup.string().required('Agrega una colonia valida'),
  state_id: yup.string().required("Selecciona un estado"),
  city: yup.string().required("Agrega una ciudad"),
  zip: yup.number().typeError("Este campo solo acepta numeros").required("Ingresa un codigo postal"),
  number_inside: yup.number().typeError("Este campo solo acepta numeros").required('Agrega un numero interior'),
  number_outside: yup.string(),
  notes: yup.string()
});