export default class NotesAPI {

  constructor() {
    this.notes = this.getAllNotes();
    this.lastId = this.getLastId();
  }

  getAllNotes() {
    const notes = JSON.parse( localStorage.getItem("notesapp-notes") ) || [];
    return notes;
  }

  getLastId() {
    const lastId = parseInt( localStorage.getItem("notesapp-lastId") ) || 0;
    return lastId;
  }

  raiseLastId() {
    this.lastId += 1;
    localStorage.setItem("notesapp-lastId", this.lastId);
  }

  saveNotes() {
    localStorage.setItem("notesapp-notes", JSON.stringify(this.notes));
  }

  findNoteIndex(id) {
    for (let i=0; i<this.notes.length; i++) {
      if (this.notes[i].id == id) {
        return i;
      }
    }
    return undefined;
  }

  createNote() {
    this.raiseLastId();

    const newNote = {
      id: this.lastId,
      title: "Title...",
      body: "Your note is here...",
      updated: new Date()
    }

    this.notes.push(newNote);
    this.saveNotes();

    return this.lastId;
  }

  updateNote(noteToUpdate) {
    const noteIndex = this.findNoteIndex(noteToUpdate.id);
    if (noteIndex) {
      this.notes[noteIndex] = noteToUpdate;
      this.saveNotes();
    }
  }

  deleteNote(id) {
    const noteIndex = this.findNoteIndex(id);
    if (noteIndex || noteIndex == 0) {
      this.notes.splice(noteIndex, 1);
      this.saveNotes();
    }
  }

}
