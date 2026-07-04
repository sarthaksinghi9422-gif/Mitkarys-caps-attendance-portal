function doGet() {

  return HtmlService.createTemplateFromFile("Index")
    .evaluate()
    .setTitle("MITKARY'S CAPS Attendance Portal");
}

function include(filename){

return HtmlService.createHtmlOutputFromFile(filename).getContent();

}
