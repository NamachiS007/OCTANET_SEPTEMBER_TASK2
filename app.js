document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const hours = document.getElementById('hours');
    const minutes = document.getElementById('minutes');
    const ampm = document.getElementById('ampm');

    // Add Task
    addTaskBtn.addEventListener('click', () => {
        if (taskInput.value.trim() === '' || hours.value === 'HH' || minutes.value === 'MM' || ampm.value === 'AM/PM') return;

        const task = document.createElement('li');
        task.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

        // Create a string to hold the time in HH:MM AM/PM format
        const timeString = `${hours.value}:${minutes.value} ${ampm.value}`;

        // Task Text with Time
        const taskText = document.createElement('span');
        taskText.textContent = `${timeString} - ${taskInput.value}`;
        task.appendChild(taskText);

        // Button Group (to keep Edit and Delete buttons together on the right)
        const buttonGroup = document.createElement('div');
        buttonGroup.classList.add('d-flex', 'gap-2');

        // Edit Button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('btn', 'btn-primary', 'btn-sm');
        buttonGroup.appendChild(editBtn);

        // Delete Button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm');
        buttonGroup.appendChild(deleteBtn);

        // Append button group to the task item
        task.appendChild(buttonGroup);

        taskList.appendChild(task);
        taskInput.value = '';
        hours.value = 'HH';  // Reset dropdowns after adding task
        minutes.value = 'MM';
        ampm.value = 'AM/PM';

        // Mark as completed
        taskText.addEventListener('click', () => {
            // Toggle the completion status and class for color
            taskText.classList.toggle('completed');
            task.classList.toggle('list-group-item-success');

            // Check if the task is completed and update the text accordingly
            if (taskText.classList.contains('completed')) {
                // Append "✔ Completed" when the task is marked as completed
                taskText.innerHTML = `${taskText.innerHTML} - ✅ Completed`;
            } else {
                // Remove the "✔ Completed" text if the task is unmarked
                taskText.innerHTML = taskText.innerHTML.replace(' - ✅ Completed', '');
            }
        });


        // Edit Task
        editBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const newTaskText = prompt('Edit your task', taskText.textContent.split(' - ')[1]);
            if (newTaskText.trim() !== '') {
                taskText.textContent = `${timeString} - ${newTaskText}`;
            }
        });

        // Delete Task
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            taskList.removeChild(task);
        });
    });
});