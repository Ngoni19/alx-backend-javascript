import AppController from '../controllers/AppController';
import StudentsController from '../controllers/StudentsController';

/**
 * Bind the routes to the appropriate handler in the
 * given Express app
 * @param {Express} app The Express application.
 * @author Ngoni19 <https://github.com/Ngoni19>
 */
const mapRoutes = (app) => {
  app.get('/', AppController.getHomepage);
  app.get('/students', StudentsController.getAllStudents);
  app.get('/students/:major', StudentsController.getAllStudentsByMajor);
};

export default mapRoutes;
module.exports = mapRoutes;
