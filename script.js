document.querySelector('.start-button').addEventListener('click', () => {
	const startMenu = document.querySelector('.start-menu');
	startMenu.style.display = startMenu.style.display === 'none' || startMenu.style.display === '' ? 'block' : 'none';
});

document.querySelectorAll('.icon').forEach(icon => {
	icon.addEventListener('click', () => {
		const windowId = icon.id.replace('-icon', '-window');
		const folderWindow = document.getElementById(windowId);
		folderWindow.style.display = 'flex';
	});
});

function closeWindow(windowId) {
	const folderWindow = document.getElementById(windowId);
	folderWindow.style.display = 'none';
}

// Make folder windows draggable
document.querySelectorAll('.folder-window').forEach(folderWindow => {
	const header = folderWindow.querySelector('.window-header');
	let isDragging = false;
	let offsetX, offsetY;

	header.addEventListener('mousedown', (e) => {
		isDragging = true;
		offsetX = e.clientX - folderWindow.getBoundingClientRect().left;
		offsetY = e.clientY - folderWindow.getBoundingClientRect().top;
		folderWindow.style.zIndex = 1000; // Bring the window to the front
	});

	document.addEventListener('mousemove', (e) => {
		if (isDragging) {
			folderWindow.style.left = `${e.clientX - offsetX}px`;
			folderWindow.style.top = `${e.clientY - offsetY}px`;
		}
	});

	document.addEventListener('mouseup', () => {
		isDragging = false;
	});
});

// Intersection Observer for animation on visibility
const observer = new IntersectionObserver(entries => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add('visible');
		} else {
			entry.target.classList.remove('visible'); // Remove visibility when not in view
		}
	});
}, {
	threshold: 0.1 // Trigger when 10% of the element is visible
});

document.querySelectorAll('.timeline-item, .service-item').forEach(item => {
	observer.observe(item);
});

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.querySelector('.start-button');
    const startMenu = document.getElementById('start-menu');
    const navbarToggle = document.getElementById('navbar-toggle');
    const navbarMenu = document.getElementById('navbar-menu');
    const taskbarIcons = document.getElementById('taskbar-icons');

    startButton.addEventListener('click', () => {
        startMenu.style.display = startMenu.style.display === 'none' || startMenu.style.display === '' ? 'block' : 'none';
    });

    if (navbarToggle) {
        navbarToggle.addEventListener('click', () => {
            navbarMenu.classList.toggle('active');
        });
    }

    document.querySelectorAll('.icon').forEach(icon => {
        icon.addEventListener('click', () => {
            const windowId = icon.id.replace('-icon', '-window');
            const folderWindow = document.getElementById(windowId);
            folderWindow.style.display = 'flex';
            addTaskbarIcon(icon);
        });
    });

    function addTaskbarIcon(icon) {
        const iconId = icon.id.replace('-icon', '-taskbar-icon');
        if (!document.getElementById(iconId)) {
            console.log(`Adding taskbar icon for ${iconId}`);
            const taskbarIcon = document.createElement('div');
            taskbarIcon.classList.add('taskbar-icon');
            taskbarIcon.id = iconId;

            const img = document.createElement('img');
            img.src = icon.querySelector('img').src;
            img.alt = icon.querySelector('span').textContent;

            taskbarIcon.appendChild(img);
            taskbarIcons.appendChild(taskbarIcon);

            taskbarIcon.addEventListener('click', () => {
                const windowId = icon.id.replace('-icon', '-window');
                const folderWindow = document.getElementById(windowId);
                folderWindow.style.display = folderWindow.style.display === 'none' ? 'flex' : 'none';
            });
        } else {
            console.log(`Taskbar icon for ${iconId} already exists`);
        }
    }

    window.closeWindow = function(windowId) {
        const folderWindow = document.getElementById(windowId);
        folderWindow.style.display = 'none';
        removeTaskbarIcon(windowId);
    };

    window.minimizeWindow = function(windowId) {
        const folderWindow = document.getElementById(windowId);
        folderWindow.style.display = 'none';
    };

    function removeTaskbarIcon(windowId) {
        const iconId = windowId.replace('-window', '-taskbar-icon');
        const taskbarIcon = document.getElementById(iconId);
        if (taskbarIcon) {
            console.log(`Removing taskbar icon for ${iconId}`);
            taskbarIcons.removeChild(taskbarIcon);
        } else {
            console.log(`Taskbar icon for ${iconId} does not exist`);
        }
    }

    window.openWindow = function(windowId) {
        const folderWindow = document.getElementById(windowId);
        folderWindow.style.display = 'flex';
        addTaskbarIcon(document.querySelector(`#${windowId.replace('-window', '-icon')}`));
    };

    // Initialize Email
    emailjs.init("YOUR_USER_ID"); // Replace with your EmailJS user ID

    // Handle contact form submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email_id');
        const message = formData.get('message');

        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
            from_name: name,
            from_email: email,
            message: message
        }).then(function(response) {
            console.log('Email sent successfully!', response.status, response.text);
            alert('Email sent successfully!');
            contactForm.reset();
        }, function(error) {
            console.error('Failed to send email:', error);
            alert('Failed to send email. Please try again later.');
        });
    });
    function openWindow(windowId) {
        const folderWindow = document.getElementById(windowId);
        folderWindow.style.display = 'flex';
        addTaskbarIcon(document.querySelector(`#${windowId.replace('-window', '-icon')}`));
    }
    document.querySelectorAll('.start-menu-content ul li a').forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1); // Remove the '#' from the href
            openWindow(targetId);
        });
    });
});

