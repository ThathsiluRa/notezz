class NotesApp {
    constructor() {
        this.API_URL = 'http://localhost:5000/api';
        this.token = localStorage.getItem('token');
        this.currentNoteId = null;
        this.darkMode = localStorage.getItem('darkMode') === 'true';
        this.setupEventListeners();
        this.checkAuth();
        this.initializeDarkMode();
    }

    setupEventListeners() {
        // Auth tab switching
        document.querySelectorAll('.tab-btn').forEach(button => {
            button.addEventListener('click', () => this.switchAuthTab(button.dataset.tab));
        });

        // Form submissions
        document.getElementById('login-form').addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('register-form').addEventListener('submit', (e) => this.handleRegister(e));
        
        // Note actions
        document.getElementById('logout-btn').addEventListener('click', () => this.handleLogout());
        document.getElementById('new-note-btn').addEventListener('click', () => this.clearEditor());
        document.getElementById('save-note').addEventListener('click', () => this.saveNote());

        // Add dark mode toggle listener
        document.getElementById('dark-mode-toggle').addEventListener('click', () => this.toggleDarkMode());
    }

    initializeDarkMode() {
        if (this.darkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
            this.updateDarkModeIcon();
        }
    }

    toggleDarkMode() {
        this.darkMode = !this.darkMode;
        localStorage.setItem('darkMode', this.darkMode);
        
        if (this.darkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        
        this.updateDarkModeIcon();
    }

    updateDarkModeIcon() {
        const icon = document.querySelector('#dark-mode-toggle i');
        if (this.darkMode) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }

    clearEditor() {
        this.currentNoteId = null;
        document.getElementById('note-title').value = '';
        document.getElementById('note-content').value = '';
        document.querySelectorAll('.note-item').forEach(item => item.classList.remove('active'));
    }

    async saveNote() {
        const title = document.getElementById('note-title').value;
        const content = document.getElementById('note-content').value;

        if (!title || !content) {
            alert('Please enter both title and content');
            return;
        }

        if (this.currentNoteId) {
            await this.editNote(this.currentNoteId, title, content);
        } else {
            await this.createNote(title, content);
        }
    }

    switchAuthTab(tab) {
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.auth-form').forEach(form => form.classList.add('hidden'));
        
        document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
        document.getElementById(`${tab}-form`).classList.remove('hidden');
    }

    async handleLogin(e) {
        e.preventDefault();
        const form = e.target;
        const email = form.querySelector('input[type="email"]').value;
        const password = form.querySelector('input[type="password"]').value;

        try {
            const response = await fetch(`${this.API_URL}/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (response.ok) {
                this.token = data.token;
                localStorage.setItem('token', data.token);
                this.showNotesContainer();
                this.fetchNotes();
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert('Login failed');
        }
    }

    async handleRegister(e) {
        e.preventDefault();
        const form = e.target;
        const username = form.querySelector('input[type="text"]').value;
        const email = form.querySelector('input[type="email"]').value;
        const password = form.querySelector('input[type="password"]').value;

        try {
            const response = await fetch(`${this.API_URL}/users/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            });

            const data = await response.json();
            if (response.ok) {
                this.token = data.token;
                localStorage.setItem('token', data.token);
                this.showNotesContainer();
                this.fetchNotes();
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert('Registration failed');
        }
    }

    handleLogout() {
        localStorage.removeItem('token');
        this.token = null;
        this.showAuthContainer();
    }

    async createNote(title, content) {
        try {
            const response = await fetch(`${this.API_URL}/notes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify({ title, content })
            });

            if (response.ok) {
                await this.fetchNotes();
                this.clearEditor();
            } else {
                throw new Error('Failed to create note');
            }
        } catch (error) {
            alert('Failed to create note: ' + error.message);
        }
    }

    async editNote(noteId, title, content) {
        try {
            const response = await fetch(`${this.API_URL}/notes/${noteId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify({ title, content })
            });

            if (response.ok) {
                await this.fetchNotes();
            } else {
                throw new Error('Failed to update note');
            }
        } catch (error) {
            alert('Failed to update note: ' + error.message);
        }
    }

    async deleteNote(noteId) {
        if (!confirm('Are you sure you want to delete this note?')) {
            return;
        }

        try {
            const response = await fetch(`${this.API_URL}/notes/${noteId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });

            if (response.ok) {
                await this.fetchNotes();
                this.clearEditor();
            } else {
                throw new Error('Failed to delete note');
            }
        } catch (error) {
            alert('Failed to delete note: ' + error.message);
        }
    }

    async fetchNotes() {
        try {
            const response = await fetch(`${this.API_URL}/notes`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });

            const notes = await response.json();
            this.renderNotes(notes);
        } catch (error) {
            alert('Failed to fetch notes');
        }
    }

    renderNotes(notes) {
        const notesList = document.getElementById('notes-list');
        notesList.innerHTML = '';

        notes.forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.className = 'note-item';
            if (this.currentNoteId === note._id) {
                noteElement.classList.add('active');
            }
            
            noteElement.innerHTML = `
                <div class="note-content">
                    <h3>${note.title}</h3>
                    <p>${note.content.substring(0, 50)}${note.content.length > 50 ? '...' : ''}</p>
                </div>
                <div class="note-actions">
                    <button class="icon-btn delete-btn" onclick="event.stopPropagation(); app.deleteNote('${note._id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            
            noteElement.onclick = () => this.loadNoteToEditor(note);
            notesList.appendChild(noteElement);
        });
    }

    loadNoteToEditor(note) {
        this.currentNoteId = note._id;
        document.querySelectorAll('.note-item').forEach(item => item.classList.remove('active'));
        document.getElementById('note-title').value = note.title;
        document.getElementById('note-content').value = note.content;
        
        // Find and activate the clicked note item
        const noteItems = document.querySelectorAll('.note-item');
        noteItems.forEach(item => {
            if (item.querySelector('h3').textContent === note.title) {
                item.classList.add('active');
            }
        });
    }

    checkAuth() {
        if (this.token) {
            this.showNotesContainer();
            this.fetchNotes();
        } else {
            this.showAuthContainer();
        }
    }

    showNotesContainer() {
        document.getElementById('auth-container').classList.add('hidden');
        document.getElementById('notes-container').classList.remove('hidden');
    }

    showAuthContainer() {
        document.getElementById('auth-container').classList.remove('hidden');
        document.getElementById('notes-container').classList.add('hidden');
    }
}

// Initialize the app
const app = new NotesApp(); 