import { Request, Response } from 'express';
import pool from '../database';


class EmployeesController {

    public async allEmployees(req: Request, res: Response): Promise<void> {
        const QUERY = `SELECT * from employees`;

        (await pool).query(QUERY).then(rows => {
            res.json(rows);
        })
    }

    public async listEmployees(req: Request, res: Response): Promise<void> {
        const QUERY = `SELECT * FROM employees 
        WHERE hire_date BETWEEN '1990-01-01' AND '1990-01-15'
        ORDER by last_name asc`;

        (await pool).query(QUERY).then(rows => {
            res.json(rows);
        });
    }

    public async addEmployee(req: Request, res: Response): Promise<void> {
        const _body = req.body;
        // Query for checking las Employee ID (Emp No)
        const LAST_ID_QUERY = `SET @new_emp := (SELECT emp_no FROM employees ORDER BY emp_no DESC LIMIT 1)+1`;

        (await pool).query(LAST_ID_QUERY).then(async rows => {

            // Query for set new values
            const INSERT_QUERY = `INSERT INTO employees (emp_no, first_name, last_name, gender, birth_date, hire_date) 
            VALUES (@new_emp, '${_body.first_name}', '${_body.last_name}','${_body.gender}', '${_body.birth_date}', '${_body.hire_date}')`;

            (await pool).query(INSERT_QUERY).then(rows => {
                return res.json(rows);
            });
        });
    }

    public async getEmployee(req: Request, res: Response): Promise<void> {
        const QUERY = `SELECT * FROM employees WHERE emp_no = ${req.params.emp_no}`;

        (await pool).query(QUERY).then(rows => {
            res.json(rows);
        });
    }

    public async employeeTitles(req: Request, res: Response): Promise<void> {
        const QUERY = `SELECT * FROM titles WHERE emp_no = ${req.params.emp_no}`;

        (await pool).query(QUERY).then(rows => {
            res.json(rows);
        });
    }

    public async deleteEmployee(req: Request, res: Response): Promise<void> {
        const QUERY = `DELETE FROM employees WHERE emp_no = ${req.params.emp_no}`;

        (await pool).query(QUERY).then(rows => {
            res.json(rows);
        });
    }
}

export const employeesController = new EmployeesController();