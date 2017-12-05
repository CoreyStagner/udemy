console.log('Opened app.js');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const Notes = require('./notes');

// See all arguments
const argv = yargs.argv;
// console.log('yargs:', argv); // For debug purposes

// Collect user information from command line
var commandArg = argv._[0];
var command = commandArg.toLowerCase();
Notes.log.command(command);
var title = argv.title;
var body = argv.body;



// Determine what command was called
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
        Notes.logNote(note)
    } else {
        Notes.log.noteNotFound(title);
    };// end if/else()
} else if (command === 'remove') {
    var noteRemoved = Notes.deleteNote(title);
    var message = noteRemoved ? Notes.log.delete(title) : Notes.log.noDelete(title);
} else if (command === 'list') {
    var allNotes = Notes.readAll();
    allNotes.forEach((note) => Notes.log.note(note))
} else {
    Notes.log.commandErr();
};// end if/else(command)

