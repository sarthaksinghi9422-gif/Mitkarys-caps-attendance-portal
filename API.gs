/**
 * =====================================================
 * MITKARY'S CAPS Attendance Portal
 * API.gs
 * =====================================================
 */

const STUDENTS_SHEET = "Students";

/**
 * Returns all active batches with student count.
 */
function getBatches() {

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(STUDENTS_SHEET);

  const data = sheet.getDataRange().getValues();

  const batches = {};

  // Skip header row
  for (let i = 1; i < data.length; i++) {

    const batch = data[i][5];      // Column F
    const status = data[i][8];     // Column I

    if (!batch) continue;

    // Ignore inactive students
    if (status.toString().toLowerCase() !== "active") continue;

    if (!batches[batch]) {
      batches[batch] = 0;
    }

    batches[batch]++;

  }

  const result = [];

  Object.keys(batches)
    .sort()
    .forEach(batch => {

      result.push({
        name: batch,
        count: batches[batch]
      });

    });

  Logger.log(result);

  return result;

}

/**
 * Returns batches for the web app.
 */
function getBatchList() {

  return getBatches();

}
/**
 * Returns all active students of a batch
 */
function getStudents(batchName) {

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Students");

  const data = sheet.getDataRange().getValues();

  const students = [];

  for (let i = 1; i < data.length; i++) {

    const status = data[i][8].toString().toLowerCase();
    const batch = data[i][5];

    if (status !== "active") continue;

    if (batch != batchName) continue;

    students.push({

      id: data[i][0],
      name: data[i][1]

    });

  }

  return students;

}
