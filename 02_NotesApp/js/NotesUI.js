export default class NotesUI {

  constructor(notesData, root) {

    this.notesData = notesData;
    this.activeNoteId = 1;
    this.root = root;

    this.notesPriveiw = this.root.querySelector("#notes-preview");
    this.addNoteBtn = this.root.querySelector("#add-note");
    this.noteTitle = this.root.querySelector("#note-title");
    this.noteContent = this.root.querySelector("#note-content");


    this.addNoteBtn.addEventListener("click", () => {
      this.createNote();
    });

    this.showListNotes();
    this.updateActiveNote(this.activeNoteId);
  }

  initListNotes() {
    let res = ``;
    this.notesData.notes.forEach(element => {
      res += `<div class="note-preview" data-note-id=${element.id}>
      <h3 class="note-preview__title">${element.title}</h3>
      <p class="note-preview__text">${element.body}</p>
      <p class="note-preview__date">${element.updated}</p>
      </div>`
    });
    return res;
  }

  showListNotes() {
    if (this.initListNotes()) {
      this.notesPriveiw.innerHTML = this.initListNotes();
    }
    else {
      this.createNote();
    }
  }

  createNote() {
    const createdNoteId = this.notesData.createNote();
    this.showListNotes();
    this.updateActiveNote(createdNoteId);
    this.activeNoteId = createdNoteId;
    this.initNote(createdNoteId);
  }

  initNote(id) {
    const noteIndex = this.notesData.findNoteIndex(id);
    // console.log(this.notesData.notes[noteIndex]);
    this.noteTitle.innerHTML = this.notesData.notes[noteIndex].title;
    this.noteContent.innerHTML = this.notesData.notes[noteIndex].body;
  }

  updateActiveNote(id) {
    const prevActiveNote = this.root.querySelector(`.note-preview[data-note-id="${this.activeNoteId}"]`);
    prevActiveNote.classList.remove("note-preview_active");

    const activeNote = this.root.querySelector(`.note-preview[data-note-id="${id}"]`);
    activeNote.classList.add("note-preview_active");
  }

}
