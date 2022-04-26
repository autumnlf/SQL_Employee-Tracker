use employeeTracker;

INSERT INTO department
    (name)
VALUES
    ('Front of House'),
    ('Back of House');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Host', 20000, 1),
    ('Server', 20000, 1),
    ('Bartender', 25000, 1),
    ('Line Cook', 20000, 2),
    ('Prep Cook', 20000, 2),
    ('Dishwasher', 20000, 2);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Abby', 'Blake', 1, 8),
    ('Christine', 'Delgado', 2, 8),
    ('Eric', 'Franklin', 3, 8),
    ('Geno', 'Harris', 4, 7),
    ('Iris', 'Jacobs', 5, 7),
    ('Katy', 'Littles', 6, 7);
