'use client'
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Link from 'next/link';
// Stepper
const steps = ['', '', ''];
const IdentityForm: React.FC = () => {
  // Stepper
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  // upload image
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<File | null>>,
    setPreview: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Hiển thị preview ảnh
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    if (frontImage) formData.append('image', frontImage);
    if (backImage) formData.append('image', backImage);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log('Upload thành công:', data);
      alert('Upload thành công!');
    } catch (error) {
      console.error('Lỗi upload:', error);
      alert('Lỗi upload!');
    }
  };
  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );
  return (
    <div className="mt-[10%]">
        <p className="mx-auto text-center p-5 text-[14px]">Step {activeStep + 2} in {steps.length}</p>
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={1} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={index}> {/* Sử dụng index làm key */}
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      <h1 className='text-center mt-[10%] font-bold text-[22px] '>Verify driver identity</h1>
      <p className='text-center text-[14px] opacity-70 mt-4'>Please upload a photo of your ID card & drive license to confirm your identity</p>
      <p className='mt-4 text-[13px] p-6 font-bold'>Upload driver's license</p>
      <div className="w-[100%] flex">
        
        <div className="text-center p-4">
              <Card sx={{width: '160px', height: '120px',padding: '40px',background:'#DCDCDC' }}>
                <CardActions sx={{ fontSize: 100 }}>
                  <Button ><CameraAltIcon></CameraAltIcon></Button>
                </CardActions>
              </Card>
            
            <div className='text-center mt-4 opacity-70 '>
              <label >Font Side</label>
            </div>
          {/* <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, setFrontImage, setFrontPreview)}
          className='text-center mx-auto p-10 '/>
          {frontPreview && <img src={frontPreview} alt="Front Preview" />} */}
        </div>

        <div className="text-center p-4">
                <Card sx={{ width: '160px', height: '120px',background:'#DCDCDC',padding:'40px'  }}>
                  <CardActions>
                    <Button><CameraAltIcon></CameraAltIcon></Button>
                  </CardActions>
                </Card>
            
          <div className='mt-4 opacity-70' >
            <label >Back Side</label>
          </div>
          {/* <input
            className='text-center mx-auto '
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, setBackImage, setBackPreview)}
          />
          {backPreview && <img src={backPreview} alt="Back Preview" />} */}
        </div>
      </div>
      {/* information */}
      <footer>
        <div className='bg-gray-800 w-[350px] text-center mx-auto mt-[50%] rounded-[10px]'>
          <Link href="/verify-drives" passHref>
            <Button className="text-center mx-auto  bg-gray-800 text-white">
              Verify ID Card
            </Button>
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default IdentityForm;


