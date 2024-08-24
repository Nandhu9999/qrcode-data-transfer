import { useState } from "react";
import { useData } from "../contexts/DataContext";

const TextInputModule = () => {
  const { qrValue, setQrValue } = useData();
  const [rows, setRows] = useState(1);

  function textAreaOnChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const textareaLineHeight = 24; // Adjust this based on your textarea's line-height
    const previousRows = event.target.rows;
    event.target.rows = 1; // Reset rows to 1 to calculate the new height correctly

    const currentRows = Math.floor(
      event.target.scrollHeight / textareaLineHeight,
    );

    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }

    setQrValue(event.target.value);
    setRows(currentRows);
  }
  return (
    <div className="flex h-full w-full items-center justify-center">
      <textarea
        spellCheck="false"
        rows={Math.min(rows, 24)}
        value={qrValue}
        placeholder="Enter text"
        onChange={textAreaOnChange}
        className="w-full resize-none rounded-md bg-black/85 p-2 text-white outline-none"
      ></textarea>
    </div>
  );
};

export default TextInputModule;
