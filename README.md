# Application Assignment.

This is a web application for managing employee medical leave applications. The main goal of this application is to help users efficiently track and manage employee leave requests, providing an organized way to access and update information.

## Features

- User authentication and role-based access control.
- Add, edit, and delete employees and their related information.
- Add, edit, and delete medical leave applications, including details like the employee's name, coverage days, start and end dates of the leave, doctor's name, and medical diagnostic.
- Search and filter medical leave applications based on various criteria, such as employee name, start date, and end date of the leave.

## This are the user available right now.

| Email              | Role           | password  |
| :----------------- | :------------- | :-------- |
| `carlos@gmail.com` | `hrSpecialist` | comida123 |
| `perez@gmail.com`  | `employee`     | comida123 |
| `perez@gmail.com`  | `employee`     | comida123 |
| `naraja@gmail.com` | `employee`     | comida123 |

## Firebase Database Structure

The application uses Firebase Realtime Database to store the data. The database structure is organized as follows:

- **users**

  - _userId_
    - email
    - role

- **employees**

  - _employeeId_
    - firstName
    - lastName

- **applications**
  - _applicationId_
    - employeeId
    - coverageDays
    - startDate
    - endDate
    - doctorName
    - medicalDiagnostic

The `users` node contains information about each user, such as their email address and role (admin or employee).

The `employees` node contains employee information, including their first and last names.

The `applications` node stores medical leave applications, which includes details like the employee's ID, the number of coverage days, the start and end dates of the leave, the doctor's name, and the medical diagnostic.
