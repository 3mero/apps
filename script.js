// إنشاء أسماء جديدة عند تغيير الروابط
const boxes = document.querySelectorAll('.box');

boxes.forEach((box) => {
  const apkLink = box.getAttribute('href');
  const boxId = box.getAttribute('data-id');
  const newNameElement = document.getElementById(`newName${boxId}`);

  // الحصول على الرابط المخزن في LocalStorage
  const storedLink = localStorage.getItem(`apkLink${boxId}`);
  const storedName = localStorage.getItem(`apkName${boxId}`);

  // إذا كان الرابط مختلفًا فقط، قم بتخزين الرابط الجديد ولكن لا تطلب اسماً
  if (storedLink !== apkLink) {
    localStorage.setItem(`apkLink${boxId}`, apkLink);
    // إذا كان هناك اسم مخزن بالفعل، قم بعرضه
    if (storedName) {
      newNameElement.textContent = storedName;
    } else {
      newNameElement.textContent = ''; // عدم عرض أي شيء في حال عدم وجود اسم
    }
  } else {
    // إذا كان الرابط لم يتغير، عرض الاسم المخزن
    newNameElement.textContent = storedName ? storedName : '';
  }
});

// التنقل عبر الأسهم
document.addEventListener('keydown', (event) => {
  const focusedElement = document.activeElement;
  let nextElement;
  switch (event.key) {
    case 'ArrowRight':
      nextElement = focusedElement.nextElementSibling;
      break;
    case 'ArrowLeft':
      nextElement = focusedElement.previousElementSibling;
      break;
    case 'ArrowDown':
    case 'ArrowUp':
      // التحكم في الانتقال للأعلى والأسفل يمكن أن يتطلب مزيداً من التخصيص حسب الشبكة
      break;
  }
  if (nextElement) {
    nextElement.focus();
  }
});
