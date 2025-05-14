import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const LOCK_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds
const MAX_ATTEMPTS = 5;

const LoginPage = () => {
  const navigate = useNavigate();
  const { signIn, loginAttempts, setLoginAttempts, lastLoginAttempt, setLastLoginAttempt } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (lastLoginAttempt && loginAttempts >= MAX_ATTEMPTS) {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const lockEndTime = new Date(lastLoginAttempt).getTime() + LOCK_DURATION;
        const remaining = Math.max(0, lockEndTime - now);
        
        setTimeLeft(Math.ceil(remaining / 1000));
        
        if (remaining <= 0) {
          setLoginAttempts(0);
          setLastLoginAttempt(null);
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [lastLoginAttempt, loginAttempts]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loginAttempts >= MAX_ATTEMPTS && timeLeft > 0) {
      toast.error(`Vui lòng thử lại sau ${Math.ceil(timeLeft / 60)} phút`);
      return;
    }

    setIsSubmitting(true);

    try {
      const { user } = await signIn(formData.email, formData.password);
      
      if (user.user_metadata.verification_status === 'pending') {
        navigate('/verify');
      } else {
        navigate('/');
      }
      
      setLoginAttempts(0);
      setLastLoginAttempt(null);
    } catch (error: any) {
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      
      if (newAttempts >= MAX_ATTEMPTS) {
        setLastLoginAttempt(new Date());
        toast.error('Tài khoản đã bị khóa. Vui lòng thử lại sau 10 phút');
      } else {
        toast.error(error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Đăng nhập</h1>
        
        {timeLeft > 0 && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md flex items-start">
            <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
            <p>
              Tài khoản tạm thời bị khóa. Vui lòng thử lại sau{' '}
              {Math.ceil(timeLeft / 60)} phút
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email hoặc số điện thoại
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="example@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Mật khẩu
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || timeLeft > 0}
            className={`
              w-full flex items-center justify-center px-4 py-2 rounded-md text-white font-medium
              ${(isSubmitting || timeLeft > 0) ? 'bg-slate-400' : 'bg-slate-800 hover:bg-slate-700'}
              transition-colors duration-200
            `}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Đang xử lý...
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5 mr-2" />
                Đăng nhập
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;