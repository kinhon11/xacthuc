import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { FileWithPreview } from '../types/file';

const VerificationPage = () => {
  const navigate = useNavigate();
  const [frontIdCard, setFrontIdCard] = useState<FileWithPreview | null>(null);
  const [backIdCard, setBackIdCard] = useState<FileWithPreview | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, side: 'front' | 'back') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileWithPreview = Object.assign(file, {
          preview: reader.result as string
        });
        side === 'front' ? setFrontIdCard(fileWithPreview) : setBackIdCard(fileWithPreview);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!frontIdCard || !backIdCard) {
      setError('Vui lòng tải lên cả mặt trước và mặt sau của CCCD');
      return;
    }
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/status');
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold text-slate-800 mb-4">Xác thực tài khoản</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Mặt trước CCCD</label>
              <input
                type="file"
                accept="image/jpeg,image/png"
                onChange={(e) => handleFileChange(e, 'front')}
                className="w-full border rounded p-2"
              />
              {frontIdCard && (
                <img src={frontIdCard.preview} alt="Front" className="mt-2 h-40 object-contain" />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Mặt sau CCCD</label>
              <input
                type="file"
                accept="image/jpeg,image/png"
                onChange={(e) => handleFileChange(e, 'back')}
                className="w-full border rounded p-2"
              />
              {backIdCard && (
                <img src={backIdCard.preview} alt="Back" className="mt-2 h-40 object-contain" />
              )}
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 rounded flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              <p>{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`mt-6 w-full py-2 px-4 rounded font-medium text-white
              ${isSubmitting ? 'bg-slate-400' : 'bg-slate-800 hover:bg-slate-700'}`}
          >
            {isSubmitting ? 'Đang xử lý...' : 'Gửi xác thực'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerificationPage;