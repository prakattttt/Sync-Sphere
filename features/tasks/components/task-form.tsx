"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { FormField, fieldA11y } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { easeOut } from "@/lib/motion";

import { members, rooms } from "@/features/workspace/data/mock";

import { STATUS_LABEL, STATUS_ORDER } from "../constants";
import { taskFormSchema, type TaskFormValues } from "../schemas";
import { useTasksStore } from "../store";
import type { TaskInput, TaskItem, TaskStatus } from "../types";

type TaskFormProps =
  | { mode: "create"; initialStatus: TaskStatus }
  | { mode: "edit"; task: TaskItem };

function toDefaults(props: TaskFormProps): TaskFormValues {
  if (props.mode === "edit") {
    const { task } = props;
    return {
      title: task.title,
      description: task.description,
      status: task.status,
      assigneeId: task.assigneeId ?? "",
      roomSlug: task.roomSlug ?? "",
      dueDate: task.dueDate ?? "",
    };
  }
  return {
    title: "",
    description: "",
    status: props.initialStatus,
    assigneeId: "",
    roomSlug: "",
    dueDate: "",
  };
}

function toInput(values: TaskFormValues): TaskInput {
  return {
    title: values.title,
    description: values.description,
    status: values.status,
    assigneeId: values.assigneeId || null,
    roomSlug: values.roomSlug || null,
    dueDate: values.dueDate || null,
  };
}

/** Create / edit form. Mounted fresh each time the dialog opens. */
export function TaskForm(props: TaskFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: toDefaults(props),
    mode: "onTouched",
  });

  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const addTask = useTasksStore((state) => state.addTask);
  const updateTask = useTasksStore((state) => state.updateTask);
  const deleteTask = useTasksStore((state) => state.deleteTask);
  const closeDialog = useTasksStore((state) => state.closeDialog);

  const editing = props.mode === "edit";

  const onSubmit = handleSubmit((values) => {
    if (props.mode === "edit") {
      updateTask(props.task.id, toInput(values));
    } else {
      addTask(toInput(values));
    }
    closeDialog();
  });

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <FormField id="task-title" label="Title" error={errors.title?.message}>
        <Input
          {...fieldA11y("task-title", errors.title?.message)}
          data-autofocus
          autoComplete="off"
          placeholder="What needs to be done?"
          {...register("title")}
        />
      </FormField>

      <FormField
        id="task-description"
        label="Description"
        error={errors.description?.message}
      >
        <Textarea
          {...fieldA11y("task-description", errors.description?.message)}
          placeholder="Optional details, links or acceptance criteria"
          {...register("description")}
        />
      </FormField>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField id="task-status" label="Status" error={errors.status?.message}>
          <Select
            {...fieldA11y("task-status", errors.status?.message)}
            {...register("status")}
          >
            {STATUS_ORDER.map((status) => (
              <option key={status} value={status}>
                {STATUS_LABEL[status]}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField id="task-assignee" label="Assignee">
          <Select id="task-assignee" {...register("assigneeId")}>
            <option value="">Unassigned</option>
            {members.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField id="task-room" label="Room">
          <Select id="task-room" {...register("roomSlug")}>
            <option value="">No room</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.slug}>
                #{room.name}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField id="task-due" label="Due date" error={errors.dueDate?.message}>
          <Input
            {...fieldA11y("task-due", errors.dueDate?.message)}
            type="date"
            className="dark:[color-scheme:dark]"
            {...register("dueDate")}
          />
        </FormField>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-4">
        <div className="min-h-9">
          <AnimatePresence mode="wait" initial={false}>
            {editing && !confirmingDelete ? (
              <motion.div
                key="delete"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.12 }}
              >
                <Button
                  variant="ghost"
                  size="compact"
                  onClick={() => setConfirmingDelete(true)}
                  className="-ml-3 text-destructive hover:bg-destructive-container"
                >
                  <Trash2 aria-hidden />
                  Delete
                </Button>
              </motion.div>
            ) : null}

            {editing && confirmingDelete ? (
              <motion.div
                key="confirm"
                role="alert"
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.16, ease: easeOut }}
                className="flex items-center gap-2"
              >
                <span className="text-[13px] text-foreground">Delete this task?</span>
                <Button
                  size="compact"
                  onClick={() => {
                    if (props.mode === "edit") deleteTask(props.task.id);
                    closeDialog();
                  }}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </Button>
                <Button
                  variant="secondary"
                  size="compact"
                  onClick={() => setConfirmingDelete(false)}
                >
                  Keep
                </Button>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <div className="ml-auto flex gap-2">
          <Button variant="secondary" size="compact" onClick={closeDialog}>
            Cancel
          </Button>
          <Button type="submit" size="compact">
            {editing ? "Save changes" : "Create task"}
          </Button>
        </div>
      </div>
    </form>
  );
}
