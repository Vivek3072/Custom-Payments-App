export default function SelectInput({
  type,
  label,
  inputVal,
  inputValues,
  setValue,
}) {
  return (
    <>
      <div className="flex flex-col items-start space-y-1 my-2 w-full">
        <label>{label}</label>
        <select
          className="w-full p-2 border-2 focus:outline-none rounded"
          type={type}
          value={inputVal}
          onChange={(e) => setValue(e.target.value)}
        >
          {inputValues &&
            inputValues.map((val, idx) => {
              return (
                <option
                  value={val}
                  key={idx}
                  className="uppercase"
                  onClick={() => setValue(val)}
                >
                  {val}
                </option>
              );
            })}
        </select>
      </div>
    </>
  );
}
