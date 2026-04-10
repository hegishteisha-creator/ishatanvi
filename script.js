// Sidebar Page Switcher
document.querySelectorAll('.side-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const target = item.getAttribute('href').substring(1);
        
        document.querySelectorAll('.side-item').forEach(i => i.classList.remove('active'));
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        
        item.classList.add('active');
        document.getElementById(target).classList.add('active');
    });
});

// Chat Functionality
function sendMsg() {
    const input = document.getElementById('msgInput');
    const feed = document.getElementById('chatFeed');
    if(!input.value) return;

    // Add User Message
    feed.innerHTML += `
        <div class="chat-msg">
            <img src="https://i.pravatar.cc/150?u=me" alt="Me">
            <div class="chat-bubble">
                <span class="sender">You (Student)</span>
                <p>${input.value}</p>
            </div>
        </div>
    `;

    const val = input.value.toLowerCase();
    input.value = '';
    feed.scrollTop = feed.scrollHeight;

    // Auto-Reply Simulation
    setTimeout(() => {
        let reply = "I'm here to help with your calculations!";
        if(val.includes('hi') || val.includes('hello')) {
            reply = "Hello! Welcome to the MPCOE Community Hub. How can I assist you today?";
        }

        feed.innerHTML += `
            <div class="chat-msg">
                <img src="https://i.pravatar.cc/150?u=bot" alt="Bot">
                <div class="chat-bubble">
                    <span class="sender">System Bot</span>
                    <p>${reply}</p>
                </div>
            </div>
        `;
        feed.scrollTop = feed.scrollHeight;
    }, 800);
}

// Calculator Logic
function generateInputs(type) {
    const count = document.getElementById(type === 'cgpa' ? 'cgCount' : 'pCount').value;
    const container = document.getElementById(type === 'cgpa' ? 'cgFields' : 'pFields');
    container.innerHTML = '';

    for(let i=0; i<count; i++) {
        const row = document.createElement('div');
        row.style.display = 'flex';
        row.style.gap = '10px';
        row.style.marginBottom = '10px';
        row.innerHTML = type === 'cgpa' ? 
            `<input type="number" placeholder="Grade" class="cg-g"> <input type="number" placeholder="Credit" class="cg-c">` :
            `<input type="number" placeholder="Marks" class="p-m"> <input type="number" placeholder="Total" class="p-t">`;
        container.appendChild(row);
    }
    const btn = document.createElement('button');
    btn.className = "nav-btn-primary";
    btn.innerText = "Calculate";
    btn.onclick = () => type === 'cgpa' ? calcCGPA() : calcPerc();
    container.appendChild(btn);
}

function calcCGPA() {
    let p=0, c=0;
    document.querySelectorAll('.cg-g').forEach((g, i) => {
        p += (parseFloat(g.value) * parseFloat(document.querySelectorAll('.cg-c')[i].value));
        c += parseFloat(document.querySelectorAll('.cg-c')[i].value);
    });
    const res = document.getElementById('cgResult');
    res.innerText = "Final CGPA: " + (p/c).toFixed(2);
    res.classList.remove('hidden');
}

function calcPerc() {
    let m=0, t=0;
    document.querySelectorAll('.p-m').forEach((m_el, i) => {
        m += parseFloat(m_el.value);
        t += parseFloat(document.querySelectorAll('.p-t')[i].value);
    });
    const res = document.getElementById('pResult');
    res.innerText = "Result: " + ((m/t)*100).toFixed(1) + "%";
    res.classList.remove('hidden');
}

// Modal Functions
function openAuth() { document.getElementById('authModal').style.display = 'grid'; }
function closeAuth() { document.getElementById('authModal').style.display = 'none'; }