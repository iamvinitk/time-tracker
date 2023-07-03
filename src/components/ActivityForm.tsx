import React, { useState } from "react";

interface ActivityFormProps {
  onAddActivity: (activityName: string) => void;
}

const ActivityForm: React.FC<ActivityFormProps> = ({ onAddActivity }) => {
  const [activityName, setActivityName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activityName.trim() !== "") {
      onAddActivity(activityName);
      setActivityName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        placeholder="Activity name"
        value={activityName}
        onChange={(e) => setActivityName(e.target.value)}
        className="flex-1 p-2 border border-gray-300 rounded-md"
      />
      <button
        type="submit"
        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Add
      </button>
    </form>
  );
};

export default ActivityForm;
