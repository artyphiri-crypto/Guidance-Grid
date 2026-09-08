// Mock Data - Initial Mentors
const mentors = [
    {
        id: 1,
        name: "Dr. Evelyn Banda",
        field: "Agribusiness",
        title: "Agribusiness Specialist & Consultant",
        bio: "Specialising in value chain optimisation, feasibility studies, and farm management strategies.",
        initials: "EB"
    },
    {
        id: 2,
        name: "Alex Phiri",
        field: "Technology",
        title: "Senior Full-Stack Engineer",
        bio: "10+ years in web development, system architecture, and tech startup mentorship.",
        initials: "AP"
    },
    {
        id: 3,
        name: "Chisomo Tembo",
        field: "Finance",
        title: "Financial Analyst & Advisor",
        bio: "Helping young entrepreneurs and graduates with financial modelling and business funding strategies.",
        initials: "CT"
    },
    {
        id: 4,
        name: "Sarah Gondwe",
        field: "Marketing",
        title: "Digital Marketing Specialist",
        bio: "Guiding graduates on social media strategy, brand building, and corporate communications.",
        initials: "SG"
    },
    {
        id: 5,
        name: "Chisomo Chinyama",
        field: "Gender",
        title: "Gender & Social Development Specialist",
        bio: "Focusing on community development, gender mainstreaming, and social impact advocacy.",
        initials: "CC"
    },
    {
        id: 6,
        name: "Dr. Patrick Kaunda",
        field: "Mental Health",
        title: "Counseling Psychologist",
        bio: "Providing mental health guidance, career burnout prevention, and personal development strategy.",
        initials: "PK"
    },
    {
        id: 7,
        name: "Kondwani Banda",
        field: "Entrepreneurship",
        title: "Startup Incubator Mentor",
        bio: "Assisting early-stage founders with business model canvassing and commercial pitch decks.",
        initials: "KB"
    }
];

let currentSector = 'all';

// Render Mentors Dynamically to Grid
function displayMentors(data) {
    const grid = document.getElementById('mentors-grid');
    if (!grid) return;
    
    grid.innerHTML = '';

    if (data.length === 0) {
        grid.innerHTML = '<p class="no-results" style="color: #64748b; grid-column: 1/-1; text-align: center; padding: 20px;">No mentors found matching your criteria.</p>';
        return;
    }

    data.forEach(mentor => {
        const card = document.createElement('div');
        card.className = 'mentor-card';
        card.innerHTML = `
            <div class="mentor-card-header">
                <div class="mentor-avatar">${mentor.initials || 'MG'}</div>
                <span class="sector-badge">${mentor.field}</span>
            </div>
            <h3>${mentor.name}</h3>
            <p class="mentor-title" style="font-weight: 600; color: #2563eb; margin-bottom: 8px;">${mentor.title}</p>
            <p class="mentor-bio" style="color: #475569; font-size: 0.9rem; margin-bottom: 15px;">${mentor.bio}</p>
            <button class="btn-primary btn-full" onclick="openBookingModal('${mentor.name}', '${mentor.title}')">Book 1-on-1 Session</button>
        `;
        grid.appendChild(card);
    });
}

// Search and Sector Filter Handler
function filterAndSearchMentors() {
    const searchInput = document.getElementById('mentorSearchInput');
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    const filtered = mentors.filter(mentor => {
        const matchesSector = (currentSector === 'all') || (mentor.field === currentSector);
        const matchesQuery = mentor.name.toLowerCase().includes(query) ||
                             mentor.title.toLowerCase().includes(query) ||
                             mentor.bio.toLowerCase().includes(query) ||
                             mentor.field.toLowerCase().includes(query);

        return matchesSector && matchesQuery;
    });

    displayMentors(filtered);
}

// Category Button Filter Handler
function setSectorFilter(sector, buttonElement) {
    currentSector = sector;

    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    if (buttonElement) {
        buttonElement.classList.add('active');
    }

    filterAndSearchMentors();
}

// Modal Handlers
function openBookingModal(name, title) {
    const modalName = document.getElementById('modal-mentor-name');
    const modalTitle = document.getElementById('modal-mentor-title');
    const modal = document.getElementById('booking-modal');

    if (modalName) modalName.innerText = `Book with ${name}`;
    if (modalTitle) modalTitle.innerText = title;
    
    if (modal) {
        modal.style.display = 'flex';
    } else {
        alert(`Initiating booking request for 1-on-1 session with ${name}...`);
    }
}

function closeModal() {
    const modal = document.getElementById('booking-modal');
    if (modal) modal.style.display = 'none';
}

function confirmBooking(e) {
    e.preventDefault();
    alert('Booking request sent successfully! The mentor will review and confirm via email.');
    closeModal();
}

// Google Sign-In Placeholder Logic
function handleGoogleAuth() {
    alert("Google Authentication Initialised! Connecting to Guidance Grid account portal...");
}

// DOM Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initial display call
    displayMentors(mentors);

    // Mentor Application Form Handler (Home Page)
    const mentorForm = document.getElementById('mentor-form') || document.getElementById('mentor-apply-form');
    if (mentorForm) {
        mentorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('fullName') || document.getElementById('mentorName');
            const fieldInput = document.getElementById('field') || document.getElementById('mentorField');
            const bioInput = document.getElementById('bio') || document.getElementById('mentorBio');

            if (nameInput && fieldInput) {
                const nameParts = nameInput.value.trim().split(' ');
                const initials = nameParts.length > 1 
                    ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
                    : nameParts[0].substring(0, 2).toUpperCase();

                const newMentor = {
                    id: mentors.length + 1,
                    name: nameInput.value,
                    field: fieldInput.value,
                    title: "Mentorship Applicant",
                    bio: bioInput ? bioInput.value : "Experienced professional guidance.",
                    initials: initials
                };

                mentors.push(newMentor);
                filterAndSearchMentors();
                alert('Thank you for applying! Your profile has been submitted for review.');
                this.reset();
            }
        });
    }
});

// Toggle Chat Window
function toggleChatWindow() {
    const chatWindow = document.getElementById('chat-window');
    if (chatWindow) {
        chatWindow.classList.toggle('chat-window-hidden');
    }
}

// Handle Enter Key Press
function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

// Send Message Engine
function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const messagesContainer = document.getElementById('chatMessages');
    const text = input.value.trim();

    if (!text) return;

    // 1. Render User Message
    const userMsg = document.createElement('div');
    userMsg.className = 'message user-message';
    userMsg.innerText = text;
    messagesContainer.appendChild(userMsg);

    input.value = '';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // 2. Generate Simulated AI Response
    setTimeout(() => {
        const aiMsg = document.createElement('div');
        aiMsg.className = 'message ai-message';
        
        // Smart Response Keyword Routing
        const lowerText = text.toLowerCase();
        if (lowerText.includes('mentor') || lowerText.includes('advisor')) {
            aiMsg.innerText = "You can filter verified advisors by field right on the Home page grid, or use the search bar to find experts like Dr. Evelyn Banda or Alex Phiri.";
        } else if (lowerText.includes('upload') || lowerText.includes('cv') || lowerText.includes('proposal')) {
            aiMsg.innerText = "To submit documents for specialist review, visit the 'Upload Documents' tab in the main navigation menu.";
        } else if (lowerText.includes('event') || lowerText.includes('webinar')) {
            aiMsg.innerText = "Check out our 'Events & Stories' page to register for upcoming interactive masterclasses and workshops.";
        } else {
            aiMsg.innerText = "Thanks for asking! I am trained to assist with mentor matching, document reviews, and workshop scheduling across Guidance Grid.";
        }

        messagesContainer.appendChild(aiMsg);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 600);
}

// Simulated Subscription State
let userSubscription = {
    hasProductsAccess: false,
    hasReviewAccess: false,
    hasMentorshipAccess: false
};

// Access Gatekeeper Helper
function checkServiceAccess(serviceType, actionCallback) {
    if (serviceType === 'products' && !userSubscription.hasProductsAccess) {
        if (confirm("Subscription Required: You need a 'Toolkit Pass' or 'All-Access VIP' to download this product. Would you like to view subscription plans?")) {
            window.location.href = "subscriptions.html";
        }
        return;
    }
    
    if (serviceType === 'mentorship' && !userSubscription.hasMentorshipAccess) {
        if (confirm("Subscription Required: You need a 'Direct Advisory' or 'All-Access VIP' plan to book 1-on-1 sessions. Would you like to view subscription plans?")) {
            window.location.href = "subscriptions.html";
        }
        return;
    }

    // If active, execute original action
    actionCallback();
}