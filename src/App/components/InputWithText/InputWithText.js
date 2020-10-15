import { PropTypes } from "prop-types";
import React from 'react';
import { FormGroup, Input } from 'reactstrap';

const InputWithText = ({ label, type, value = null, placeholder, onChange, disabled }) => {
    return (
        <FormGroup>
            <label style={{ color: '#000' }}>{label}</label>
            <Input type={type} placeholder={placeholder} onChange={onChange ? (val) => onChange(val.target.value) : null} disabled={disabled} defaultValue={value ? value : null} />
        </FormGroup>
    );
};

InputWithText.defaultProps = {
    label: "",
    type: "text",
    onChange: null,
    placeholder: "",
    disabled: false,
    value: ""
};

InputWithText.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    value: PropTypes.string

};

export { InputWithText };
