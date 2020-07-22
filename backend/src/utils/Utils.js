module.exports = {
  filterUserHabitArray(idKey, myArray) {
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].id === idKey) {
            return myArray[i];
        }
    }
  },

  checkIfHabitExistsForUser(habitId, arrayfOfHabits) {
    for (i = 0; i < arrayfOfHabits.length; i++) {
        if (arrayfOfHabits[i].id === habitId) {
            return true;
        }
    }
      return false;
  },

  getCurrentDate() {

      let today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      const yyyy = String(today.getFullYear());
      
      today = yyyy+mm+dd
      
      return today
  }
}