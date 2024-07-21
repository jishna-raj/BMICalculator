import React, { useState } from 'react';
import ReactSpeedometer from 'react-d3-speedometer';
import './App.css'

const BMICalculator = () => {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(0);
  const [bmiDescription, setBmiDescription] = useState('N/A');
  const [bmiColor, setBmiColor] = useState('white'); // Default color
  const [image,setImage] = useState('./images/bmi.png');
  const[border,setBorder] = useState('')

  const calculateBMI = () => {
    // Validate inputs
    if (!calculate(age, 'age') || !calculate(height, 'height') || !calculate(weight, 'weight')) {
      return;
    }

    // Calculate BMI
    const heightMeters = parseFloat(height) / 100;
    const bmiValue = parseFloat(weight) / (heightMeters * heightMeters);
    setBmi(bmiValue.toFixed(1));

    // Determine BMI description and color
    let bmiDescription = '';
    let bmiColor = '';
    let image = ''
    let border = ""

    if (bmiValue < 18.5) {
      bmiDescription = 'Underweight: Being underweight indicates that your BMI is below the normal weight range for your height.';
      bmiColor = 'var(--underweight)';
      image= "./images/bmi.gif";
      border = 'var(--underweight)'
    } else if (bmiValue >= 18.5 && bmiValue <= 25) {
      bmiDescription = 'Normal: Falling within the normal BMI range indicates that your body weight is considered healthy.';
      bmiColor = 'var(--normal)';
      image= "./images/bmi.gif";
      border = 'var(--normal)';

    } else if (bmiValue > 25 && bmiValue <= 30) {
      bmiDescription = 'Overweight: Being classified as overweight means that your body weight is higher than what is generally considered healthy.';
      bmiColor = 'var(--overweight)';
      image= "./images/bmi.gif";
      border = 'var(--overweight)';

    } else {
      bmiDescription = 'Obese: Being classified as obese indicates a significant excess of body weight relative to height.';
      bmiColor = 'var(--obese)';
      image= "./images/bmi.gif";
      border = 'var(--obese)';
    }

    // Update state with calculated values
    setBmiDescription(bmiDescription);
    setBmiColor(bmiColor);
    setImage(image);
    setBorder(border);
  };

  const handleReset = () => {
    // Reset all state values
    setAge('');
    setHeight('');
    setWeight('');
    setBmi(0);
    setBmiDescription('N/A');
    setBmiColor('white'); // Reset color to default
    setImage('./images/bmi.png')
    setBorder('')
  };

  const calculate = (value, name) => {
    if (value === '' || isNaN(value)) {
      alert(`Please enter a valid ${name}.`);
      return false;
    }
    return true;
  };

  return (
    <div className='container-fluid'>
      <div className='row mt-5'>
        <div className='col-lg-2'></div>

        <div className='col-lg-8'>
          <div className='row bg-dark p-4 rounded'>
            <div className='col-md-6 d-flex flex-column justify-content-center align-items-center'>
              <img
                src='https://www.hdfcergo.com/images/default-source/health-insurance/online-bmi-calculator-a-necessary-tool-for-health.svg'
                alt='BMI Image'
                className='img-fluid mb-4'
                style={{ maxWidth: '100%', height: 'auto' }}
              />
              <div className='output text-center'>
                <h3 className='text-light'>Your BMI is</h3>
                <p id='BMI' style={{ color: bmiColor,fontSize:'50px' }}>
                  {bmi}
                </p>
                <img src={image} alt='' height={'100'} width={'150px'}/>
                <p id='des' style={{ color: bmiColor }} >
                  {bmiDescription}
                </p>
              </div>
            </div>

            <div className='col-md-6 d-flex flex-column justify-content-center align-items-center'>
              <form className='container'>
                <h1 className='text-center'>BMI Calculator</h1>
                <p className='text-primary'>Calculate your Body Mass Index (BMI) here....</p>

                <div className='d-flex justify-content-center'>
                  <ReactSpeedometer
                    width={300}
                    needleHeightRatio={0.6}
                    value={bmi}
                    segments={4}
                    customSegmentStops={[0, 18.5, 25, 30, 58]}
                    minValue={0}
                    maxValue={58}
                    currentValueText='BMI'
                    customSegmentLabels={[
                      { text: 'Underweight', position: 'INSIDE', color: '#555', fontSize: '10px' },
                      { text: 'Normal', position: 'INSIDE', color: '#555', fontSize: '10px' },
                      { text: 'Over', position: 'INSIDE', color: '#555', fontSize: '10px' },
                      { text: 'Obese', position: 'INSIDE', color: '#555', fontSize: '14px' },
                    ]}
                    ringWidth={30}
                    needleTransitionDuration={2000}
                    needleTransition='easeElastic'
                    needleColor={'#90f2ff'}
                    textColor={'#333'}
                  />
                </div>

                <div className='mb-3'>
                  <label className='text-dark'>Age:</label>
                  <input
                    type='number' // Changed input type to number for age
                    onChange={(e) => setAge(e.target.value)}
                    placeholder='Age'
                    className='form-control' style={{borderColor:border,borderWidth:"2px"}}
                    name='age'
                    value={age}
                  />
                </div>

                <div className='mb-3'>
                  <label className='text-dark'>Height:</label>
                  <input
                    type='number' // Changed input type to number for height
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder='Height'
                    className='form-control' style={{borderColor:border,borderWidth:"2px"}}
                    name='height'
                    value={height}
                  />
                </div>

                <div className='mb-3'>
                  <label className='text-dark'>Weight:</label>
                  <input
                    type='number' // Changed input type to number for weight
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder='Weight'
                    className='form-control' style={{borderColor:border,borderWidth:"2px"}}
                    name='weight'
                    value={weight}
                  />
                </div>

                <div className='d-flex justify-content-between'>
                  <button type='button' className='btn' id='button' onClick={calculateBMI}>
                    Calculate
                  </button>
                  <button type='button' className='btn' id='button1' onClick={handleReset}>
                    Reset
                  </button>
                </div>
              </form>
            </div>

            <div className='col-md-12 mt-4'>
              <div className='scale d-flex justify-content-around'>
                <div
                  style={{ color: 'var(--underweight)', textAlign: 'center', fontStyle: 'italic',fontWeight:'bolder' }}
                  className='text-center'>
                  <h4>Underweight</h4>
                  <p>&lt; 18.5</p>
                </div>

                <div
                  style={{ color: 'var(--normal)', textAlign: 'center', fontStyle: 'italic', fontWeight:'bolder' }}
                  className='text-center'>
                  <h4>Normal</h4>
                  <p>18.5 - 25</p>
                </div>

                <div
                  style={{ color: 'var(--overweight)', textAlign: 'center', fontStyle: 'italic',fontWeight:'bolder' }}
                  className='text-center'>
                  <h4>Overweight</h4>
                  <p>25 - 30</p>
                </div>

                <div
                  style={{ color: 'var(--obese)', textAlign: 'center', fontStyle: 'italic', fontWeight:'bolder' }}
                  className='text-center'>
                  <h4>Obese</h4>
                  <p>&gt; 30</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='col-lg-2'></div>
      </div>
    </div>
  );
};

export default BMICalculator;
