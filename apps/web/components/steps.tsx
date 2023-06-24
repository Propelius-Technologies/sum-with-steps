import {SumWithStepsResponse} from "lib/api";

interface StepsProps {
  steps: SumWithStepsResponse['steps']
}

export function Steps({steps}: StepsProps) {
  return (
    <div className='bg-gray-200 p-2 my-4'>
      <pre>
        {JSON.stringify(steps, null, 2)}
      </pre>
    </div>
  )
}
