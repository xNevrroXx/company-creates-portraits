// imports tech libraries
const path = require("path");
const uuid = require("uuid");
const multer = require("multer");
// other imports
const {readFileAsync, writeFileAsync} = require("../modules/files");


const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    let error = null;
    if(["image/jpeg", "image/png", "image/heic"].includes(file.mimetype) === false)
      error = new Error("wrong type");

    callback(error, path.join(__dirname, "..", "images"));
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  }
})
const upload = multer({storage: storage, limits: {fieldSize: 10485760}});
const feedbacksJsonPath = path.join(__dirname, "..", "feedbacks.json");

const routes = (app) => {
  app.get("/", (request, response) => {
    readFileAsync(feedbacksJsonPath)
      .then(data => response.json(JSON.parse(data.toString())))
      .catch(error => response.send(error));
  })

  app.get("/feedbacks", (request, response) => {
    readFileAsync(feedbacksJsonPath)
      .then(data => response.json(JSON.parse(data.toString())["feedbacks"]))
      .catch(error => response.send(error));
  })
  app.post("/feedbacks", upload.single("upload"),  (request, response, next) => {
    const file = {...request.file};

    const bodyData = {...request.body};
    bodyData.id = uuid.v1();
    if(file) {
      bodyData.image = {
        filename: file.filename,
        destination: file.destination
      };
    }

    response.json({file: file, body: bodyData});
    readFileAsync(feedbacksJsonPath)
      .then(data => {
        return new Promise(resolve => {
          const objData = JSON.parse(data.toString());
          const objFeedbacks = objData["feedbacks"];
          objFeedbacks.push(bodyData);
          resolve(objData);
        })
      })
      .then((objData) => writeFileAsync(feedbacksJsonPath, JSON.stringify(objData)))
      .then(() => readFileAsync(feedbacksJsonPath))
      .then(data => response.json(JSON.parse(data.toString())["feedbacks"]))
      .catch(error => response.send(error));
  })

  app.get("/feedbacks/:id", (request, response) => {
    readFileAsync(feedbacksJsonPath)
      .then(data => {
        const objData = JSON.parse(data.toString())["feedbacks"];
        const filteredData = objData.filter(({id}) => id == request.params.id);

        response.json(filteredData)
      })
      .catch(error => response.send(error));
  })
}

module.exports = routes;