import {SumWithStepsResponse} from "lib/api";

interface StepsProps {
  steps: SumWithStepsResponse['steps']
}

export function Steps({steps}: StepsProps) {
  return (
    <div>
      <pre>
        {JSON.stringify(steps, null, 2)}
      </pre>
    </div>
  )
}
