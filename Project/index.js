//login form container
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.querySelector('.container');

signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});


document.getElementById('googleSignUp').addEventListener('click', () => {
    alert('Google Sign Up');
});

document.getElementById('facebookSignUp').addEventListener('click', () => {
    alert('Facebook Sign Up');
});

document.getElementById('googleSignIn').addEventListener('click', () => {
    alert('Google Sign In');
});

document.getElementById('facebookSignIn').addEventListener('click', () => {
    alert('Facebook Sign In');
});

document.getElementById('registerForm').addEventListener('submit', function(event) {
  event.preventDefault();
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
          alert('User registered successfully!');
          window.location.href = 'login.html';
      })
      .catch((error) => {
          alert('Error: ' + error.message);
      });
});

//dashboard

document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
          alert('User logged in successfully!');
          window.location.href = 'dashboard.html';
      })
      .catch((error) => {
          alert('Error: ' + error.message);
      });
});


firebase.auth().onAuthStateChanged((user) => {
  if (user) {
      document.getElementById('userName').textContent = user.displayName || 'N/A';
      document.getElementById('userEmail').textContent = user.email;
      
  } else {
      if (window.location.pathname.includes('dashboard.html')) {
          window.location.href = 'login.html';
      }
  }
});

// index.html

document.addEventListener('DOMContentLoaded', () => {
    const courseModal = document.getElementById('course-modal');
    const closeModalBtn = document.querySelector('.close-btn');
    const addCourseBtn = document.getElementById('add-course-btn');
    const courseForm = document.getElementById('course-form');
    const coursesList = document.getElementById('courses-list');

    addCourseBtn.addEventListener('click', () => {
        courseModal.style.display = 'flex';
        courseForm.reset();
        document.getElementById('course-id').value = '';
    });

    closeModalBtn.addEventListener('click', () => {
        courseModal.style.display = 'none';
    });

    courseForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const courseId = document.getElementById('course-id').value;
        const title = document.getElementById('course-title').value;
        const description = document.getElementById('course-description').value;
        const category = document.getElementById('course-category').value;
        const tags = document.getElementById('course-tags').value;
        const image = document.getElementById('course-image').value;
        const video = document.getElementById('course-video').value;
        const pdf = document.getElementById('course-pdf').value;
        const quiz = document.getElementById('course-quiz').value;

        if (courseId) {
            // Edit existing course
            const courseItem = document.querySelector(`.course-item[data-id='${courseId}']`);
            courseItem.querySelector('h3').textContent = title;
            courseItem.querySelector('img').src = image;
            courseItem.querySelector('p').textContent = `Category: ${category}`;
            courseItem.querySelector('.tags').textContent = `Tags: ${tags}`;
        } else {
            // Add new course
            const courseItem = document.createElement('div');
            courseItem.className = 'course-item';
            courseItem.dataset.id = Date.now(); // Unique ID
            courseItem.innerHTML = `
                <img src="${image}" alt="Course Image">
                <h3>${title}</h3>
                <p>Category: ${category}</p>
                <p class="tags">Tags: ${tags}</p>
                <button class="btn edit-btn" onclick="editCourse('${courseItem.dataset.id}')">Edit</button>
                <button class="btn delete-btn" onclick="deleteCourse('${courseItem.dataset.id}')">Delete</button>
            `;
            coursesList.appendChild(courseItem);
        }

        courseModal.style.display = 'none';
    });
});

function editCourse(courseId) {
    const courseItem = document.querySelector(`.course-item[data-id='${courseId}']`);
    document.getElementById('course-id').value = courseId;
    document.getElementById('course-title').value = courseItem.querySelector('h3').textContent;
    document.getElementById('course-description').value = courseItem.querySelector('p').textContent; // Modify as needed
    document.getElementById('course-category').value = courseItem.querySelector('p').textContent.split(': ')[1]; // Modify as needed
    document.getElementById('course-tags').value = courseItem.querySelector('.tags').textContent.split(': ')[1]; // Modify as needed
    document.getElementById('course-image').value = courseItem.querySelector('img').src;
    document.getElementById('course-video').value = ''; // Modify as needed
    document.getElementById('course-pdf').value = ''; // Modify as needed
    document.getElementById('course-quiz').value = ''; // Modify as needed
    document.getElementById('course-modal').style.display = 'flex';
}

function deleteCourse(courseId) {
    const courseItem = document.querySelector(`.course-item[data-id='${courseId}']`);
    courseItem.remove();
}

//footer

document.addEventListener('DOMContentLoaded', function() {
    const footerSections = document.querySelectorAll('.footer-section');
    const options = {
      threshold: 0.1
    };
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, options);
  
    footerSections.forEach(section => {
      observer.observe(section);
    });
  });
  
//notification section

// Open Modal
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
    // Clear notification badge when modal is opened
    clearBadge(modalId);
}

// Close Modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Show Notification
function showNotification(message, badgeId) {
    const notificationBanner = document.getElementById('notificationBanner');
    const notificationMessage = document.getElementById('notificationMessage');

    notificationMessage.textContent = message;
    notificationBanner.classList.remove('hidden');

    setTimeout(() => {
        notificationBanner.classList.add('hidden');
    }, 3000);

    // Update the badge
    updateBadge(badgeId);
}

// Update Badge Count
function updateBadge(badgeId) {
    const badge = document.getElementById(badgeId);
    let count = parseInt(badge.textContent);
    count = isNaN(count) ? 1 : count + 1;
    badge.textContent = count;
}

// Clear Badge when Modal is Opened
function clearBadge(modalId) {
    const badge = document.querySelector(`[onclick="openModal('${modalId}')"] .badge`);
    if (badge) {
        badge.textContent = '';
    }
}

// Example: Trigger Notification for a Specific Modal
window.onload = function() {
    // Example: Show a notification for the course modal
    showNotification("New course material added!", "courseBadge");
    showNotification("New assignment uploaded!", "assignmentBadge");
}

// preview

document.getElementById('generate-certificate').addEventListener('click', function() {
    let progressElement = document.getElementById('progress');
    let currentProgress = parseInt(progressElement.style.width);
    
    if (currentProgress >= 100) {
        document.getElementById('certificate').textContent = "Congratulations! You have completed the course. Your certificate is generated.";
    } else {
        document.getElementById('certificate').textContent = "Complete the course to generate your certificate.";
    }
});

