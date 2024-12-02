import React, { useState } from 'react';
import { X, Save, Upload, FileText, Download } from 'lucide-react';
import { format } from 'date-fns';
import { useTimelineNotes } from '../../hooks/useTimelineNotes';
import Portal from '../modals/Portal';
import PDFUploadForm from './PDFUploadForm';
import { NoteAttachment } from '../../types/timeline';

interface TimelineEventNotesProps {
  eventId: string;
}

export const TimelineEventNotes: React.FC<TimelineEventNotesProps> = ({ eventId }) => {
  const [showPDFUpload, setShowPDFUpload] = useState(false);
  const {
    content,
    setContent,
    isSaving,
    eventNotes,
    isExpanded,
    activeEventId,
    activeNoteId,
    handleSave,
    handleClear,
    deleteNote,
    setActiveNote,
    toggleExpanded,
    addAttachment,
    deleteAttachment
  } = useTimelineNotes(eventId);

  // Only show notes panel if this event is active
  if (!isExpanded || activeEventId !== eventId) return null;

  const handlePDFUpload = async (attachment: NoteAttachment) => {
    if (activeNoteId) {
      await addAttachment(activeNoteId, attachment);
    }
    setShowPDFUpload(false);
  };

  const handleDeleteAttachment = async (noteId: string, attachmentId: string) => {
    await deleteAttachment(noteId, attachmentId);
  };

  return (
    <Portal>
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          {/* Panel Container */}
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="pointer-events-auto w-screen max-w-md">
              <div className="flex h-full flex-col bg-white shadow-xl">
                {/* Header */}
                <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white">
                  <h3 className="text-lg font-medium text-gray-900">Event Notes</h3>
                  <button
                    onClick={toggleExpanded}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Close notes panel"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto">
                  <div className="p-4 space-y-4">
                    <div className="relative">
                      <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Add your note here..."
                        className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 
                                 resize-none bg-white transition-shadow duration-200 hover:shadow-sm"
                      />
                      <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                        {content.length} characters
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <button
                        onClick={() => setShowPDFUpload(true)}
                        className="px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors
                                 flex items-center space-x-2"
                        disabled={!activeNoteId}
                      >
                        <Upload className="w-4 h-4" />
                        <span>Attach PDF</span>
                      </button>

                      <div className="flex space-x-2">
                        <button
                          onClick={handleClear}
                          className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          Clear
                        </button>
                        <button
                          onClick={handleSave}
                          disabled={isSaving || !content.trim()}
                          className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 
                                   transition-all disabled:opacity-50 disabled:hover:bg-indigo-600 
                                   flex items-center space-x-2 shadow-sm"
                        >
                          <Save className="w-4 h-4" />
                          <span>{isSaving ? 'Saving...' : 'Save Note'}</span>
                        </button>
                      </div>
                    </div>

                    {eventNotes.length > 0 && (
                      <div className="mt-8">
                        <h4 className="text-sm font-medium text-gray-900 mb-4 flex items-center justify-between">
                          <span>Previous Notes</span>
                          <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full">
                            {eventNotes.length} {eventNotes.length === 1 ? 'note' : 'notes'}
                          </span>
                        </h4>
                        <div className="space-y-3">
                          {eventNotes.map((note) => (
                            <div
                              key={note.id}
                              className={`
                                p-4 rounded-lg transition-all cursor-pointer relative group
                                ${note.id === activeNoteId 
                                  ? 'bg-indigo-50 ring-2 ring-indigo-200'
                                  : 'bg-gray-50 hover:bg-gray-100'
                                }
                              `}
                              onClick={() => setActiveNote(note.id)}
                            >
                              <p className="text-sm text-gray-800 whitespace-pre-wrap">{note.content}</p>
                              
                              {/* Attachments */}
                              {note.attachments && note.attachments.length > 0 && (
                                <div className="mt-3 space-y-2">
                                  {note.attachments.map((attachment) => (
                                    <div
                                      key={attachment.id}
                                      className="flex items-center justify-between p-2 bg-white rounded-lg border border-gray-200"
                                    >
                                      <div className="flex items-center space-x-2">
                                        <FileText className="w-4 h-4 text-indigo-500" />
                                        <div>
                                          <p className="text-sm font-medium text-gray-900">{attachment.title}</p>
                                          {attachment.description && (
                                            <p className="text-xs text-gray-500">{attachment.description}</p>
                                          )}
                                        </div>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <a
                                          href={attachment.fileUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                          onClick={(e) => e.stopPropagation()}
                                        >
                                          <Download className="w-4 h-4 text-gray-500" />
                                        </a>
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteAttachment(note.id, attachment.id);
                                          }}
                                          className="p-1 hover:bg-red-100 rounded-full text-red-500 transition-colors"
                                        >
                                          <X className="w-4 h-4" />
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}

                              <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                                <span>{format(note.updatedAt, 'MMM d, yyyy h:mm a')}</span>
                                <span className="font-medium">{note.createdBy}</span>
                              </div>
                              
                              {/* Delete button */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteNote(note.id);
                                }}
                                className="absolute top-2 right-2 p-1 rounded-full opacity-0 group-hover:opacity-100
                                         hover:bg-red-100 text-red-500 transition-all duration-200"
                                aria-label="Delete note"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Upload Modal */}
      {showPDFUpload && (
        <Portal>
          <div className="fixed inset-0 z-[60] overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
              <div className="fixed inset-0 bg-black/50" onClick={() => setShowPDFUpload(false)} />
              <div className="relative z-[70] w-full max-w-md">
                <PDFUploadForm
                  onUpload={handlePDFUpload}
                  onCancel={() => setShowPDFUpload(false)}
                />
              </div>
            </div>
          </div>
        </Portal>
      )}
    </Portal>
  );
};