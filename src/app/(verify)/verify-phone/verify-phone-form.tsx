'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useState, ChangeEvent } from 'react';

// Các bước trong Stepper với key duy nhất
const steps = [' ', ' ', ' '];

const VerifyPhoneForm: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState<number>(30);

  const handleInputChange = (value: string, index: number) => {
    if (value.length > 1) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      const nextInput = document.getElementById(`code-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleResend = () => {
    setResendTimer(30);
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    console.log("Đang gửi lại mã...");
  };

  const handleSubmit = () => {
    const enteredCode = code.join("");
    if (enteredCode === "123456") {
      alert("Xác minh thành công!");
    } else {
      alert("Mã xác nhận không hợp lệ. Vui lòng thử lại.");
    }
  };

  return (
    <div className="max-w-md h-screen mx-auto mt-10  text-black text-[20px] p-6 rounded-md shadow-md">
      <p className="mx-auto text-center p-5 text-[14px] font-bold">Step {activeStep + 1} of {steps.length}</p>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <div className="verify-header">
        <h2 className='text-center font-bold'>Verify phone number</h2>
        <p className='text-center text-[14px] opacity-70'>
          Enter the 6-digit code we send to <span className="font-semibold">+84*******</span>
        </p>
        <div className="flex justify-center gap-2 mt-6 text-gray-800">
          {code.map((digit, index) => (
            <input
              key={`code-input-${index}`}
              id={`code-input-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange(e.target.value, index)
              }
              className="w-12 h-12 text-center border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>
        <div className="text-center my-4 mt-[10%]">
          {resendTimer > 0 ? (
            <p className="text-sm text-gray-500">
              Gửi lại mã sau <span className="font-semibold">{resendTimer}</span> giây
            </p>
          ) : (
            <button onClick={handleResend} className="text-blue-500 underline">
              Gửi lại mã
            </button>
          )}
        </div>
        <Link href={'./identity'}>
          <div className='bg-gray-800 mt-[20%] rounded-[10px]'>
          <Button
            className="w-full bg-gray-800 text-black py-2 rounded-md"
            onClick={handleSubmit}
          >
            Verify Code
          </Button>
          </div>
        </Link>
      </div>
      <footer className="mt-[100%] text-center">
        <a
          href="#"
          className="text-[14px] text-black mt-4 text-center"
        >
          Need help? Contact Support
        </a>
  </footer>
    </div>
  );
};

export default VerifyPhoneForm;
