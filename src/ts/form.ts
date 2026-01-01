// Contact Form
const fields = document.querySelectorAll('form.contact .field');

fields.forEach((field) => {
   const input = field.querySelector('input');
   const textarea = field.querySelector('textarea');
   const label = field.querySelector('label');

   if (input) {
      input.addEventListener('focus', () => {
         if (label) {
            if (label.classList.contains('active') === false) {
               label.classList.add('active');
            }
         }
      });

      input.addEventListener('blur', () => {
         if (label) {
            if (input.value === '') {
               label.classList.remove('active');
            }
         }
      });
   }

   if (textarea) {
      textarea.addEventListener('focus', () => {
         if (label) {
            if (label.classList.contains('active') === false) {
               label.classList.add('active');
            }
         }
      });

      textarea.addEventListener('blur', () => {
         if (label) {
            if (textarea.value === '') {
               label.classList.remove('active');
            }
         }
      });
   }
});