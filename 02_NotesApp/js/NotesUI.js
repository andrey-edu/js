export default class NotesUI {

  constructor(notesData, root, notesPreview) {
    this.notesData = notesData;
    this.root = root;
    this.notesPriveiw = notesPreview;

    this.showListNotes();

    this.root.querySelector("#add-note").addEventListener("click", () => {
      this.notesData.createNote();
      this.showListNotes();
    });

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
    this.notesPriveiw.innerHTML = this.initListNotes();
  }


}
