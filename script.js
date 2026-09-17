const menu = document.querySelector('#menu');
const nav = document.querySelector('.nav');
const navLinks = document.querySelector('#navLinks');

menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('open', !open);
  navLinks.classList.toggle('open', !open);
});

navLinks?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menu.setAttribute('aria-expanded', 'false');
  nav.classList.remove('open');
  navLinks.classList.remove('open');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -30px' });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

const header = document.querySelector('.nav-wrap');
let previousY = window.scrollY;
window.addEventListener('scroll', () => {
  const currentY = window.scrollY;
  header.style.transform = currentY > previousY && currentY > 180 ? 'translateY(-90px)' : 'translateY(0)';
  header.style.transition = 'transform .35s ease';
  previousY = currentY;
}, { passive: true });

const projects = {
  payroll: { 
    number:'PROJECT / 01', title:'Green at Work', 
    lead:'A security-first payroll and attendance platform for employees, work-from-home staff, managers, and administrators—each with tightly scoped access to sensitive workforce data.', 
    role:'Security & full-stack developer', 
    stack:'Node.js · Express · MongoDB · Handlebars · Crypto scrypt', 
    focus:'Authentication · RBAC · Audit logging', 
    challenge:'Payroll records, salary details, attendance logs, and employee accounts require strict confidentiality. The application had to prevent route bypasses, brute-force login attacks, privilege escalation, weak-password risks, unsafe account recovery, and incomplete forensic records.', 
    approach:'We implemented centralized authorization middleware for four role levels, salted scrypt password hashes, 12-character complexity rules, five-password history, 24-hour password age, and automatic 15-minute lockout after five failed attempts. Strict server-side validation, re-authentication for critical actions, generic error responses, and standardized MongoDB audit events provide defense in depth across payroll, timekeeping, and employee-management workflows.', 
    link:'https://github.com/KeiTraj/CSSECDV-Secure-Payroll-Web-Application' },
  flight: { 
    number:'PROJECT / 02', 
    title:'Flight Booking', 
    lead:'A distributed flight-booking platform that keeps reservations consistent under concurrent demand while separating transactional, analytical, and recovery workloads.', 
    role:'Lead developer · Full system implementation', 
    stack:'Node.js · Express · PostgreSQL · Docker Compose · Apache JMeter', 
    focus:'Replication · Concurrency · Fault recovery', 
    challenge:'The system had to prevent double-booking during simultaneous seat requests, keep analytical queries from blocking live transactions, and continue operating through database-node failures without losing committed data.', 
    approach:'I designed and implemented a three-node PostgreSQL architecture: a primary for all writes, a physical hot standby for high-availability failover, and a logically replicated reports node for OLAP queries. READ COMMITTED transactions with SELECT FOR UPDATE serialized contested bookings. In testing, 20 simultaneous requests produced exactly one successful reservation, while primary failover completed with zero transaction loss.', 
    link:'https://github.com/KeiTraj/flight-booking-system' },
  chatbot: { 
    number:'PROJECT / 03', 
    title:'Family Relations Chatbot', 
    lead:'A logic-based conversational expert system that learns family facts, answers relationship questions, and derives relationships that were never explicitly stated.', 
    role:'Python & knowledge-base developer', 
    stack:'Python · PROLOG · PySwip · Regex', 
    focus:'Logic inference · Knowledge representation', 
    challenge:'The chatbot had to translate strict natural-language patterns into logical queries, infer real-world family relationships, and reject impossible facts—such as circular parentage or conflicting gender relationships—without crashing on invalid prompts.', 
    approach:'I separated conversation handling from reasoning: Python parses statements and questions, validates their structure, and communicates with a PROLOG knowledge base through PySwip. PROLOG stores facts and relationship rules, checks feasibility, and derives answers such as siblings, parents, children, aunts, uncles, and grandparents.', 
    link:'https://github.com/KeiTraj' },
  taftbites: { 
    number:'PROJECT / 04', 
    title:'TaftBites', 
    lead:'A location-aware food discovery and review app that helps students and food lovers find nearby restaurants throughout the Taft area.', 
    role:'Mobile application developer', 
    stack:'JavaScript · Android · MongoDB · Maps API · Facebook API · NPM', 
    focus:'Geolocation · Discovery · Community reviews', 
    challenge:'Students needed one mobile experience for discovering nearby food, comparing restaurants, and finding reliable community feedback—while ensuring reviews came from people who had actually visited.', 
    approach:'We designed a map-led discovery flow with searchable restaurant listings and detailed pages for menus, opening hours, addresses, price ranges, ratings, and reviews. Location-aware check-ins support credible contributions, while account and social features preserve each user’s review history and make experiences shareable.', 
    link:'https://github.com/KeiTraj/MOBDEVE_TaftBites' },
  gaming: { 
    number:'PROJECT / 05', 
    title:'GamerSnook!', 
    lead:'A gaming-focused community platform where casual players and dedicated enthusiasts can review games, exchange strategies, join discussions, and build connections.', 
    role:'Web application developer', 
    stack:'HTML · CSS · JavaScript', 
    focus:'Community · Reviews · Social interaction', 
    challenge:'The platform needed to organize several connected experiences—reviews, forum discussions, profiles, personal game libraries, voting, friendships, and messaging—without making the community difficult to navigate.', 
    approach:'We designed GamerSnook around persistent user accounts and public profiles. Members can publish game reviews and ratings, create discussion threads, reply through nested comments, search community content, manage a personal game library, connect through friend requests, and continue conversations through private messaging.', 
    link:'https://github.com/KeiTraj/Gaming-Community-Website' },
  alltrade: { 
    number:'PROJECT / 06', 
    title:'Alltrade', 
    lead:'A client and commerce platform created for Alltrade Marketing & Manufacturing—establishing its online presence while bringing inquiries, product access, and ordering into one website.', 
    role:'Web developer · Requirements & implementation team', 
    stack:'HTML · CSS · JavaScript', 
    focus:'Client portal · E-commerce · Business digitization', 
    challenge:'Alltrade had no functioning website, limiting how potential customers discovered its toll-manufacturing services. Existing clients also depended on manual channels for inquiries, product requests, order placement, and purchase tracking.', 
    approach:'Our team created an informative public website for Alltrade’s home care, personal care, and food manufacturing services, paired with secure client accounts. The planned workflow supports product browsing, carts and transactions, purchase history, manufacturing-request tickets, inventory visibility, and online inquiries—reducing manual order handling and creating a clearer path from discovery to fulfillment.', 
    link:'https://github.com/KeiTraj' }
};
const modal = document.querySelector('#caseModal');
let lastTrigger;
function openCase(key, trigger) {
  const project = projects[key];
  if (!project) return;
  lastTrigger = trigger;
  const fields = {caseNumber:'number',caseTitle:'title',caseLead:'lead',caseRole:'role',caseStack:'stack',caseFocus:'focus',caseChallenge:'challenge',caseApproach:'approach'};
  Object.entries(fields).forEach(([id, field]) => {
    const element = document.querySelector(`#${id}`);
    if (field === 'stack') {
      element.replaceChildren(...project.stack.split('·').map(item => {
        const tag = document.createElement('span');
        tag.className = 'stack-tag';
        tag.textContent = item.trim();
        return tag;
      }));
    } else {
      element.textContent = project[field];
    }
  });
  document.querySelector('#caseLink').href = project.link;
  modal.hidden = false;
  document.body.classList.add('modal-open');
  requestAnimationFrame(() => modal.querySelector('.case-close').focus());
}
function closeCase() {
  modal.hidden = true;
  document.body.classList.remove('modal-open');
  lastTrigger?.focus();
}
document.querySelectorAll('[data-project]').forEach(card => card.addEventListener('click', event => { event.preventDefault(); openCase(card.dataset.project, card); }));
modal.querySelectorAll('[data-close-modal]').forEach(element => element.addEventListener('click', closeCase));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !modal.hidden) closeCase(); });
