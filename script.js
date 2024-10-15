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
  const downloadLink = box.getAttribute('data-download-link');

  // Set the manual name
  if (manualNames[boxId]) {
    newNameElement.textContent = manualNames[boxId];
  }

  // Prevent default link behavior and handle click
  box.addEventListener('click', (event) => {
    event.preventDefault();
    if (downloadLink) {
      window.open(downloadLink, '_blank');
    } else {
      console.error(`Download link not found for box ${boxId}`);
    }
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

// Function to update box name
function updateBoxName(boxId, newName) {
  const newNameElement = document.getElementById(`newName${boxId}`);
  if (newNameElement) {
    newNameElement.textContent = newName;
    manualNames[boxId] = newName;
    console.log(`Updated name for box ${boxId} to ${newName}`);
  } else {
    console.error(`New name element for box ${boxId} not found`);
  }
}

// Function to update download link
function updateDownloadLink(boxId, newLink) {
  const box = document.querySelector(`.box[data-id="${boxId}"]`);
  if (box) {
    box.setAttribute('data-download-link', newLink);
    const linkElement = box.querySelector('p');
    if (linkElement) {
      linkElement.textContent = `رابط التنزيل: ${newLink}`;
    }
    console.log(`Updated download link for box ${boxId} to ${newLink}`);
  } else {
    console.error(`Box with id ${boxId} not found`);
  }
}

// Example usage:
// updateBoxName(1, 'تطبيق جديد 1');
// updateDownloadLink(1, 'new-app1.apk');
