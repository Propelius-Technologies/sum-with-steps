"use client";
import {AdditionForm} from "components/addition-form";
import {useState} from "react";
import {saveResultsToDb, sumWithSteps, SumWithStepsResponse} from "lib/api";
import {Steps} from "components/steps";
import {Button} from "components/ui/button";


export default function Page() {
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [result, setResult] = useState<SumWithStepsResponse | null>(null)

  const handleSubmit = async (firstNumber: number, secondNumber: number) => {
    setLoading(true)

    const response = await sumWithSteps(firstNumber, secondNumber)
    setResult(response)
    setLoading(false)
  }

  const handleSave = async () => {
    if(!result) return

    setSaving(true)
    await saveResultsToDb(result.num1, result.num2)
    setSaving(false)
  }

  return (
    <div className='flex-1 mx-auto max-w-2xl'>
      <div className='bg-gray-300 p-6 px-8'>
        <h1 className='text-3xl font-bold'>Step Addition</h1>
      </div>
      <div className='p-4'>
        <AdditionForm
          onSubmit={handleSubmit}
          loading={loading}
        />

        {
          result && (
            <Steps  steps={result.steps}/>
          )
        }

        {
          result && (
            <div className='flex justify-end'>
              <Button loading={saving} disabled={saving} onClick={handleSave}>Save result to DB</Button>
            </div>
          )
        }
      </div>
    </div>
  );
}
