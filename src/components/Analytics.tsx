import React from "react";
import { Activity } from "./Activity";

interface AnalyticsProps {
  activities: Activity[];
}

const Analytics: React.FC<AnalyticsProps> = ({ activities }) => {
  const totalSpentTime = activities.reduce(
    (total, activity) => total + activity.timeSpent,
    0
  );

  return (
    <div className="p-2">
      <h2 className="text-lg font-semibold">Daily Analytics</h2>
      <div className="mt-2">
        <h3 className="text-sm font-medium">
          Total Time Spent: {totalSpentTime} minutes
        </h3>
        <ul className="mt-2">
          {activities.map((activity) => (
            <li key={activity.id} className="text-xs">
              {activity.name}: {activity.timeSpent} minutes
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Analytics;
