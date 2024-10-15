// PWA installation prompt
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  showInstallPromotion();
});

function showInstallPromotion() {
  const installButton = document.createElement('button');
  installButton.textContent = 'تثبيت التطبيق';
  installButton.addEventListener('click', installPWA);
  document.body.appendChild(installButton);
}

function installPWA() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      }
      deferredPrompt = null;
    });
  }
}

// Manual name settings
const manualNames = {
  1: "التطبيق الأول",
  2: "التطبيق الثاني",
  3: "التطبيق الثالث",
  4: "التطبيق الرابع"
};

// Handle box clicks and name updates
const boxes = document.querySelectorAll('.box');

boxes.forEach((box) => {
  const boxId = box.getAttribute('data-id');
  const newNameElement = document.getElementById(`newName${boxId}`);

  // Get the stored link from LocalStorage
  const storedLink = localStorage.getItem(`apkLink${boxId}`);

  // Update the href attribute with the stored link if available
  if (storedLink) {
    box.setAttribute('href', storedLink);
  }

  // Set the manual name
  if (manualNames[boxId]) {
    newNameElement.textContent = manualNames[boxId];
    localStorage.setItem(`apkName${boxId}`, manualNames[boxId]);
  }

  // Prevent default link behavior and handle click
  box.addEventListener('click', (event) => {
    event.preventDefault();
    const currentLink = box.getAttribute('href');
    // Here you can implement your logic for handling the APK download
    // For example, you might want to open it in a new tab:
    window.open(currentLink, '_blank');
  });
});

// Navigation using arrow keys
document.addEventListener('keydown', (event) => {
  const focusedElement = document.activeElement;
  let nextElement;
  switch (event.key) {
    case 'ArrowRight':
      nextElement = focusedElement.previousElementSibling;
      break;
    case 'ArrowLeft':
      nextElement = focusedElement.nextElementSibling;
      break;
    case 'ArrowDown':
      const currentIndex = Array.from(boxes).indexOf(focusedElement);
      nextElement = boxes[currentIndex + 5] || boxes[boxes.length - 1];
      break;
    case 'ArrowUp':
      const currentIdx = Array.from(boxes).indexOf(focusedElement);
      nextElement = boxes[currentIdx - 5] || boxes[0];
      break;
  }
  if (nextElement && nextElement.classList.contains('box')) {
    nextElement.focus();
  }
});

// Function to update APK link
function updateAPKLink(boxId, newLink) {
  const box = document.querySelector(`.box[data-id="${boxId}"]`);
  if (box) {
    box.setAttribute('href', newLink);
    localStorage.setItem(`apkLink${boxId}`, newLink);
    console.log(`Updated link for box ${boxId} to ${newLink}`);
  } else {
    console.error(`Box with id ${boxId} not found`);
  }
}

// Function to update box name
function updateBoxName(boxId, newName) {
  const newNameElement = document.getElementById(`newName${boxId}`);
  if (newNameElement) {
    newNameElement.textContent = newName;
    localStorage.setItem(`apkName${boxId}`, newName);
    console.log(`Updated name for box ${boxId} to ${newName}`);
  } else {
    console.error(`New name element for box ${boxId} not found`);
  }
}

// Example usage:
// updateAPKLink(1, 'https://example.com/new-app1.apk');
// updateBoxName(1, 'تطبيق جديد 1');
