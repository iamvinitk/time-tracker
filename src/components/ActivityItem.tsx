import React, { useEffect, useState } from "react";
import { Activity } from "./Activity";

interface ActivityItemProps {
  activity: Activity;
  onStartTimer: (activityId: number) => void;
  onStopTimer: (activityId: number) => void;
  updateActivity: (activity: Activity) => void;
}

const ActivityItem: React.FC<ActivityItemProps> = ({
  activity,
  onStartTimer,
  onStopTimer,
  updateActivity,
}) => {
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    let intervalId: number;
    if (isTimerRunning) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isTimerRunning]);

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleStart = () => {
    setIsTimerRunning(true);
    onStartTimer(activity.id);
  };

  const handleStop = () => {
    setIsTimerRunning(false);
    onStopTimer(activity.id);
  };

  return (
    <div className="flex items-center justify-between p-2 border-b border-gray-300">
      <div>
        {activity.name}
        <button
          onClick={() => {
            setIsEditMode(true);
          }}
          className="px-3 py-1 ml-2 text-sm text-white bg-red-500 rounded-md hover:bg-red-600"
        >
          Edit
        </button>
        {isEditMode && (
          <div className="mt-2">
            <input
              type="text"
              placeholder="Activity name"
              value={activity.name}
              onChange={(e) => {
                updateActivity({ ...activity, name: e.target.value });
              }}
              className="flex-1 p-2 border border-gray-300 rounded-md"
            />
            <button
              className="px-3 py-1 ml-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
              onClick={() => {
                setIsEditMode(false);
              }}
            >
              Save
            </button>
          </div>
        )}
      </div>

      <div>
        {isTimerRunning ? (
          <div className="text-lg font-bold">{formatTime(timer)}</div>
        ) : (
          <button
            onClick={handleStart}
            className="px-3 py-1 text-sm text-white bg-green-500 rounded-md hover:bg-green-600"
          >
            Start
          </button>
        )}
        {isTimerRunning && (
          <button
            onClick={handleStop}
            className="px-3 py-1 ml-2 text-sm text-white bg-red-500 rounded-md hover:bg-red-600"
          >
            Stop
          </button>
        )}
      </div>
    </div>
  );
};

export default ActivityItem;
