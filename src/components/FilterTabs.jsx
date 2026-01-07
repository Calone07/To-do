
import React from "react";

function FilterTabs({ filter, onChange }) {
  const filters = ["all", "active", "completed"];

  return (
    <div className="filter-tabs">
      {filters.map((type) => (
        <button
          key={type}
          onClick={() => onChange(type)}
          className={`filter-btn ${filter === type ? "active" : ""}`}
        >
          {type}
        </button>
      ))}
    </div>
  );
}

export default FilterTabs;
