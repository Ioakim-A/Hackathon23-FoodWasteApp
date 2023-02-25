export default function getUserNameFromSessionID(sessionID) {
    const lastDashIndex = sessionID.lastIndexOf('-');
    if (lastDashIndex !== -1) {
      return sessionID.substring(lastDashIndex + 1);
    } else {
      return '';
    }
  }