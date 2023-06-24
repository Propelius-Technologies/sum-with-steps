import {useState} from "react";

interface AdditionFormProps {
  onSubmit: (firstNumber: number, secondNumber: number) => void
  loading?: boolean
}

export function AdditionForm({onSubmit, loading}: AdditionFormProps) {
  const [firstNumber, setFirstNumber] = useState(0)
  const [secondNumber, setSecondNumber] = useState(0)

  return (
    <div>
      <div>
        First Number: <input min={1} type="number" id="firstNumber" value={firstNumber}
                             onChange={e => setFirstNumber(e.target.valueAsNumber)}/>
      </div>
      <div>
        Second Number: <input min={1} type="number" id="secondNumber"
                              value={secondNumber}
                              onChange={e => setSecondNumber(e.target.valueAsNumber)}
      />
      </div>
      <div>
        <button disabled={!firstNumber || !secondNumber || loading} onClick={() => onSubmit(firstNumber, secondNumber)}>
          {loading && "Loading..."}
          {!loading && "Generate Steps"}
        </button>
      </div>
    </div>
  )
}
