import InputRadio from "./InputRadio";

export default function InputRadioLabel({text, id, name, value, onChange}) {
    return <div className="radio-option">
        <InputRadio id={id} name={name} value={value} onChange={onChange}/>
        <label htmlFor={id}>{text}</label>
    </div>
}