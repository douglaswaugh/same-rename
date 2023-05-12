# Same Rename

I was bored with renaming every file I created in Visual Studio Code.  So I created this so I could rename the files in the same why every time by just running the command.

## Features

Renames the file by lowercasing the file name and replacing the spaces with hyphens.  It's a niche requirement.  I'm not expecting anyone else to really need this, but if you do, then that's cool!

I use Visual Studio Code for note taking and I want the name of the file to be the first line of its content, which in my case is the title of the document.  However, by default, Visual Studio Code uses it verbatim, but I want the title to be title case, and I want the filename to be lowercase with the spaces replaced by hyphens.  Which is what the command this extension has does.

## Instructions

1. Save your file
2. Look for the command `Same Rename` in the command palette and run
3. Use the time you've saved to do something productive, like pick your nose, or scratch your head

## Example

Filename before command: `2023-05-05 This Is A Really Good Title.md`

Filename after command: `2023-05-05-this-is-a-really-good-title.md`

## Known Issues

It's more about unknown unknowns at this point.

## Release Notes

### 0.0.1

First release.  Lowercasing and replacing spaces with hyphens is hard coded.  Limited testing done.  I'm sure there will be issues!

### 0.0.2

Update README

### 0.0.3

Update README for Tony
