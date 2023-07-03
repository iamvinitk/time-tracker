import React, { useEffect, useState } from "react";
import ActivityForm from "./components/ActivityForm";
import ActivityList from "./components/ActivityList";
import Analytics from "./components/Analytics";
import { Activity } from "./components/Activity";

const STORAGE_KEY = "timeTrackerActivities";

const App: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const storedActivities = localStorage.getItem(STORAGE_KEY);
    if (storedActivities) {
      setActivities(JSON.parse(storedActivities));
    }
  }, []);

  useEffect(() => {
    console.log({ activities });
    if (activities.length !== 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
    }
  }, [activities]);

  const addActivity = (activityName: string) => {
    const newActivity: Activity = {
      id: Date.now(),
      name: activityName,
      timeSpent: 0,
    };
    setActivities([...activities, newActivity]);
  };

  const startTimer = (activityId: number) => {
    const updatedActivities = activities.map((activity) => {
      if (activity.id === activityId) {
        return { ...activity, startTime: Date.now() } as Activity;
      }
      return activity;
    });
    setActivities(updatedActivities);
  };

  const stopTimer = (activityId: number) => {
    const updatedActivities = activities.map((activity) => {
      if (activity.id === activityId && activity.startTime) {
        const endTime = Date.now();
        console.log({ time: endTime - activity.startTime });
        const elapsedTime = Math.round(
          (endTime - activity.startTime) / 1000 / 60
        );
        console.log({ elapsedTime });
        const timeSpent = activity.timeSpent + elapsedTime;
        return { ...activity, timeSpent, startTime: undefined };
      }
      return activity;
    });
    setActivities(updatedActivities);
  };

  const updateActivity = (activity: Activity) => {
    const updatedActivities = activities.map((a) => {
      if (a.id === activity.id) {
        return activity;
      }
      return a;
    });
    setActivities(updatedActivities);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Time Tracker</h1>
      <ActivityForm onAddActivity={addActivity} />
      <ActivityList
        activities={activities}
        onStartTimer={startTimer}
        onStopTimer={stopTimer}
        updateActivity={updateActivity}
      />
      <Analytics activities={activities} />
    </div>
  );
};

export default App;
