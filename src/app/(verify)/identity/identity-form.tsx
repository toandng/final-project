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
    <div className="">
        <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: { optional?: React.ReactNode } = {};
            if (isStepOptional(index)) {
              
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )}
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
      <h1 className='text-center'>Set up your vehicle</h1>
      <p className='text-center'>Please upload information of you vehicle</p>
      <div className="w-[100%] flex">
        <div className="text-center w-[50%] p-10">
              <Card sx={{}}>
                <CardActions>
                  <Button className='upload-camera-1'><CameraAltIcon></CameraAltIcon></Button>
                </CardActions>
              </Card>
            
            <div className='text-cent '>
              <label >Font Side</label>
            </div>
          {/* <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, setFrontImage, setFrontPreview)}
          className='text-center mx-auto p-10 '/>
          {frontPreview && <img src={frontPreview} alt="Front Preview" />} */}
        </div>

        <div className="text-center w-[50%] p-10">
                <Card sx={{  }}>
                  <CardActions>
                    <Button className='upload-camera-1'><CameraAltIcon></CameraAltIcon></Button>
                  </CardActions>
                </Card>
            
          <div className='upload-side-1'>
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
      <div className='information'>
          <div className='full-name '>
              <label>
                  Full name
              </label><input type="text" placeholder="Full name" />
          </div>
          <div className='date-birh '>
              <label>
                  Date of birth
              </label><input type="text" placeholder=" Date of birth" />
          </div>
          <div className='gst-number '>
              <label>
                  GST number
              </label><input type="text" placeholder="GST number" />
          </div>
          <div className='Address '>
              <label>
                  Address
              </label><input type="text" placeholder="Address" />
          </div>
          <div className='city'>
              <label>
                  City
              </label><input type="text" placeholder="City" />
          </div>
          <div className='state'>
              <label>
                  State
              </label><input type="text" placeholder="State" />
          </div>
        </div>
      <footer>
      <div>
        <button onClick={handleUpload}>
                <div className='text-center mx-auto w-[380px] bg-gray-800 text-white'>
                  <Link href={'../'}><Button >Verify Id Card</Button></Link>
                </div>
        </button>
      </div>
      </footer>
    </div>
  );
};

export default IdentityForm;


