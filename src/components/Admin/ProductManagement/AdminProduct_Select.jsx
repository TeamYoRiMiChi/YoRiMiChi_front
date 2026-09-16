function AdminProduct_Select({
  value,
  options,
  onChange,
  className = "",
}) {
  return (
    <select
      className={className}
      value={value}
      onChange={(event) =>
        onChange(event.target.value)
      }
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default AdminProduct_Select;