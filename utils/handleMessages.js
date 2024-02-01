const sendResponseMessage = (res, message) => res.send({ message: message });
const sendNotFoundMessage = (res, message) =>
  res.status(404).send({ message: message });

const sendErrorMessage = (res, message) => {
  res.status(500).send({ message: message });
};

module.exports = {
  sendResponseMessage,
  sendNotFoundMessage,
  sendErrorMessage
}