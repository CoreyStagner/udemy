const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const Notes = require('./notes');

const titleConfig = {
    describe: 'Title of note',
    demand: true,
    alias: 't'};
const bodyConfig = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
};

// Configure Yargs
const argv = yargs
    .command('add', 'Add a new note.', {
        title: titleConfig,
        body: bodyConfig
    })
    .command('list', 'List all notes.')
    .command('read', 'Read a specific note', {
        title: titleConfig
    })
    .command('remove', 'Delete a specific note', {
        title: titleConfig
    })
    .help()
    .argv;

// Collect user information from command line
var commandArg = argv._[0];
var command = commandArg.toLowerCase();
Notes.log.command(command);
var title = argv.title;
var body = argv.body;

// switch (command) {
//     case 'add':
//         var note = Notes.addNote(title, body);
//         if (note) {
//             Notes.log.noteCreated(title);
//         } else {
//             Notes.log.noteFailed(title);
//         }
//         break;
// };// end switch()

// // Determine what command was called
if (command === 'add') {
    var note = Notes.addNote(title, body);
    if (note) {
        Notes.log.noteCreated(note)
    } else {
        Notes.log.noteFailed(title);
    };// end if/else()
} else if (command === 'read') {
    var note = Notes.readNote(title);
    if (note) {
        Notes.log.note(note)
    } else {
        Notes.log.noteNotFound(title);
    };// end if/else()
} else if (command === 'remove') {
    var noteRemoved = Notes.deleteNote(title);
    var message = noteRemoved ? Notes.log.delete(title) : Notes.log.noDelete(title);
} else if (command === 'list') {
    var allNotes = Notes.readAll();
    allNotes.forEach((note) => Notes.log.note(note));
} else {
    Notes.log.commandErr();
};// end if/else(command)

