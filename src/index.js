const { parse } = require("csv-parse");
const { createReadStream } = require("fs");
const data = [];

(async () => {
  var startTime = performance.now();

  createReadStream("./MOCK_DATA.csv")
    .pipe(parse({ delimiter: ",", from_line: 1, to_line: 10000000 }))
    .on("data", function (row) {
      const columns = [
        "id",
        "first_name",
        "last_name",
        "email",
        "sex",
        "ip",
      ];
      const obj = {};

      columns.forEach((element, index) => {
        obj[element] = row[index];
      });

      if ((obj.first_name?.match("Rodie") || []).length > 0) {
        data.push(obj);
      }
    })
    .on("end", function () {
      var endTime = performance.now();
      console.log(
        `Call to doSomething took ${endTime - startTime} milliseconds`
      );
    });
})();
