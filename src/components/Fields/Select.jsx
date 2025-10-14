export default function Select({id, options}) {
    console.log(options);
    return <select className="form-control" id={id} name={id}>
            {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
    </select>
}