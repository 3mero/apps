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
  const originalLink = box.getAttribute('href');

  // Set the manual name
  if (manualNames[boxId]) {
    newNameElement.textContent = manualNames[boxId];
  }

  // Prevent default link behavior and handle click
  box.addEventListener('click', (event) => {
    event.preventDefault();
    // Use the original link from index.html
    window.open(originalLink, '_blank');
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

// Example usage:
// updateBoxName(1, 'تطبيق جديد 1');
