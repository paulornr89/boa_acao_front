export default function Select({id, options}) {
    return <select className="form-control" id={id} name={id}>
            {options.map((option) => <option value={option.value}>{option.label}</option>)}
    </select>
}