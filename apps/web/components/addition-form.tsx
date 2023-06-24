import {useState} from "react";
import {Button} from "components/ui/button";
import {Input} from "components/ui/input";

interface AdditionFormProps {
  onSubmit: (firstNumber: number, secondNumber: number) => void
  loading?: boolean
}

export function AdditionForm({onSubmit, loading}: AdditionFormProps) {
  const [firstNumber, setFirstNumber] = useState(0)
  const [secondNumber, setSecondNumber] = useState(0)

  return (
    <div>
      <div className='flex items-center'>
        <div className='w-full'>First Number:</div>
        <Input min={1} type="number" id="firstNumber" value={firstNumber}
               onChange={e => setFirstNumber(e.target.valueAsNumber)}/>
      </div>
      <div className='flex items-center mt-4'>
        <div className='w-full'> Second Number:</div>
        <Input min={1} type="number" id="secondNumber"
               value={secondNumber}
               onChange={e => setSecondNumber(e.target.valueAsNumber)}
        />
      </div>

      <div className='flex justify-end mt-6'>
        <Button loading={loading} disabled={!firstNumber || !secondNumber || loading}
                onClick={() => onSubmit(firstNumber, secondNumber)}>
          Generate Steps
        </Button>
      </div>
    </div>
  )
}
