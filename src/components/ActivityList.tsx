import React from "react";
import { Activity } from "./Activity";
import ActivityItem from "./ActivityItem";

interface ActivityListProps {
  activities: Activity[];
  onStartTimer: (activityId: number) => void;
  onStopTimer: (activityId: number) => void;
  updateActivity: (activity: Activity) => void;
}

const ActivityList: React.FC<ActivityListProps> = ({
  activities,
  onStartTimer,
  onStopTimer,
  updateActivity,
}) => {
  return (
    <div className="divide-y divide-gray-300">
      {activities.map((activity) => (
        <ActivityItem
          key={activity.id}
          activity={activity}
          onStartTimer={onStartTimer}
          onStopTimer={onStopTimer}
          updateActivity={updateActivity}
        />
      ))}
    </div>
  );
};

export default ActivityList;
