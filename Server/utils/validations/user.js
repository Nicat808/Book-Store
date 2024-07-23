const BaseModelValidator = require("./base/base-validation");

class UserValidation extends BaseModelValidator {
  constructor(user) {
    super();
    this.addValidation(() =>
      this.checkNotNull(user.username, "Username can't be empty")
    );
    this.addValidation(() =>
      this.checkNotNull(user.password, "Password can't be empty")
    );
    this.addValidation(() =>
      this.checkLength(user.username, 3, 50, "Username 3 and 50 chars")
    );
    this.addValidation(() =>
      this.checkLength(user.password, 5, 20, "Password 5 and 20 chars")
    );
  }
}

module.exports = UserValidation;
