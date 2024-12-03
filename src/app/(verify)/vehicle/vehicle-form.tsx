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
const VehicleForm: React.FC = () => {
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
    <div className="verify-identity">
      <p>Step 3 in 3</p>
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={2} alternativeLabel>
              {steps.map((label, index) => (
              <Step key={index}> {/* Sử dụng index làm key */}
                  <StepLabel>{label}</StepLabel>
              </Step>
              ))}
          </Stepper>
        </Box>
      <h1 className='text-center mt-4 font-bold text-[22px]'>Verify Driver Identity</h1>
      <p className='text-center text-[14px] opacity-70'>Please upload a photo of your ID card & driver license to confirm your identity.</p>

      <div className="mt-4">
        <div className='list-input-vehicle mt-4'>
            <div className='vehicle'>
                <label>
                    Vehicle Plate Number
                </label><input type="text" placeholder="Vehicle Plate Number" />
            </div>
            <div className='color'>
                <label>
                    Color
                </label><input type="text" placeholder="Color" />
            </div>
        </div>
        <div className='p-5'>
              <Card sx={{ width:'350px', textAlign:'center', padding: '40px',background:'#DCDCDC' }}>
                <CardActions>
                  <Button className='upload-camera'><CameraAltIcon ></CameraAltIcon></Button>
                </CardActions>
              </Card>
            
            <div className='upload-side'>
              <label >Vehicle's image</label>
            </div>
          {/* <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, setFrontImage, setFrontPreview)}
          />
          {frontPreview && <img src={frontPreview} alt="Front Preview" />} */}
        </div>

        <div className="p-5">
                <Card sx={{ width:'350px', textAlign:'center',padding: '40px',background:'#DCDCDC'}}>
                  <CardActions>
                    <Button className='upload-camera'><CameraAltIcon></CameraAltIcon></Button>
                  </CardActions>
                </Card>
            
          <div className='upload-side'>
            <label >Vehicle's RC images</label>
          </div>
          {/* <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, setBackImage, setBackPreview)}
          />
          {backPreview && <img src={backPreview} alt="Back Preview" />} */}
        </div>
      </div>

      <footer>
      <div className='w-[340px] bg-gray-800 text-center mx-auto'>
        <Link href={'../'}><Button onClick={handleUpload}>Save & Continue</Button></Link>
      </div>
      </footer>
    </div>
  );
};

export default VehicleForm;


