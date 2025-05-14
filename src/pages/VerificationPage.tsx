import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, AlertCircle, Upload } from 'lucide-react';
import FileUpload from '../components/FileUpload';
import VerificationSteps from '../components/VerificationSteps';
import { FileWithPreview } from '../types/file';

const VerificationPage = () => {
  const navigate = useNavigate();
  const [frontIdCard, setFrontIdCard] = useState<FileWithPreview | null>(null);
  const [backIdCard, setBackIdCard] = useState<FileWithPreview | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFiles = () => {
    if (!frontIdCard || !backIdCard) {
      setError('Vui lòng tải lên cả mặt trước và mặt sau của CCCD');
      return false;
    }

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(frontIdCard.type) || !validTypes.includes(backIdCard.type)) {
      setError('Chỉ chấp nhận định dạng ảnh JPG/PNG');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateFiles()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/status');
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Xác thực tài khoản</h1>
        <p className="text-slate-600">
          Để đảm bảo an toàn cho việc thuê xe, chúng tôi cần xác minh danh tính của bạn.
          Vui lòng tải lên ảnh CCCD (mặt trước và mặt sau).
        </p>
      </div>

      <VerificationSteps currentStep={1} />

      <div className="bg-white rounded-lg shadow-md p-6 mt-8">
        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <FileUpload
              label="Mặt trước CCCD"
              file={frontIdCard}
              onFileChange={setFrontIdCard}
              accept="image/jpeg, image/jpg, image/png"
            />
            <FileUpload
              label="Mặt sau CCCD"
              file={backIdCard}
              onFileChange={setBackIdCard}
              accept="image/jpeg, image/jpg, image/png"
            />
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md flex items-start">
              <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <div className="mt-8 flex flex-col items-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                flex items-center justify-center w-full md:w-auto px-6 py-3 rounded-md
                text-white font-medium transition-all duration-200
                ${isSubmitting 
                  ? 'bg-slate-400 cursor-not-allowed' 
                  : 'bg-slate-800 hover:bg-slate-700'}
              `}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Đang gửi...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5 mr-2" />
                  Gửi để xác thực
                </>
              )}
            </button>

            <p className="text-sm text-slate-500 mt-4 flex items-center">
              <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
              Thông tin của bạn được bảo mật an toàn
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerificationPage;