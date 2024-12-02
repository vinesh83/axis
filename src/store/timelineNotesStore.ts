import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TimelineNote, NoteAttachment } from '../types/timeline';
import { v4 as uuidv4 } from 'uuid';

interface TimelineNotesState {
  notes: Record<string, TimelineNote>;
  activeNoteId: string | null;
  isExpanded: boolean;
  activeEventId: string | null;
  addNote: (eventId: string, content: string, attachments?: NoteAttachment[]) => Promise<void>;
  updateNote: (noteId: string, content: string, attachments?: NoteAttachment[]) => Promise<void>;
  deleteNote: (noteId: string) => Promise<void>;
  addAttachment: (noteId: string, attachment: NoteAttachment) => Promise<void>;
  deleteAttachment: (noteId: string, attachmentId: string) => Promise<void>;
  setActiveNote: (noteId: string | null) => void;
  setActiveEvent: (eventId: string | null) => void;
  toggleExpanded: () => void;
}

const dateReviver = (_key: string, value: any) => {
  const isDateString = typeof value === 'string' && 
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value);
  return isDateString ? new Date(value) : value;
};

export const useTimelineNotesStore = create<TimelineNotesState>()(
  persist(
    (set, get) => ({
      notes: {},
      activeNoteId: null,
      activeEventId: null,
      isExpanded: false,

      addNote: async (eventId, content, attachments = []) => {
        const noteId = uuidv4();
        const newNote: TimelineNote = {
          id: noteId,
          eventId,
          content,
          attachments,
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: 'Current User'
        };

        set((state) => ({
          notes: { ...state.notes, [noteId]: newNote },
          activeEventId: eventId,
          isExpanded: true
        }));
      },

      updateNote: async (noteId, content, attachments) => {
        const currentNote = get().notes[noteId];
        if (!currentNote) return;

        set((state) => ({
          notes: {
            ...state.notes,
            [noteId]: {
              ...currentNote,
              content,
              ...(attachments && { attachments }),
              updatedAt: new Date()
            }
          }
        }));
      },

      deleteNote: async (noteId) => {
        set((state) => {
          const { [noteId]: deletedNote, ...remainingNotes } = state.notes;
          return {
            notes: remainingNotes,
            activeNoteId: state.activeNoteId === noteId ? null : state.activeNoteId
          };
        });
      },

      addAttachment: async (noteId, attachment) => {
        const currentNote = get().notes[noteId];
        if (!currentNote) return;

        const updatedAttachments = [
          ...(currentNote.attachments || []),
          attachment
        ];

        set((state) => ({
          notes: {
            ...state.notes,
            [noteId]: {
              ...currentNote,
              attachments: updatedAttachments,
              updatedAt: new Date()
            }
          }
        }));
      },

      deleteAttachment: async (noteId, attachmentId) => {
        const currentNote = get().notes[noteId];
        if (!currentNote || !currentNote.attachments) return;

        const updatedAttachments = currentNote.attachments.filter(
          att => att.id !== attachmentId
        );

        set((state) => ({
          notes: {
            ...state.notes,
            [noteId]: {
              ...currentNote,
              attachments: updatedAttachments,
              updatedAt: new Date()
            }
          }
        }));
      },

      setActiveNote: (noteId) => set({ activeNoteId: noteId }),
      
      setActiveEvent: (eventId) => {
        const state = get();
        if (eventId === state.activeEventId) {
          set({ isExpanded: true });
        } else {
          set({ 
            activeEventId: eventId,
            activeNoteId: null,
            isExpanded: true
          });
        }
      },

      toggleExpanded: () => set((state) => ({ 
        isExpanded: !state.isExpanded,
        ...(state.isExpanded ? {
          activeEventId: null,
          activeNoteId: null
        } : {})
      }))
    }),
    {
      name: 'timeline-notes-storage',
      partialize: (state) => ({ notes: state.notes }),
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          return JSON.parse(str, dateReviver);
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => localStorage.removeItem(name)
      }
    }
  )
);