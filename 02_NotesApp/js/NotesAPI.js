export default class NotesAPI {

  getNotes(searchStr="") {
    searchStr = searchStr.toLowerCase();
    let notes = JSON.parse(localStorage.getItem("notesapp-notes")) || [];

    if (searchStr != '') {
      notes = notes.filter(note => {
        if (note.title.toLowerCase().search(searchStr) != -1 || note.body.toLowerCase().search(searchStr) != -1) {
          return true
        }
        return false;
      });
    }

    notes.sort((a,b) => {
      return new Date(a.updated) > new Date(b.updated) ? -1:1;
    });
    return notes;
  }

  getLastId() {
    const lastId = parseInt(localStorage.getItem("notesapp-lastId")) || 0;
    return lastId;
  }

  raiseLastId() {
    const raisedId = this.getLastId() + 1;
    localStorage.setItem("notesapp-lastId", raisedId);
    return raisedId;
  }

  saveNotes(notes) {
    localStorage.setItem("notesapp-notes", JSON.stringify(notes));
  }

  findNoteIndex(notes, id) {
    for (let i=0; i<notes.length; i++) {
      if (notes[i].id == id) {
        return i;
      }
    }
    return undefined;
  }

  createNote() {
    const lastId = this.raiseLastId();
    const notes = this.getNotes();

    const newNote = {
      id: lastId,
      title: "Title...",
      body: "Your note is here...",
      updated: new Date()
    }

    notes.push(newNote);
    this.saveNotes(notes);

    return lastId;
  }

  updateNote(noteToUpdate) {
    const notes = this.getNotes();
    const noteIndex = this.findNoteIndex(notes, noteToUpdate.id);
    if (noteIndex || noteIndex == 0) {
      notes[noteIndex] = noteToUpdate;
      this.saveNotes(notes);
    }
  }

  deleteNote(id) {
    const notes = this.getNotes();
    const noteIndex = this.findNoteIndex(id);
    if (noteIndex || noteIndex == 0) {
      notes.splice(noteIndex, 1);
      this.saveNotes(notes);
    }
  }

}
