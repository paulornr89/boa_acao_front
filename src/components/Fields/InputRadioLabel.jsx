import InputRadio from "./InputRadio";

export default function InputRadioLabel({text, id, name, value}) {
    return <div className="radio-option">
        <InputRadio id={id} name={name} value={value}/>
        <label htmlFor={id}>{text}</label>
    </div>
}