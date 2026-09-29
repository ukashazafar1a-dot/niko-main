let customDelivery1Date1 = document.querySelector("[data-delivery-first]");
let customDelivery1Date2 = document.querySelector("[data-delivery-second]");
let customDelivery1Date3 = document.querySelector("[data-delivery-third]");
let customDeliveryTimer = document.querySelector("[data-delivery-timer]");
let customDate = document.querySelector("[data-timer-main]");
let capDate = document.querySelector("#delivery-date");
// console.log(
//   customDelivery1Date1,
//   customDelivery1Date2,
//   customDeliveryTimer,
//   customDelivery1Date3,
//   capDate
// );
getCurrentTimeDesc();

function getCurrentTimeDesc() {
  // const now = new Date("2024-03-26T08:00:00");
  const now = new Date();

  const day = now.getDay();
  const hour = now.getHours();
  const minute = now.getMinutes();
  let timecase = "";

  // checking it is which timecase of delivery
  if (
    (day == 1 && hour >= 8 && minute > 0) ||
    (day > 1 && day <= 3) ||
    (day == 4 && hour <= 8 && minute < 1)
  ) {
    // Monday 8:01 AM till Thursday 08:00
    timecase = 1;
  } else {
    // Thursday 8:01 AM till Monday 08:00
    timecase = 2;
  }
  if (timecase == 1) {
    let a = getNearestPastMonday(now, 8);
    let b = getNearestPastMonday(now, 10);
    if (customDelivery1Date1) {
      customDelivery1Date1.innerHTML = a;
    }
    if (customDelivery1Date2) {
      customDelivery1Date2.innerHTML = b;
    }
    //console.log("dates before middle date", a, b);
    let first = getPastMonday(now, 8);
    let second = getPastMonday(now, 10);
    let middle = getMiddleDateBetween(first, second);
    //console.log(first, second, middle);
    //console.log("Middle Date (timecase 1):", middle); // Debugging
    if (middle && customDelivery1Date3) {
      customDelivery1Date3.innerHTML = middle;
    }

    setCapDate(middle);
    let comingThursday = getNearestNextThursday(now);
    //console.log(comingThursday);
    let newNow = new Date().getTime();
    let remTime = convertMsToDHM(newNow, comingThursday);
    //console.log(remTime);
    if (customDeliveryTimer) {
      customDeliveryTimer.innerHTML = remTime;
    }
    setInterval(() => {
      let newNow = new Date().getTime();
      let remTime = convertMsToDHM(newNow, comingThursday);
      // console.log(remTime);
      if (customDeliveryTimer) {
        customDeliveryTimer.innerHTML = remTime;
      }
    }, 20000);
  }

  if (timecase == 2) {
    let a = getNearestPastThursday(now, 7);
    let b = getNearestPastThursday(now, 9);
    if (customDelivery1Date1) {
      customDelivery1Date1.innerHTML = a;
    }
    if (customDelivery1Date2) {
      customDelivery1Date2.innerHTML = b;
    }
    //console.log("dates before middle date", a, b);
    let third = getPastThursday(now, 7);
    let fourth = getPastThursday(now, 9);
    let fifthMiddle = getMiddleDateBetween(third, fourth);
    //console.log(third,fourth,fifthMiddle)
    if (fifthMiddle && customDelivery1Date3) {
      customDelivery1Date3.innerHTML = fifthMiddle;
    }
    setCapDate(fifthMiddle);
    let comingMonday = getNearestNextMonday(now);
    // console.log(comingMonday);
    let newNow = new Date().getTime();
    let remTime = convertMsToDHM(newNow, comingMonday);
    //console.log(remTime);
    if (customDeliveryTimer) {
      customDeliveryTimer.innerHTML = remTime;
    }
    setInterval(() => {
      let newNow = new Date().getTime();
      let remTime = convertMsToDHM(newNow, comingMonday);
      // console.log(remTime);
      if (customDeliveryTimer) {
        customDeliveryTimer.innerHTML = remTime;
      }
    }, 20000);
  }
}

function getNearestPastMonday(ref, daysToAdd) {
  let today = ref;
  let dayOfWeek = today.getDay();

  let daysToSubtract = (dayOfWeek + 6) % 7;

  let nearestPastMonday = new Date(today);
  nearestPastMonday.setDate(today.getDate() - daysToSubtract + +daysToAdd);

  let sameDayMonday = new Date(today);
  sameDayMonday.setDate(today.getDate() - daysToSubtract + +daysToAdd);

  if (dayOfWeek === 1) {
    return sameDayMonday.toLocaleString("de-DE", {
      month: "long",
      day: "numeric",
    });
  } else {
    return nearestPastMonday.toLocaleString("de-DE", {
      month: "long",
      day: "numeric",
    });
  }
}

function getNearestPastThursday(ref, daysToAdd) {
  let today = ref;
  let dayOfWeek = today.getDay();

  let daysToSubtract = (dayOfWeek + 3) % 7;

  let nearestPastThursday = new Date(today);
  nearestPastThursday.setDate(today.getDate() - daysToSubtract + +daysToAdd);

  let sameDayThursday = new Date(today);
  sameDayThursday.setDate(today.getDate() - daysToSubtract + +daysToAdd);

  if (dayOfWeek === 4) {
    return nearestPastThursday.toLocaleString("de-DE", {
      month: "long",
      day: "numeric",
    });
  } else {
    return nearestPastThursday.toLocaleString("de-DE", {
      month: "long",
      day: "numeric",
    });
  }
}

function getNearestNextThursday(ref) {
  // var today = new Date();
  const today = ref;

  let dayOfWeek = today.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
  let daysUntilThursday = (11 - dayOfWeek) % 7; // Number of days until next Thursday
  let nextThursday = new Date(
    today.getTime() + daysUntilThursday * 24 * 60 * 60 * 1000
  );

  // Set time to 8:00 AM
  nextThursday.setHours(8);
  nextThursday.setMinutes(0);
  nextThursday.setSeconds(0);
  nextThursday.setMilliseconds(0);

  // console.log(nextThursday.getTime());
  return nextThursday.getTime();
}

function getNearestNextMonday(ref) {
  let today = ref;
  let dayOfWeek = today.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
  let daysUntilMonday = (8 - dayOfWeek) % 7; // Number of days until next Monday
  if (daysUntilMonday === 0) daysUntilMonday = 7; // If today is Monday, set to next Monday
  let nextMonday = new Date(
    today.getTime() + daysUntilMonday * 24 * 60 * 60 * 1000
  );

  // Set time to 8:00 AM
  nextMonday.setHours(8);
  nextMonday.setMinutes(0);
  nextMonday.setSeconds(0);
  nextMonday.setMilliseconds(0);

  return nextMonday.getTime();
}

function convertMsToDHM(ref, target) {
  let miliseconds = target - ref;

  let days;
  let hours;
  let minutes;
  let seconds;
  let total_hours;
  let total_minutes;
  let total_seconds;

  total_seconds = parseInt(Math.floor(miliseconds / 1000));
  total_minutes = parseInt(Math.floor(total_seconds / 60));
  total_hours = parseInt(Math.floor(total_minutes / 60));
  days = parseInt(Math.floor(total_hours / 24));

  seconds = parseInt(total_seconds % 60);
  minutes = parseInt(total_minutes % 60);
  hours = parseInt(total_hours % 24);

  let dayText = days > 1 ? "Tage" : "Tag";

  // console.log(
  //   `${padTo2Digits(days)} days ${padTo2Digits(hours)} hours ${padTo2Digits(
  //     minutes
  //   )} minutes`
  // );

  return `${padTo2Digits(days)} ${dayText} ${padTo2Digits(
    hours
  )} std. ${padTo2Digits(minutes)} min.`;
}
function getMiddleDate(ref, pastDay, futureDay) {
  // Calculate the nearest past day (like a Thursday) by subtracting days
  const dayOfWeek = ref.getDay();
  const daysToSubtract = (dayOfWeek + (7 - pastDay)) % 7;
  const nearestPastDate = new Date(ref);
  nearestPastDate.setDate(ref.getDate() - daysToSubtract);

  // Calculate the future day by adding days
  const futureDate = new Date(nearestPastDate);
  futureDate.setDate(nearestPastDate.getDate() + futureDay);

  // Calculate the middle date
  const middleTimestamp =
    (nearestPastDate.getTime() + futureDate.getTime()) / 2;
  const middleDate = new Date(middleTimestamp);

  // Format the middle date (e.g., "29. November")
  return middleDate.toLocaleString("de-DE", {
    month: "long",
    day: "numeric",
  });
}
function getMiddleDateBetween(nearestPastMonday, sameDayMonday) {
  // Parse the dates into timestamp
  const timestamp1 = new Date(nearestPastMonday).getTime();
  const timestamp2 = new Date(sameDayMonday).getTime();

  // Calculate the midpoint timestamp
  const middleTimestamp = (timestamp1 + timestamp2) / 2;

  // Convert the midpoint timestamp back to a date object
  const middleDate = new Date(middleTimestamp);

  // Format the date into German locale (e.g., "4. Dezember")
  return middleDate.toLocaleString("de-DE", {
    month: "long",
    day: "numeric",
  });
}
function getPastMonday(ref, daysToAdd) {
  let today = ref;
  let dayOfWeek = today.getDay();

  let daysToSubtract = (dayOfWeek + 6) % 7;

  let nearestPastMonday = new Date(today);
  nearestPastMonday.setDate(today.getDate() - daysToSubtract + +daysToAdd);

  let sameDayMonday = new Date(today);
  sameDayMonday.setDate(today.getDate() - daysToSubtract + +daysToAdd);

  if (dayOfWeek === 1) {
    return sameDayMonday;
  } else {
    return nearestPastMonday;
  }
}
function getPastThursday(ref, daysToAdd) {
  let today = ref;
  let dayOfWeek = today.getDay();

  let daysToSubtract = (dayOfWeek + 3) % 7;

  let nearestPastThursday = new Date(today);
  nearestPastThursday.setDate(today.getDate() - daysToSubtract + +daysToAdd);

  let sameDayThursday = new Date(today);
  sameDayThursday.setDate(today.getDate() - daysToSubtract + +daysToAdd);

  if (dayOfWeek === 4) {
    return nearestPastThursday;
  } else {
    return nearestPastThursday;
  }
}
function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

function setCapDate(date) {
  setTimeout(() => {
    // console.log("Delayed for 3 second.");
    let capDate = document.querySelector("#delivery-date");
    // console.log("inside the setCapDate func", capDate, date);
    if (date && capDate) {
      capDate.innerHTML = date;
    }
  }, 3000);
}
