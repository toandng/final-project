'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Link from 'next/link';
import { Button } from '@mui/material';
// Stepper

const steps = ['','','',];
  
const VerifyDrivesForm = ()=> {
    return(
        <div>
            <p className='mx-auto text-center mt-[10%] opacity-70'>Step 2 in 3</p>
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
                <p className='text-center text-[14px] opacity-70 mt-4 p-4'>Please upload a photo of your ID card to confirm your identity</p>
            <form action="">
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
            </form>
            <footer>
                <div className="bg-gray-800 w-[350px] text-center mx-auto mb-4 " >  {/* Thêm margin-bottom */}
                    <Link href="/verify-drives" passHref>
                        <Button className="text-center mx-auto bg-gray-800 text-white">
                            Correct
                        </Button>
                    </Link>
                </div>
                <div className="bg-gray-800 w-[350px] text-center mx-auto">
                    <Link href="/identity" passHref>
                        <Button className="text-center mx-auto bg-gray-800 text-white">
                            Retake
                        </Button>
                    </Link>
                </div>
            </footer>
        </div>
    )
}
export default VerifyDrivesForm;