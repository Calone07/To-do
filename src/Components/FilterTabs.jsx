import { memo } from "react";

const FILTERS = ["all", "active", "completed"];

function FilterTabs({ filter, onChange }) {
  return (
    <div className="filter-tabs" role="tablist" aria-label="Filter todos">
      {FILTERS.map((type) => (
        <button
          key={type}
          role="tab"
          aria-selected={filter === type}
          onClick={() => onChange(type)}
          className={`filter-btn ${filter === type ? "active" : ""}`}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default memo(FilterTabs);
