export default class NotesUI {

  constructor(notesData, root) {

    this.notesData = notesData;
    this.activeNoteId = 1;
    this.activeNote = {};
    // this.notesSortBy = get
    this.root = root;

    this.notesPreview = this.root.querySelector("#notes-preview");
    this.addNoteBtn = this.root.querySelector("#add-note");
    this.noteTitle = this.root.querySelector("#note-title");
    this.noteContent = this.root.querySelector("#note-content");
    this.searchForm = this.root.querySelector("#search-input");


    this.addNoteBtn.addEventListener("click", () => {
      this.createNote();
    });

    this.noteTitle.addEventListener("input", (e) => {
      this.updateNote();
      if (e.inputType == "insertParagraph") {
        this.noteContent.focus();
      }
    });

    this.noteContent.addEventListener("input", () => {
      this.updateNote();
    });

    this.searchForm.addEventListener("input", () => {
      this.initUI();
    });

    this.initUI();

  }

  initUI() {
    this.renderListNotes();
    this.renderNote();
  }

  // ! norm
  initListNotesItem(id, title, body, updated) {
    let active = "";
    if (id == this.activeNoteId) {
      active = "note-preview_active";
    }
    const note =
      `<div class="note-preview ${active}" data-note-id=${id}>
        <h3 class="note-preview__title">${title}</h3>
        <p class="note-preview__text">${body}</p>
        <p class="note-preview__date">${updated}</p>
      </div>`;
    return note;
  }


  // ! norm
  initListNotes() {
    let notesList = ``;
    const searchStr = this.searchForm.value;
    let notes = this.notesData.getNotes(searchStr);

    if (notes.length == 0) {
      this.notesData.createNote();
    }

    notes.forEach(note => {
      notesList += this.initListNotesItem(note.id, note.title, note.body, note.updated);
      if (note.id == this.activeNoteId) {
        this.activeNote = note;
      }
    });

    return notesList;
  }

  // ! norm
  renderListNotes() {
    // Создаем html-код для списка заметок
    this.notesPreview.innerHTML = this.initListNotes();

    // Вешаем обрабочик события click на все превью заметок
    const notesList = this.root.querySelectorAll(".note-preview");
    notesList.forEach(noteBtn => {
      noteBtn.addEventListener("click", () => {
        this.noteBtnClick(noteBtn);
      });
    });
  }

  // ! norm
  noteBtnClick(button) {
    this.activeNoteId = button.dataset.noteId;
    this.renderListNotes();
    this.renderNote();
  }

  // ! norm
  renderNote() {
    this.noteTitle.innerHTML = this.activeNote.title;
    this.noteContent.innerHTML = this.activeNote.body;
  }

  createNote() {
    const createdNoteId = this.notesData.createNote();
    this.activeNoteId = createdNoteId;

    this.renderListNotes();
    this.renderNote();
  }

  updateNote() {
    const newNote = {
      id: this.activeNoteId,
      title: this.noteTitle.innerHTML,
      body: this.noteContent.innerHTML,
      updated: new Date()
    }
    this.notesData.updateNote(newNote);
    this.renderListNotes();
  }

}
