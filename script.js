    // Year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Mobile menu toggle
    const ham = document.getElementById('hamburger');
    const mobile = document.getElementById('mobile');
    ham.addEventListener('click',()=>{
      mobile.style.display = mobile.style.display === 'none' || mobile.style.display === '' ? 'block' : 'none';
    });

    //  main heading
    
    const words = ["Data Science", "Machine Learning"];
    let i = 0;
    let j = 0;
    let currentWord = "";
    let isDeleting = false;
    const typingElement = document.getElementById("Typing");

    function type() {
      const word = words[i];

      if (isDeleting) {
        currentWord = word.substring(0, j--);
      } else {
        currentWord = word.substring(0, j++);
      }

      typingElement.textContent = currentWord;

      if (!isDeleting && j === word.length + 1) {
        isDeleting = true;
        setTimeout(type, 1000); // rukne ka time
        return;
      } else if (isDeleting && j < 0) {
        isDeleting = false;
        i = (i + 1) % words.length;
      }

      setTimeout(type, isDeleting ? 100 : 150);
    }

    type();


    // Active link update on scroll
    const sections = ['home','services','about','skills', 'portfolio','contact'].map(id=>document.getElementById(id));
    const navLinks = Array.from(document.querySelectorAll('nav.links a'));
    const mobLinks = Array.from(mobile.querySelectorAll('a'));

    function setActive(id){
      [...navLinks, ...mobLinks].forEach(a=>{
        a.classList.toggle('active', a.getAttribute('href') === '#' + id);
      });
    }

    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          setActive(entry.target.id);
        }
      });
    },{threshold:.55});

    sections.forEach(sec=>sec && obs.observe(sec));

    // Reveal on scroll
    const reveals = document.querySelectorAll('.reveal');
    const revObs = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('show'); revObs.unobserve(e.target); } });
    },{threshold:.2});
    reveals.forEach(el=>revObs.observe(el));

// Contact form
// EmailJS initialization

emailjs.init("N7MqJbEBzUoECLthN"); // yaha apna EmailJS ka Public Key daalo

const form = document.getElementById('contactForm');
const msg = document.getElementById('formMsg');

form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const data = new FormData(form);

  if(!data.get('name') || !data.get('email') || !data.get('message')){
    msg.style.color = 'red';
    msg.textContent = 'Please fill the required fields.';
    return;
  }

  msg.style.color = '#6ee7b7';
  msg.textContent = '⏳ Sending...';

  emailjs.send("service_ld1sb3y", "template_2r2qgwc", {
    from_name: data.get('name'),
    reply_to: data.get('email'),
    subject: data.get('subject'),
    message: data.get('message')
  }).then(()=>{
      msg.style.color = '#6ee7b7';
      msg.textContent = "✅ Message sent successfully!";
      form.reset();
      setTimeout(()=>{msg.textContent=''; msg.style.color='';}, 4000);
  }).catch((error)=>{
      msg.style.color = 'red';
      msg.textContent = "❌ Failed to send: " + error.text;
  });
});




// Close mobile menu on link click
mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{ mobile.style.display='none'; }));