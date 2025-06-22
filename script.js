const scheduleSelect = document.getElementById("schedule");
const timeSlotSelect = document.getElementById("timeSlot");

const timeSlots = {
  Morning: ["8:00 AM - 9:00 AM", "10:00 AM - 11:00 AM"],
  Afternoon: ["12:00 PM - 1:00 PM", "2:00 PM - 3:00 PM"],
  Evening: ["4:00 PM - 5:00 PM", "6:00 PM - 7:00 PM"]
};

scheduleSelect.addEventListener("change", function() {
  const selected = scheduleSelect.value;
  timeSlotSelect.innerHTML = '<option value="">--Select Time--</option>';
  
  if (timeSlots[selected]) {
    timeSlots[selected].forEach(function(slot) {
      const opt = document.createElement("option");
      opt.value = slot;
      opt.textContent = slot;
      timeSlotSelect.appendChild(opt);
    });
  }
});

const galleryAboutData = {
  Guitar: {
    img: "images/guitar1.jpg",
    text: "🎸 The guitar is a stringed musical instrument, typically with six or twelve strings, played by plucking or strumming the strings. It's a versatile instrument used in many musical genres, including folk, blues, country, and rock. Guitars are broadly categorized as acoustic or electric, each offering distinct sound characteristics."
  },
  Piano: {
    img: "images/piano1.webp",
    text: "🎹 The piano is a musical instrument known for its versatility and expressive range. It's a stringed keyboard instrument where hammers, activated by keys, strike strings to produce sound. Pianos are widely used in various musical genres, from classical to jazz and popular music."
  },
  Violin: {
    img: "images/violin1.jpeg",
    text: "🎻 The violin is a string instrument known for its high-pitched, soprano voice within the string family. It has four strings, tuned to G, D, A, and E, and is played by drawing a bow across the strings or plucking them."
  },
  Drums: {
    img: "images/drums1.jpg",
    text: "🥁 Drums are a foundational percussion instrument, producing sound by vibrating a stretched membrane (drumhead) when struck. They are essential components of rhythm sections in various musical genres."
  },
  Flute: {
    img: "images/flute1.jpeg",
    text: "🎶 The flute is a woodwind instrument characterized by its clear, bright sound. It appears in genres from classical to jazz. The sound is created by blowing air across an opening, causing the air column inside the flute to vibrate."
  }
};

function showAbout(instrument) {
  const data = galleryAboutData[instrument];
  const div = document.getElementById("galleryAbout");
  div.innerHTML = `
    <h3>${instrument}</h3>
    <img src="${data.img}" alt="${instrument}" style="max-width: 200px;" />
    <p>${data.text}</p>
  `;
  div.style.display = "block";
}

const feeByInstrument = {
  Guitar: 3000,
  Piano: 4000,
  Violin: 3500,
  Drums: 3200,
  Flute: 2800
};

document.querySelectorAll("input[name='instrument']").forEach(function(input) {
  input.addEventListener("change", function() {
    const selected = this.value;
    const fee = feeByInstrument[selected] || 0;
    document.getElementById("feeDisplay").textContent = `Fee: ₹${fee}`;
  });
});

document.getElementById("musicForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const instrument = document.querySelector("input[name='instrument']:checked");
  const schedule = scheduleSelect.value;
  const timeSlot = timeSlotSelect.value;

  if (name === "") {
    alert("Please enter your name.");
    return;
  }
  if (email === "" || !email.includes("@") || !email.includes(".")) {
    alert("Please enter a valid email.");
    return;
  }
  if (mobile === "" || !/^\d{10}$/.test(mobile)) {
    alert("Please enter a valid 10-digit mobile number.");
    return;
  }
  if (!instrument) {
    alert("Please select an instrument.");
    return;
  }
  if (schedule === "") {
    alert("Please select a preferred schedule.");
    return;
  }
  if (timeSlot === "") {
    alert("Please select a preferred time slot.");
    return;
  }

  const fee = feeByInstrument[instrument.value] || 0;

  // Hide form
  document.getElementById("musicForm").style.display = "none";

  // Display summary
  const summaryDiv = document.createElement("div");
  summaryDiv.style.background = "rgba(255, 255, 255, 0.9)";
  summaryDiv.style.padding = "20px";
  summaryDiv.style.borderRadius = "5px";
  summaryDiv.style.marginTop = "20px";
  summaryDiv.style.textAlign = "center";
  summaryDiv.style.boxShadow = "0 0 10px rgba(0,0,0,0.2)";

  summaryDiv.innerHTML = `
    <h2>Thank you, ${name}!</h2>
    <p>You registered for <strong>${instrument.value}</strong> class.</p>
    <p>Schedule: <strong>${schedule}</strong> | Time Slot: <strong>${timeSlot}</strong></p>
    <p>Fee: <strong>₹${fee}</strong></p>
  `;

  document.body.appendChild(summaryDiv);
});
