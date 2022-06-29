import React, { useState, useRef } from 'react'
import './content.css'
import { Dollar, Person } from '../../assets/index'
const Content = () => {

  const buttons = ['5', '10', '15', '25', '50']
  const [gross, setGross] = useState("")
  const [people, setPeople] = useState("")
  const [tip, setTip] = useState()
  const [active, setActive] = useState()
  const [invalid, setInvalid] = useState(false);
  const [disabled, setDisable] = useState(true);
  const [errorPeople, setErrorPeople] = useState('')
  const [errorGross, setErrorGross]=useState('')

  function handleBtn(e) {
    setTip(e);
  }
  const inputElement = useRef()
  const btnElement = useRef()
  const inputGross = useRef()
  const inputPeople = useRef()

  const handleOnClick = (index) => {
    setActive(index);
    setInvalid(false);
  }

  const handleGross = (e) => {
    disabledBtn()
    if (e === '0') {
      setErrorGross('Cannot be zero')
    }
    else {
      setGross(e)
      setErrorGross('')
    }
  }
  const handlePeople = (e) => {
    disabledBtn()
    if (e === '0') {
      setErrorPeople('Cannot be zero')
    }
    else{
      setPeople(e)
       setErrorPeople('')
    }

  }

  const handleTip = (e) => {
    disabledBtn()
    setActive('');
    let num = Number(e);
    if (Number.isNaN(num)) {
      setInvalid(true)
      setTip('')
    }
    else {
      setInvalid(false)
      setTip(e);
    }

  }
  const disabledBtn = () => {
   
      setDisable(false)
    
   
  }
  const handleReset = () => {
    setActive('');
    setTip('')
    setGross('')
    setPeople('')
    setDisable(true)
    setInvalid(false)
    setErrorPeople('')
    setErrorGross('')
    inputElement.current.value = ''
    inputGross.current.value = ''
    inputPeople.current.value = ''
    
  }
  const calculateTip2 = (gross, tip, people) => {
    if (!gross || !tip || !people) {
      return (0)
    }
    let num = (gross * (tip / 100)) / people

    if (Number.isFinite(num)) {
      return num
    }
    else {
      return 0
    }
  }
  const calculateTotal = (e) => {
    if (e === 0) {
      return 0
    }
    let num = e + (gross / people)
    if (Number.isNaN(num)) {
      return 0
    }
    else {
      return num
    }
  }


  return (
    <section>
      <div className='container container-content'>
        <div className='wrapper-content'>
          <div>
            <small className="label">Bill</small>
            
            <div className='wrapper-error'>{errorGross && (
              <small className="error"> {errorGross} </small>
            )}</div>
            <div className='wrapper-input'>
              <img className='icon' src={Dollar} alt='dollar sign' />
              <input ref={inputGross} type='number' placeholder='0' className={errorGross? 'input-num invalid' : 'input-num'  
            } onChange={e => {
                handleGross(e.target.value)
              }} />
              {console.log(gross)}
            </div>
          </div>
          <div>
            <small>Select Tip %</small>
            <div className='btn-collection'>
              {buttons.map((btns, index) => {
                return (
                  <button type='button' key={index} value={btns} className={active === index ? 'btn active' : 'btn'} onClick={e => {
                    handleBtn(e.target.value);
                    handleOnClick(index);
                    disabledBtn();
                    inputElement.current.value = '';
                    console.log(active)
                  }
                  }>{btns}%</button>
                )
              })}
              {console.log(tip)}
              <input type='text' placeholder='Custom' size='3' maxLength='3' ref={inputElement} onChange={e => handleTip(e.target.value)} className={invalid ? 'invalid' : ''} />
            </div>
          </div>
          <div>
            <small className="label">Number of People</small>
            <div className='wrapper-error'>{errorPeople && (
              <small className="error"> {errorPeople} </small>
            )}</div>
            
            <div className='wrapper-input'>
              <img className='icon' src={Person} alt='dollar sign' />
              <input ref={inputPeople} type='number' placeholder='0' className={errorPeople? 'input-num invalid' : 'input-num'  
            } onChange={e =>
                handlePeople(e.target.value)
              } />
              {console.log(people)}
            </div>
          </div>

        </div>
        <div className="container-result">
          <div className='wrapper-result'>

            <div className='wrapper-fit'>
              <small>Tip Amount</small>
              <p>/ person</p>
            </div>
            <div>
              <label>${calculateTip2(gross, tip, people).toFixed(2)}</label>
            </div>
          </div>
          <div className='wrapper-result'>
            <div className='wrapper-fit'>
              <small>Total</small>
              <p>/ person</p>
            </div>
            <div>
              <label>${calculateTotal(calculateTip2(gross, tip, people)).toFixed(2)}</label>
            </div>
          </div>

          <div>
            <button type='button' className='btn-reset' ref={btnElement} onClick={() => handleReset()} disabled={disabled}>RESET</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Content