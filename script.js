document.addEventListener('DOMContentLoaded', () => {
  // تهيئة EmailJS باستخدام المفتاح العام الخاص بك
  emailjs.init('Rs7q0N4DerusIUevO');  // استبدل بالمفتاح العام الخاص بك

  // التنقل السلس
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault(); // منع السلوك الافتراضي للنقر على الرابط
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth' // استخدام التنقل السلس
      });
    });
  });

  // التحريك عند التمرير
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeIn 1s forwards'; // تفعيل التحريك عند رؤية العنصر
      }
    });
  }, {
    threshold: 0.1 // يبدأ التحريك عند رؤية 10% من العنصر
  });

  document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element); // مراقبة العناصر للتحريك
  });

  // إرسال النموذج
  document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault(); // منع الإرسال الافتراضي للنموذج

    // جمع بيانات النموذج
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value
    };

    // إرسال البريد الإلكتروني باستخدام EmailJS
    emailjs.send('service_fyqth4k', 'template_uu3hchm', formData)
      .then(response => {
        alert('تم إرسال الرسالة بنجاح! سيتم التواصل معك قريبًا.');
        this.reset(); // إعادة تعيين النموذج بعد الإرسال الناجح
      }, error => {
        alert('حدث خطأ أثناء إرسال الرسالة، حاول مرة أخرى.');
        console.error('تفاصيل الخطأ:', error); // طباعة تفاصيل الخطأ
      });
  });
});
