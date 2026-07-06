const toggleBtn = document.getElementById('sidebarbtn');
const sidebar = document.getElementById('sidebar');
const yearstime = document.getElementById('year');
const yeartime = document.getElementById('years');
const monthtime = document.getElementById('month');
const daytime = document.getElementById('day');
const datetime = document.getElementById('date-time');


yearstime.textContent = new Date().getFullYear(); 
yeartime.textContent = new Date().getFullYear(); 
monthtime.textContent = new Date().toLocaleString('default', { month: 'short' }) ;
daytime.textContent = new Date().toLocaleString('default', { weekday: 'short' }) ;
datetime.textContent = new Date().getDate();

        // Listen for a click on the button
        toggleBtn.addEventListener('click', function() {
        // Toggle the 'open' class on the sidebar
        sidebar.classList.toggle('open');
        });