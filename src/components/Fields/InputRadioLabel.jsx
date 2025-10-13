import InputRadio from "./InputRadio";

export default function InputRadioLabel({text, id, name, value}) {
    return <div class="radio-option">
        <InputRadio id={id} name={name} value={value}/>
        <label for={id}>{text}</label>
    </div>
}