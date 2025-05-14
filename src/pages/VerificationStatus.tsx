import React, { useState } from 'react';
import { Clock, AlertCircle, CheckCircle } from 'lucide-react';
import VerificationSteps from '../components/VerificationSteps';

type VerificationStatusType = 'pending' | 'verified' | 'rejected';

const VerificationStatus = () => {
  // In a real app, this would come from API/context
  const [status, setStatus] = useState<VerificationStatusType>('pending');

  // For demo purposes only - toggle between statuses
  const toggleStatus = () => {
    if (status === 'pending') setStatus('verified');
    else if (status === 'verified') setStatus('rejected');
    else setStatus('pending');
  };

  const statusContent = {
    pending: {
      title: 'Đang chờ xác thực',
      description: 'Chúng tôi đang xem xét thông tin của bạn. Quá trình này có thể mất đến 24 giờ.',
      icon: Clock,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      step: 2
    },
    verified: {
      title: 'Xác thực thành công',
      description: 'Chúc mừng! Tài khoản của bạn đã được xác thực và đang ở trạng thái hoạt động bình thường.',
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      step: 3
    },
    rejected: {
      title: 'Xác thực không thành công',
      description: 'Thông tin bạn cung cấp không đáp ứng yêu cầu. Vui lòng cập nhật lại hình ảnh CCCD rõ ràng hơn.',
      icon: AlertCircle,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      step: 2
    }
  };

  const currentStatus = statusContent[status];
  const StatusIcon = currentStatus.icon;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Trạng thái xác thực</h1>
        <p className="text-slate-600">
          Theo dõi trạng thái xác thực tài khoản của bạn.
        </p>
      </div>

      <VerificationSteps currentStep={currentStatus.step} />

      <div className="bg-white rounded-lg shadow-md p-6 mt-8">
        <div 
          className={`
            p-6 rounded-lg border flex items-start gap-4
            ${currentStatus.bgColor} ${currentStatus.borderColor}
            animate-fadeIn transition-all duration-300
          `}
        >
          <StatusIcon className={`w-6 h-6 mt-0.5 ${currentStatus.color}`} />
          <div>
            <h2 className={`text-xl font-bold mb-2 ${currentStatus.color}`}>
              {currentStatus.title}
            </h2>
            <p className="text-slate-700">
              {currentStatus.description}
            </p>
            
            {status === 'pending' && (
              <div className="mt-4 flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-orange-500 h-2.5 rounded-full w-2/3 animate-pulse"></div>
                </div>
                <span className="ml-4 text-sm text-slate-500">Đang xử lý</span>
              </div>
            )}
            
            {status === 'rejected' && (
              <button 
                className="mt-4 px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700 transition-colors"
                onClick={() => window.location.href = '/'}
              >
                Tải lại CCCD
              </button>
            )}
          </div>
        </div>
        
        {/* This button is only for demonstration purpose */}
        <div className="mt-8 border-t pt-4">
          <p className="text-xs text-slate-500 mb-2">Dành cho demo - chuyển đổi giữa các trạng thái:</p>
          <button 
            onClick={toggleStatus}
            className="text-sm px-3 py-1 bg-slate-200 hover:bg-slate-300 rounded transition-colors"
          >
            Đổi trạng thái
          </button>
        </div>
      </div>
    </div>
  );
};