
import React from 'react';
import * as XLSX from 'xlsx';

const ExcelUpload = () => {
  const handleFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      console.log(XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]));
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <h2>📊 Upload Excel</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFile} />
    </div>
  );
};

export default ExcelUpload;
