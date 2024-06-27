class Note {
    constructor(name, description) {
      if (!name || !description) {
        throw new Error("не може бути пустим");
      }
      this.name = name;
      this.description = description;
      this.createdAt = new Date();
      this.editedAt = null;
      this.completed = false;
    }
  
    edit(name, description) {
      if (!name || !description) {
        throw new Error("не може бути пустим");
      }
      this.name = name;
      this.description = description;
      this.editedAt = new Date();
    }
  
    markAsCompleted() {
      this.completed = true;
    }
  }
  
  class TodoList {
    constructor() {
      this.notes = [];
    }
  
    addNote(name, description) {
      const note = new Note(name, description);
      this.notes.push(note);
      render();
    }
  
    deleteNote(name) {
      this.notes = this.notes.filter((note) => note.name !== name);
      render();
    }
  
    editNote(name, newName, newDescription) {
      const note = this.notes.find((note) => note.name === name);
      if (note) {
        note.edit(newName, newDescription);
        render();
      }
    }
  
    markAsCompleted(name) {
      const note = this.notes.find((note) => note.name === name);
      if (note) {
        note.markAsCompleted();
      }
      render();
    }
  
    getNote(name) {
      return this.notes.find((note) => note.name === name);
    }
  
    getAllNotes() {
      return this.notes;
    }
  
    getUnfulfilledNotesCount() {
      return this.notes.filter((note) => !note.completed).length;
    }
  
    getNotesCount() {
      return this.notes.length;
    }
  
    searchByName(name) {
      return this.notes.filter((note) => note.name.includes(name));
    }
  
    sortByStatus() {
      this.notes.sort((a, b) => a.completed - b.completed);
      render();
    }
  
    sortByCreationDate() {
      this.notes.sort((a, b) => a.createdAt - b.createdAt);
      render();
    }
  
    sortByEditDate() {
      this.notes.sort((a, b) => (a.editedAt || a.createdAt) - (b.editedAt || b.createdAt));
      render();
    }
  }
    

  const todoList = new TodoList();
  
  function addNote() {
    const name = document.getElementById('noteName').value;
    const description = document.getElementById('noteDescription').value;
    try {
      todoList.addNote(name, description);
      document.getElementById('noteName').value = '';
      document.getElementById('noteDescription').value = '';
    } catch (error) {
      alert(error.message);
    }
  }
  
  function editNotePrompt(name) {
    const note = todoList.getNote(name);
    const newName = prompt('Введи нове імя для нотатки:', note.name);
    const newDescription = prompt('Введи новий опис для нотатки:', note.description);
    if (newName && newDescription) {
      todoList.editNote(name, newName, newDescription);
    }
  }
  
  function deleteNotePrompt(name) {
    if (confirm(`Ти впевнений видалити нотатку ${name}?`)) {
      todoList.deleteNote(name);
    }
  }
  
  function toggleComplete(name) {
    todoList.markAsCompleted(name);
  }

  function render() {
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = '';
    todoList.getAllNotes().forEach(note => {
      const noteDiv = document.createElement('div');
      noteDiv.className = 'note' + (note.completed ? ' completed' : '');
      noteDiv.innerHTML = `
        <h3>${note.name}</h3>
        <p>${note.description}</p>
        <small>Created: ${note.createdAt.toLocaleString()}</small>
        <small>Edited: ${note.editedAt ? note.editedAt.toLocaleString() : 'Never'}</small>
        <button onclick="editNotePrompt('${note.name}')">Edit</button>
        <button onclick="deleteNotePrompt('${note.name}')">Delete</button>
        <button onclick="toggleComplete('${note.name}')">Complete</button>
      `;
      notesList.appendChild(noteDiv);
    });
  }

  todoList.render();
  
  