package main

import (
	"context"
	"time"
)

// Note represents a single note
type Note struct {
	ID        string    `json:"id"`
	Title     string    `json:"title"`
	Content   string    `json:"content"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

// App struct
type App struct {
	ctx   context.Context
	notes map[string]Note
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{
		notes: make(map[string]Note),
	}
}

// startup is called when the app starts. The context is saved
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// CreateNote creates a new note
func (a *App) CreateNote(title, content string) Note {
	note := Note{
		ID:        time.Now().Format("20060102150405"),
		Title:     title,
		Content:   content,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}
	a.notes[note.ID] = note
	return note
}

// GetNotes returns all notes
func (a *App) GetNotes() []Note {
	notes := make([]Note, 0, len(a.notes))
	for _, note := range a.notes {
		notes = append(notes, note)
	}
	return notes
}

// UpdateNote updates an existing note
func (a *App) UpdateNote(id, title, content string) (Note, bool) {
	if note, exists := a.notes[id]; exists {
		note.Title = title
		note.Content = content
		note.UpdatedAt = time.Now()
		a.notes[id] = note
		return note, true
	}
	return Note{}, false
}

// DeleteNote deletes a note
func (a *App) DeleteNote(id string) bool {
	if _, exists := a.notes[id]; exists {
		delete(a.notes, id)
		return true
	}
	return false
}
