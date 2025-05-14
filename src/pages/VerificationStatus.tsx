import React from 'react';
import { CheckCircle } from 'lucide-react';

const VerificationStatus = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-3 text-green-600">
          <CheckCircle className="w-6 h-6" />
          <h2 className="text-xl font-semibold">Đã nhận thông tin</h2>
        </div>
        <p className="mt-4 text-slate-600">
          Chúng tôi đã nhận được thông tin xác thực của bạn. 
          Vui lòng chờ trong khi chúng tôi xử lý yêu cầu.
        </p>
        <div className="mt-6">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-600 h-2 rounded-full w-1/2 animate-pulse"></div>
          </div>
          <p className="text-sm text-slate-500 mt-2">Đang xử lý...</p>
        </div>
      </div>
    </div>
  );
};

export default VerificationStatus;