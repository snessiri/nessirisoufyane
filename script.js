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

  document.addEventListener('DOMContentLoaded', () => {
  // تفعيل التحريك عند التمرير
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in'); // إضافة كلاس التحريك
        observer.unobserve(entry.target); // التوقف عن المراقبة لتحسين الأداء
      }
    });
  }, {
    threshold: 0.1 // يبدأ التحريك عند رؤية 10% من العنصر
  });

  // مراقبة العناصر التي تحتوي على الكلاس 'animate-on-scroll'
  document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
  });
});

});
