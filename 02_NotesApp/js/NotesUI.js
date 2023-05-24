export default class NotesUI {

  constructor(notesData, root) {

    this.notesData = notesData;
    this.activeNoteId = 1;
    this.root = root;

    this.notesPreview = this.root.querySelector("#notes-preview");
    this.addNoteBtn = this.root.querySelector("#add-note");
    this.noteTitle = this.root.querySelector("#note-title");
    this.noteContent = this.root.querySelector("#note-content");


    this.addNoteBtn.addEventListener("click", () => {
      this.createNote();
    });

    this.noteTitle.addEventListener("input", () => {
      this.updateNote();
    });

    this.noteContent.addEventListener("input", () => {
      this.updateNote();
    });


    this.reloadUI();

  }

  reloadUI() {
    this.showListNotes();
    this.updateActiveNote(this.activeNoteId);
  }

  initNote(id, title, body, updated) {
    const note =
      `<div class="note-preview" data-note-id=${id}>
        <h3 class="note-preview__title">${title}</h3>
        <p class="note-preview__text">${body}</p>
        <p class="note-preview__date">${updated}</p>
      </div>`;
    return note;
  }

  initListNotes() {
    let notesList = ``;
    this.notesData.notes.forEach(element => {
      notesList += this.initNote(element.id, element.title, element.body, element.updated);
    });
    return notesList;
  }

  showListNotes() {
    if (this.initListNotes()) {
      this.notesPreview.innerHTML = this.initListNotes();
    }
    else {
      this.createNote();
    }

    const notesList = this.root.querySelectorAll(".note-preview");
    notesList.forEach(noteBtn => {
      noteBtn.addEventListener("click", this.noteBtnClick);
      noteBtn.pointer = this;
    });
  }

  noteBtnClick(evt) {
    const noteId = this.dataset.noteId;
    evt.currentTarget.pointer.updateActiveNote(noteId);
  }

  createNote() {
    const createdNoteId = this.notesData.createNote();
    // this.showListNotes();
    // this.updateActiveNote(createdNoteId);
  }

  // updateNote() {
  //   const newNote = {
  //     id: this.activeNoteId,
  //     title: this.noteTitle.innerHTML,
  //     body: this.noteContent.innerHTML,
  //     updated: new Date()
  //   }
  //   this.notesData.updateNote(newNote);
  //   console.log(this);
  // }

  // showNote(id) {
  //   const noteIndex = this.notesData.findNoteIndex(id);
  //   this.noteTitle.innerHTML = this.notesData.notes[noteIndex].title;
  //   this.noteContent.innerHTML = this.notesData.notes[noteIndex].body;
  // }

  // updateActiveNote(id) {
  //   const prevActiveNote = this.root.querySelector(`.note-preview[data-note-id="${this.activeNoteId}"]`);
  //   prevActiveNote.classList.remove("note-preview_active");

  //   const activeNote = this.root.querySelector(`.note-preview[data-note-id="${id}"]`);
  //   activeNote.classList.add("note-preview_active");
  //   this.activeNoteId = id;
  //   this.showNote(this.activeNoteId);
  // }

}
