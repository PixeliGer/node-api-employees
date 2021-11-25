import { Router } from 'express';
// Import Controllers
import { employeesController } from '../controllers/employees-controller';

class EmployeeRoutes {
    // Router instance
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        // Return a list of all employees
        this.router.get('/employees', employeesController.allEmployees);
        // Return a list of specific employees
        this.router.get('/employeesExample', employeesController.listEmployees);
        // Insert a new employee in the database
        this.router.post('/employee/add', employeesController.addEmployee);
        // Get an employee by id
        this.router.get('/employee/:emp_no', employeesController.getEmployee);
        // Get matching titles from the employee in title table
        this.router.get('/employee/:emp_no/titles', employeesController.employeeTitles);
        // Delete an employee from database
        this.router.delete('/employee/delete/:emp_no', employeesController.deleteEmployee);
    }
}

const employeeRoutes = new EmployeeRoutes();
export default employeeRoutes.router;