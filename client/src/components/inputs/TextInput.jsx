export default function TextInput({
  type,
  label,
  placeholder,
  inputValue,
  setInputValue,
}) {
  return (
    <div className="flex flex-col items-start space-y-1 my-2 w-full">
      <label htmlFor={inputValue}>{label}</label>
      <input
        className="w-full p-2 border-2 focus:outline-none rounded"
        id={inputValue}
        name={inputValue}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
}
