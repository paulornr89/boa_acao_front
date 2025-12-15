export default function InputRadio({id, name, value, onChange}) {
    return <input type="radio" id={id} name={name} value={value} onChange={onChange} className="form-control"/>;
}