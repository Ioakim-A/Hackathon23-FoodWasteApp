const { v4: uuidv4 } = require('uuid');

export default function generateSessionID() {
  return uuidv4();
}