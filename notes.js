const chalk = require('chalk')
const fs = require('fs')
const MyNotes = "Hello This my First Note"
getNotes = () => {
    return MyNotes
}

const addNote = (title, body) => {
    const Notes = loadNotes()
    //const isDuplicate = Notes.filter(note => note.title === title) 
    //More Optimized  we can use find istead of filter
    //Find stops if the duplicate is found instead of looping all over the data

    const isDuplicate = Notes.find(note => note.title === title)

    debugger

    if (!isDuplicate) {
        Notes.push({
            title: title,
            body: body
        })
        saveNote(Notes)
        console.log(chalk.green.inverse("Note Added Successfully"));
    } else {
        console.log(chalk.red.inverse("Note with this title Already Exists"));
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const isTitle = notes.filter(note => note.title === title)

    if (isTitle.length !== 0) {
        const removedNoteData = notes.filter(note => note.title !== title);
        saveNote(removedNoteData)

        console.log(chalk.green.inverse("Note Removed Successfully"));
    } else {
        console.log(chalk.red.inverse("Note not found"));
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.inverse("Your Notes"));
    notes.forEach((note) => {
        console.log("Title: ", note.title)
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const getNote = notes.find(note => note.title === title)
    if (getNote) {
        console.log(chalk.inverse("Your Note"));
        console.log("Title: ", getNote.title);
        console.log("Body: ", getNote.body);
    } else {
        console.log(chalk.red.inverse("Note Not Found"));
    }
}

const saveNote = (Notes) => {
    const dataJSON = JSON.stringify(Notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const databuffer = fs.readFileSync('notes.json')
        const dataJSON = JSON.parse(databuffer.toString())
        return dataJSON
    } catch (e) {
        return []
    }

}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}