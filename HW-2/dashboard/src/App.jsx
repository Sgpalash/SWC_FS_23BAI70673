import "./App.css";
import { useState } from "react";

export default function Tabs() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div>
      <div className="tabs">
        <button
          className={activeTab === "overview" ? "active" : ""}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>

        <button
          className={activeTab === "details" ? "active" : ""}
          onClick={() => setActiveTab("details")}
        >
          Details
        </button>

        <button
          className={activeTab === "settings" ? "active" : ""}
          onClick={() => setActiveTab("settings")}
        >
          Settings
        </button>
      </div>

      <div className="content">
        {activeTab === "overview" && (
          <div>
            <h2>Overview</h2>
            <p>Dashboard summary and key metrics.</p>
          </div>
        )}

        {activeTab === "details" && (
          <div>
            <h2>Details</h2>
            <p>Detailed reports and analytics.</p>
          </div>
        )}

        {activeTab === "settings" && (
          <div>
            <h2>Settings</h2>
            <p>Manage application preferences.</p>
          </div>
        )}
      </div>
    </div>
  );
}