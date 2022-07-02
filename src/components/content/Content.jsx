import React, { useState, useRef, useReducer } from 'react'
import './content.css'
import { Dollar, Person } from '../../assets/index'

const reducer = (state, action) => {
  console.log(action.payload)
  switch (action.type) {
    case "HANDLE_TIP_BTN":
      return { tip: action.payload.value, active: action.payload.index, invalid: false }
    case "HANDLE_INVALID_TRUE":
      return { tip: '', active: '', invalid: true }
    case "HANDLE_INVALID_FALSE":
      return { tip: action.payload.value, active: '', invalid: false }
    case "RESET":
      return { tip: 0, active: "", invalid: false}
    default:
      return state
  }

}
const Content = () => {
  const [state, dispatch] = useReducer(reducer, { tip: 0, active: "", invalid: false })
  const buttons = ['5', '10', '15', '25', '50']
  const [gross, setGross] = useState("")
  const [people, setPeople] = useState("")
  const [disabled, setDisable] = useState(true);
  const [errorPeople, setErrorPeople] = useState('')
  const [errorGross, setErrorGross] = useState('')


  const inputElement = useRef()
  const btnElement = useRef()
  const inputGross = useRef()
  const inputPeople = useRef()

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
    else {
      setPeople(e)
      setErrorPeople('')
    }

  }

  const handleTip = (e) => {
    disabledBtn()
    let num = Number(e);
    if (Number.isNaN(num)) {
      dispatch({ type: "HANDLE_INVALID_TRUE" })
    }
    else {
      dispatch({ type: "HANDLE_INVALID_FALSE", payload:{
        value:e
      } })

    }

  }
  const disabledBtn = () => {

    setDisable(false)


  }
  const handleReset = () => {
    setGross('')
    setPeople('')
    setDisable(true)
    dispatch({type:"RESET"})
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
              <input ref={inputGross} type='number' placeholder='0' className={errorGross ? 'input-num invalid' : 'input-num'
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
                  <button type='button' key={index} value={btns} className={state.active === index ? 'btn active' : 'btn'} onClick={e => {
                    dispatch({
                      type: "HANDLE_TIP_BTN",
                      payload: {
                        index: index,
                        value: e.target.value
                      }
                    }
                    );
                    disabledBtn();
                    inputElement.current.value = '';
                  }
                  }>{btns}%</button>
                )
              })}
              <input type='text' placeholder='Custom' size='3' maxLength='3' ref={inputElement} onChange={e => handleTip(e.target.value)} className={state.invalid ? 'invalid' : ''} />
            </div>
          </div>
          <div>
            <small className="label">Number of People</small>
            <div className='wrapper-error'>{errorPeople && (
              <small className="error"> {errorPeople} </small>
            )}</div>

            <div className='wrapper-input'>
              <img className='icon' src={Person} alt='dollar sign' />
              <input ref={inputPeople} type='number' placeholder='0' className={errorPeople ? 'input-num invalid' : 'input-num'
              } onChange={e =>
                {
                handlePeople(e.target.value)
              }} />
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
              <label>${calculateTip2(gross, state.tip, people).toFixed(2)}</label>
            </div>
          </div>
          <div className='wrapper-result'>
            <div className='wrapper-fit'>
              <small>Total</small>
              <p>/ person</p>
            </div>
            <div>
              <label>${calculateTotal(calculateTip2(gross, state.tip, people)).toFixed(2)}</label>
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