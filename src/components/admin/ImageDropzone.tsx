'use client';

import { useRef, useState } from 'react';
import styles from './admin.module.scss';

type ImageDropzoneProps = {
  id: string;
  name: string;
  currentImageUrl: string;
  label: string;
};

export default function ImageDropzone({
  id,
  name,
  currentImageUrl,
  label,
}: ImageDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState(currentImageUrl);
  const [fileName, setFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  function selectFile(file: File | undefined) {
    if (!file || !file.type.startsWith('image/')) return;

    setFileName(file.name);
    setPreviewUrl(URL.createObjectURL(file));
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    selectFile(event.target.files?.[0]);
  }

  function handleDrop(event: React.DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files[0];
    if (!file || !file.type.startsWith('image/')) return;

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    if (inputRef.current) inputRef.current.files = dataTransfer.files;
    selectFile(file);
  }

  return (
    <div className={styles.field}>
      <span id={`${id}-label`}>{label}</span>
      <input
        ref={inputRef}
        id={id}
        name={name}
        type="file"
        accept="image/*"
        className={styles.visuallyHidden}
        onChange={handleInputChange}
      />
      <label
        htmlFor={id}
        aria-labelledby={`${id}-label`}
        className={`${styles.imageDropzone} ${isDragging ? styles.imageDropzoneDragging : ''}`}
        onDragEnter={() => setIsDragging(true)}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        {previewUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={previewUrl} alt="" className={styles.imageDropzonePreview} />
        )}
        <span>
          Przeciągnij i upuść zdjęcie tutaj lub <strong>wybierz plik</strong>
          {fileName && <small>{fileName}</small>}
        </span>
      </label>
      <span className={styles.helpText}>
        Pozostaw bez zmian, aby zachować obecne zdjęcie.
      </span>
    </div>
  );
}
