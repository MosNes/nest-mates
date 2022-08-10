-- Query to delete all  assignment records of a specific recur value after a specific date
-- DELETE assignment
-- FROM assignment
-- LEFT JOIN task on assignment.task_id = task.id
-- WHERE task.recurs = 'daily' AND assignment.date > '2022-08-08';

-- returns all assignment records from a specific nest including the task data
SELECT assignment.id, assignment.date, assignment.task_id, assignment.user_id, assignment.nest_id, task.task_name, task.recurs, task_description
 FROM assignment
 LEFT JOIN task on assignment.task_id = task.id
 WHERE assignment.nest_id = 2
 ORDER BY assignment.date ASC;