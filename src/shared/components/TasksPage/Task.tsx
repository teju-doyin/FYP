"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import AddNewTask from "@/shared/components/modals/AddNewTask";
import DeleteTask from "@/shared/components/modals/DeleteTask";

interface Task {
  id: number;
  title: string;
  tag: number; // 0 = not started, 1 = in progress, 2 = complete
}

const initialTasks: Task[] = [
  { id: 0, title: "Fix ER diagram", tag: 1 },
  { id: 1, title: "Expand data collection section", tag: 1 },
  { id: 2, title: "Include ethical considerations", tag: 0 },
  { id: 3, title: "Add Feasibility study", tag: 2 },
];

function Tasks() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const toggleComplete = (id: number) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, tag: t.tag === 2 ? 1 : 2 } : t
      )
    );
  };

  const handleAddTask = (title: string) => {
    setTasks((prev) => [
      ...prev,
      {
        id: prev.length ? prev[prev.length - 1].id + 1 : 0,
        title,
        tag: 0,
      },
    ]);
  };

  const handleConfirmDelete = () => {
    if (!taskToDelete) return;
    setTasks((prev) => prev.filter((t) => t.id !== taskToDelete.id));
    setTaskToDelete(null);
  };

  return (
    <div>
      {tasks.map((task) => (
        <div
          key={task.id}
          className="card flex-between items-start mb-3"
        >
          <div className="flex gap-3">
            <Checkbox
              className="mt-1.5 data-[state=checked]:text-blue-500 data-[state=checked]:border-blue-500 data-[state=checked]:bg-[#F9F5FF] border border-blue-100 bg-[#F9F5FF] size-6"
              checked={task.tag === 2}
              onCheckedChange={() => toggleComplete(task.id)}
            />
            <div>
              <p
                className={`text-grey-700 font-medium max-w-[250px] mb-0.5 ${
                  task.tag === 2 ? "line-through text-grey-300" : ""
                }`}
              >
                {task.title}
              </p>
              <div className="flex items-center gap-1 opacity-80">
                <span
                  className={`dot ${
                    task.tag === 0
                      ? "bg-orange"
                      : task.tag === 1
                      ? "bg-grey-300"
                      : "bg-green"
                  }`}
                />
                <span
                  className={`text-xs ${
                    task.tag === 0
                      ? "text-orange"
                      : task.tag === 1
                      ? "text-grey-300"
                      : "text-green"
                  }`}
                >
                  {task.tag === 0
                    ? "Not started"
                    : task.tag === 1
                    ? "In progress"
                    : "Complete"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setTaskToDelete(task)}
            >
              <Image
                src="/icons/delete.png"
                alt="Delete task"
                width={20}
                height={20}
              />
            </button>
            <Image
              src="/icons/three-dots.png"
              alt="More"
              width={20}
              height={20}
            />
          </div>
        </div>
      ))}

      <Button
        variant="secondary"
        className="py-3 px-1.5 mt-5 bg-blue-50 text-blue-500 text-lg font-medium rounded-[3px]"
        onClick={() => setShowAddModal(true)}
      >
        <Image
          src="/icons/add.png"
          alt="Add"
          width={20}
          height={20}
        />
        New Task
      </Button>

      {showAddModal && (
        <AddNewTask
          onClose={() => setShowAddModal(false)}
          onSave={(title) => {
            handleAddTask(title);
            setShowAddModal(false);
          }}
        />
      )}

      {taskToDelete && (
        <DeleteTask
          taskTitle={taskToDelete.title}
          onCancel={() => setTaskToDelete(null)}
          onDelete={handleConfirmDelete}
        />
      )}
    </div>
  );
}

export default Tasks;
