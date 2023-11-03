import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

export const SelectForm = ({
    title,
    InputName,
    register,
    FieldRequired,
    change = null,
    errors,
    options = [],
}) => {
    const [validations, setValidations] = useState({});
    const { t } = useTranslation();

    useEffect(() => {
        if (InputName === 'typeBusiness') {
            setValidations({
                onChange: (e) => change(e),
                required: FieldRequired ? t('requiredField') : false,
            })
        } else {
            setValidations({
                required: FieldRequired ? t('requiredField') : false,
            })
        }
    }, [])

    return (
        <Form.Group>
            <Form.Label>{title}</Form.Label>
            <Form.Select
                {...register(InputName, validations)}
                className={errors[InputName] && 'error-input-form'}
            >
                <option defaultChecked value='' className='d-none'>{t('choose')}</option>
                {options.map((option, key) =>
                    <option key={key} value={option.value}>{option.label}</option>
                )}
            </Form.Select>
            {errors[InputName] && <p className="text-danger">{errors[InputName]?.message}*</p>}
        </Form.Group>
    )
}
