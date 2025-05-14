import React, { useCallback, useState } from 'react';
import { FileUp, X, Check, Image } from 'lucide-react';
import { FileWithPreview } from '../types/file';

interface FileUploadProps {
  label: string;
  accept: string;
  file: FileWithPreview | null;
  onFileChange: (file: FileWithPreview | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ 
  label, 
  accept, 
  file, 
  onFileChange 
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const processFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const fileWithPreview: FileWithPreview = Object.assign(file, {
        preview: reader.result as string
      });
      onFileChange(fileWithPreview);
    };
    reader.readAsDataURL(file);
  }, [onFileChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.match(/image\/(jpeg|jpg|png)/)) {
        processFile(file);
      }
    }
  }, [processFile]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  }, [processFile]);

  const handleRemove = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onFileChange(null);
  }, [onFileChange]);

  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-slate-700 mb-2">{label}</label>
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-4 h-60 flex flex-col items-center justify-center
          transition-all duration-200 cursor-pointer
          ${isDragging ? 'border-orange-500 bg-orange-50' : file ? 'border-green-500 bg-green-50' : 'border-slate-300 hover:border-slate-400'}
        `}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => {
          if (!file) {
            document.getElementById(`file-upload-${label}`)?.click();
          }
        }}
      >
        <input
          id={`file-upload-${label}`}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />

        {file ? (
          <div className="relative w-full h-full flex flex-col items-center">
            <button
              className="absolute top-0 right-0 bg-white p-1 rounded-full shadow-md hover:bg-red-100 transition-colors z-10"
              onClick={handleRemove}
            >
              <X className="w-4 h-4 text-red-500" />
            </button>
            <div className="h-full w-full flex items-center justify-center overflow-hidden rounded-md">
              <img 
                src={file.preview} 
                alt="ID card preview" 
                className="object-contain max-h-full max-w-full"
              />
            </div>
            <div className="flex items-center mt-2 text-sm text-green-600">
              <Check className="w-4 h-4 mr-1" />
              <span>{file.name}</span>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-4 bg-slate-100 p-4 rounded-full">
              {isDragging ? (
                <FileUp className="w-8 h-8 text-orange-500" />
              ) : (
                <Image className="w-8 h-8 text-slate-500" />
              )}
            </div>
            <p className="text-sm text-center text-slate-600 mb-1">
              {isDragging ? (
                'Thả để tải lên'
              ) : (
                <>Kéo và thả hoặc <span className="text-orange-500 font-medium">chọn file</span></>
              )}
            </p>
            <p className="text-xs text-center text-slate-500">Chỉ chấp nhận định dạng JPG, PNG</p>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;