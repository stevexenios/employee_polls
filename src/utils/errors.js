export class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export class UserAlreadyExists extends Error {
  constructor(message) {
    super(message);
    this.name = 'UserAlreadyExists';
  }
}
