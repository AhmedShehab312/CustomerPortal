import { PropTypes } from "prop-types";
import React from 'react';
import { FormGroup, Input } from 'reactstrap';

class InputWithText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMsg: null,
            showPassword: false,
            type: 'text'
        }
    }
    commonRegex = {
        number: /^[0-9]*$/,
        email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        onlyEnglishChars: /^[A-Za-z][A-Za-z0-9]*$/,
        phoneNumberStartWith0: '^((0))[0-9]{10}$',
        min4Chars: /^[a-zA-Z, |0-9]{4,}$/,
        min6Chars: /^[a-zA-Z, |0-9]{6,}$/,
        isRequired: /(^$)|(\s+$)/
    }

    componentDidMount() {
        const { value = null, disabled, validation, isRequired = true, type } = this.props;
        this.setState({ type: type })
        if (value && !disabled) {
            this.validationFunc(value, validation, isRequired)
        }
    }

    validationFunc = (value, validation, isRequired) => {
        const { onBlur } = this.props;
        if (isRequired && value.toString().match(this.commonRegex.isRequired)) {
            this.setState({ errorMsg: "This field is required" });
            onBlur(false);
        }

        else {
            switch (validation) {
                case 'number':
                    if (value.toString().match(this.commonRegex.number) == null) {
                        this.setState({ errorMsg: "Only numbers are allowed" });
                        onBlur(false);
                    }
                    else {
                        this.setState({ errorMsg: null });
                        onBlur(true);
                    }
                    break;
                case 'email':
                    if (value.toString().match(this.commonRegex.email) == null) {
                        this.setState({ errorMsg: "Invalid email address" });
                        onBlur(false);
                    }
                    else {
                        this.setState({ errorMsg: null });
                        onBlur(true);
                    }
                    break;
                case 'password':
                    if (value.toString().match(this.commonRegex.min4Chars) == null) {
                        this.setState({ errorMsg: "Minimum 4 chars" });
                        onBlur(false);
                    }
                    else {
                        this.setState({ errorMsg: null });
                        onBlur(true);
                    }
                    break;
                case 'phone':
                    if (value.toString().match(this.commonRegex.min6Chars) == null) {
                        this.setState({ errorMsg: "Invalid phone, Minimum 6 chars" });
                        onBlur(false);
                    }
                    else {
                        this.setState({ errorMsg: null });
                        onBlur(true);
                    }
                    break;

                default:
                    this.setState({ errorMsg: null });
                    onBlur(true);
                    break;
            }
        }
    }

    showPassword() {
        const { showPassword } = this.state;
        this.setState({ showPassword: !showPassword }, () => {
            if (showPassword) {
                this.setState({ type: "password" })

            }
            else {
                this.setState({ type: "text" })

            }
        })

    }

    render() {
        const { label, value = null, placeholder, onChange, disabled, onBlur, validation, isRequired = true } = this.props;
        const { type, showPassword } = this.state;

        return (
            <FormGroup>
                <label style={{ color: '#000' }}>{label}</label>
                <Input style={this.state.errorMsg ? { borderColor: '#ea6464' } : null} type={type} placeholder={placeholder} onChange={onChange ? (val) => { onChange(val.target.value); } : null} disabled={disabled}
                    defaultValue={value ? value : null} onBlur={(val) => { this.validationFunc(val.target.value, validation, isRequired) }} />
                {
                    validation == "password" && <i class={showPassword ? "fas fa-eye" : "fas fa-eye-slash"} style={{ position: 'absolute', top: this.state.errorMsg ? "38%" : '44px', right: '25px', cursor: 'pointer' }} onClick={() => { this.showPassword() }}></i>
                }

                {this.state.errorMsg &&
                    <label style={{ color: '#ea6464', marginLeft: '10px', fontSize: '12px' }}>{this.state.errorMsg}</label>
                }
            </FormGroup>
        )
    }
}
export default InputWithText;


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
