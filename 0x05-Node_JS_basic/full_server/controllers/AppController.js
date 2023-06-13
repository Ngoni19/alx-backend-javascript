/**
 * Contains miscellaneous route handlers.
 * @author Ngoni <https://github.com/Ngoni19>
 */
class AppController {
  static getHomepage(request, response) {
    response.status(200).send('Hello Holberton School!');
  }
}

export default AppController;
module.exports = AppController;
