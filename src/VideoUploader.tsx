import { useState } from 'react';
import { supabase } from './supabaseClient';
import './VideoUploader.css';

interface VideoUploaderProps {
  onUploadComplete: (url: string) => void;
}

export function VideoUploader({ onUploadComplete }: VideoUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      alert('Please select a video file');
      return;
    }

    setUploading(true);
    setProgress(0);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('videos')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('videos')
        .getPublicUrl(filePath);

      setProgress(100);
      onUploadComplete(data.publicUrl);

      setTimeout(() => {
        setUploading(false);
        setProgress(0);
      }, 1000);
    } catch (error) {
      console.error('Error uploading video:', error);
      alert('Error uploading video');
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="video-uploader">
      <label htmlFor="video-upload" className="upload-button">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        <span>{uploading ? 'Uploading...' : 'Upload Video'}</span>
      </label>
      <input
        id="video-upload"
        type="file"
        accept="video/*"
        onChange={handleFileUpload}
        disabled={uploading}
        style={{ display: 'none' }}
      />
      {uploading && (
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      )}
    </div>
  );
}
