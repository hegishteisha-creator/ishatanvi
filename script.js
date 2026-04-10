// Sidebar Page Switcher + Mobile Sidebar Control
function toggleMobileMenu() {
    document.getElementById('sidebar').classList.toggle('active');
    document.querySelector('.sidebar-overlay').classList.toggle('active');
}

document.querySelectorAll('.side-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const target = item.getAttribute('href').substring(1);
        
        // Remove active class from all
        document.querySelectorAll('.side-item').forEach(i => i.classList.remove('active'));
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        
        // Add active class to current
        item.classList.add('active');
        document.getElementById(target).classList.add('active');

        // If on mobile, close sidebar after clicking
        if(window.innerWidth <= 992) {
            toggleMobileMenu();
        }
    });
});

// Calculator Logic (Responsive version)
function generateInputs(type) {
    const count = document.getElementById(type === 'cgpa' ? 'cgCount' : 'pCount').value;
    const container = document.getElementById(type === 'cgpa' ? 'cgFields' : 'pFields');
    container.innerHTML = '';

    for(let i=0; i<count; i++) {
        const row = document.createElement('div');
        row.style.display = 'flex';
        row.style.gap = '10px';
        row.style.marginBottom = '10px';
        row.style.flexWrap = 'wrap'; // Allow fields to stack on very small screens
        
        row.innerHTML = type === 'cgpa' ? 
            `<input type="number" placeholder="Grade" class="cg-g" style="flex:1; min-width:80px"> <input type="number" placeholder="Credit" class="cg-c" style="flex:1; min-width:80px">` :
            `<input type="number" placeholder="Marks" class="p-m" style="flex:1; min-width:80px"> <input type="number" placeholder="Total" class="p-t" style="flex:1; min-width:80px">`;
        container.appendChild(row);
    }
    const btn = document.createElement('button');
    btn.className = "nav-btn-primary full";
    btn.style.width = "100%";
    btn.style.marginTop = "10px";
    btn.innerText = "Calculate Results";
    btn.onclick = () => type === 'cgpa' ? calcCGPA() : calcPerc();
    container.appendChild(btn);
}

// Logic for CalcCGPA and CalcPerc remains identical to your previous version...

function calcCGPA() {
    let p=0, c=0;
    document.querySelectorAll('.cg-g').forEach((g, i) => {
        if(g.value) {
            p += (parseFloat(g.value) * parseFloat(document.querySelectorAll('.cg-c')[i].value));
            c += parseFloat(document.querySelectorAll('.cg-c')[i].value);
        }
    });
    const res = document.getElementById('cgResult');
    res.innerText = c > 0 ? "Final CGPA: " + (p/c).toFixed(2) : "Error";
    res.classList.remove('hidden');
}

function calcPerc() {
    let m=0, t=0;
    document.querySelectorAll('.p-m').forEach((m_el, i) => {
        if(m_el.value) {
            m += parseFloat(m_el.value);
            t += parseFloat(document.querySelectorAll('.p-t')[i].value);
        }
    });
    const res = document.getElementById('pResult');
    res.innerText = t > 0 ? "Result: " + ((m/t)*100).toFixed(1) + "%" : "Error";
    res.classList.remove('hidden');
}

// Modal Functions
function openAuth() { document.getElementById('authModal').style.display = 'grid'; }
function closeAuth() { document.getElementById('authModal').style.display = 'none'; }
