// Autor: Oussama Soujoud

//Funktion zum Ändern des Datums, beispielsweise 6. Oktober, in Werktage z.B: 2 Werkatagen
function calculateWorkdaysBetweenDates(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    let workdays = -1;
    let currentDay = start;
  
    while (currentDay <= end) {
       // Überprüfen, ob es kein Sonntag (0) ist und zum Arbeitstage-Zähler hinzufügen
      if (currentDay.getDay() !== 0) {
        workdays++;
      }
      currentDay.setDate(currentDay.getDate() + 1);
    }
  
    return workdays;
  }
  
  // Funktion zum Berechnen von Arbeitstagen bis zu einem gegebenen Datum
  function calculateWorkingDays(givenDay) {
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
  
    // Überprüfen, ob der Monat des gegebenen Tages vor oder nach dem aktuellen Monat lieg
    const givenMonth = givenDay > currentDay ? currentMonth : currentMonth + 1;
    const year = givenMonth === 12 ? currentYear + 1 : currentYear;
  
     // Start- und Enddatum für die Berechnung der Arbeitstage festlegen
    const startDate = new Date(currentYear, currentMonth, currentDay);
    const endDate = new Date(year, givenMonth, givenDay);
  
    // Arbeitstage zwischen den Daten berechnen
    const workdays = calculateWorkdaysBetweenDates(startDate, endDate);
    return workdays;
  }
  
  const givenDay = 1;
  
  const workdays = calculateWorkingDays(givenDay);
  module.exports = {
    calculateWorkingDays // Export der calculateWorkingDays-Funktion für den Gebrauch in anderen Dateien
  };
  