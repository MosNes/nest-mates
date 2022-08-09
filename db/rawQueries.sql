DELETE assignment
FROM assignment
LEFT JOIN task on assignment.task_id = task.id
WHERE task.recurs = 'daily' AND assignment.date > '2022-08-08';