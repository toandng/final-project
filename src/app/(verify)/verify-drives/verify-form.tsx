import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
// Stepper

const steps = [
    '',
    '',
    '',
  ];
  
const VerifyDrivesForm = ()=> {
    return(
       
        <div>
            <p className='mx-auto text-center'>Step 2 in 3</p>
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={1} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
                </Stepper>
            </Box>
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
        </div>
    )
}
export default VerifyDrivesForm;