const { formatAssignments } = require('../utils/create-assignments');

test ('formats an array of assignments objects from a round robin array of user/task pairings',
    () => {

        const nestMateJSON = `[
            {
                "id": 5,
                "username": "misstake",
                "email": "accidentalMillionaire@gmail.com",
                "first_name": "Francine",
                "last_name": "Kibble",
                "role": "Nestmate",
                "nest_id": 2
            },
            {
                "id": 6,
                "username": "noble420",
                "email": "blazeit@gmail.com",
                "first_name": "Mordecai",
                "last_name": "Montague",
                "role": "Nestmate",
                "nest_id": 2
            },
            {
                "id": 7,
                "username": "fweeb",
                "email": "weeblbleeb@gmail.com",
                "first_name": "Sousuke",
                "last_name": "WithTheMosuke",
                "role": "Nestmate",
                "nest_id": 2
            }
        ]`

        const tasksJSON = `[
            {
                "id": 4,
                "task_name": "Clean the Kitchen",
                "task_description": "Use the drying rack",
                "nest_id": 2
            },
            {
                "id": 5,
                "task_name": "Clean the upstairs bathroom",
                "task_description": "Make sure to get the tub",
                "nest_id": 2
            },
            {
                "id": 6,
                "task_name": "Mow the Lawn",
                "task_description": "Use the drying rack",
                "nest_id": 2
            },
            {
                "id": 7,
                "task_name": "Clean up dog poo",
                "task_description": "Front and back yard",
                "nest_id": 2
            }
        ]`

        const nestMateArr = JSON.parse(nestMateJSON);
        const tasksArr = JSON.parse(tasksJSON);

        const taskType = 'daily';
        //startDate = string of today's date in MM-DD-YYYY format
        const startDate = new Date().toLocaleDateString();

        const assignmentArr = formatAssignments(nestMateArr, tasksArr, taskType, startDate, 10);
        console.log(assignmentArr);

        expect(typeof nestMateArr).toEqual('object');
        expect(typeof tasksArr).toEqual('object');
    }
)
