const fs = require('fs');

var fetchNotes = () => {
    // Get current notes-data.json existing data
    try {
        var notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch (e) {
        console.log('Unable to find notes-data.json, or data was corrupt. If file did not exist then the file will be created.');
        return [];
    };// end try/catch()
};// end fetchNotes()

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};// end saveNotes()

var addNote = (title, body) => {
    // Sanity Check
    // console.log("title", title);
    // console.log("body", body);
    if (title && body != undefined) {
        // console.log('else');
        var newNote = {
            title,
            body
        };
    } else {
        return
    }

    // Create array to hold all notes
    var notes = fetchNotes();

    // // Create the new note
    // var newNote = {
    //     title,
    //     body
    // };

    // Filters through the notes array to see if title already exists. If title is unique then all note to be added to array.
    var duplicateNotes = notes.filter((note) => note.title === title);
    if (duplicateNotes.length === 0) {
        notes.push(newNote);
        saveNotes(notes);
        return newNote;
    } else {
        return
    }; // end if/else()
}; // end addNote()

var readAll = () => {
    var notes = fetchNotes();
    return notes;
};

var readNote = (title) => {
    var notes = fetchNotes();
    var filteredNotes = notes.filter((note) => note.title === title)
    return filteredNotes[0];
};

var deleteNote = (title) => {
    var notes = fetchNotes();
    var filteredNotes = notes.filter((note) => note.title !== title);
    if (filteredNotes < notes) {
        saveNotes(filteredNotes);
        return notes.length !== filteredNotes.length;
    }
};

// Middleware

var log = {
    note: function (note) {
        console.log(`
----- Note Found -----
        Title: ${note.title}
         Body: ${note.body}
----------------------`);
    },
    noteNotFound: function (title){
        console.log(`Note with Title -> ${title} <- was note found. Check Spelling or use LIST to find title you are searching for.`)
    },
    noteCreated: function (note) {
        console.log(`
---- Note Created ----
        Title: ${note.title}
         Body: ${note.body}
----------------------`);
    },
    noteFailed: function (title) {
        console.log(`Error with Note -> ${title} <- If title already exists use a unique title. If undefined check syntax, make sure you are using --title and --body, and double quotes "" if there are spaces.`);
    },
    delete: function (title) {
        console.log(`The Title -> ${title} <- was deleted.`);
    },
    noDelete: function (title) {
        console.log(`The Title -> ${title} <- does not exist. No note was deleted. Double check spelling. If unsure your can use LIST to see all current notes.`)
    },
    command: function (command) {
        console.log('Command:', command.toUpperCase());
    },
    commandErr: function () {
        console.log(`Command was not recognized. Run --help if you need more assistance.`)
    }
}

module.exports = {
    addNote,
    readNote,
    readAll,
    deleteNote,
    log
};