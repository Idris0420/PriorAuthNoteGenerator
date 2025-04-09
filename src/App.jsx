import React, { useState } from "react";
import "./Dashboard.css"; // We'll create this CSS file

const templates = {
  "!app": "OP at (Hospital) // (insurance) with eff date: (date) elig as per (portal) // DOS: (DOS) // MRI (part) // CPT: (CPT) Dx: (Dx) // PA req as per (portal) // PA approved via (portal) valid through (start)-(end) // auth #(num) // pc #(num) ",
  "!den": "OP at (Hospital) // (insurance) with eff date: (date) elig as per (portal) // DOS: (DOS) // MRI (part) // CPT: (CPT) Dx: (Dx) // PA req as per (portal) // PA denied as per (portal) with case #(num) // denial reson: (reason) // pc #(num) ",
  "!def": "OP at (Hospital) // (insurance) with eff date: (date) elig as per (portal) // DOS: (DOS) // MRI (part) // CPT: (CPT) Dx: (Dx) // (PA req?)",
  "!nar": "OP at (Hospital) // (insurance) with eff date: (date) elig as per (portal) // DOS: (DOS) // MRI (part) // CPT: (CPT) Dx: (Dx) // no PA req as per (rep?) // callref #(num) ",
};

export default function Dashboard() {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    let value = e.target.value;

    Object.keys(templates).forEach((key) => {
      if (value.includes(key)) {
        value = value.replace(key, templates[key]);
      }
    });

    setText(value);
  };

  return (
    <div className="dashboard">
      <textarea
        className="text-input"
        value={text}
        onChange={handleChange}
        placeholder="Type here... (e.g., !approved)"
      />
    </div>
  );
}
