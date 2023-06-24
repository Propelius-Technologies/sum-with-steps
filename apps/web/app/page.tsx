"use client";
import {AdditionForm} from "components/addition-form";
import {useState} from "react";
import {saveResultsToDb, sumWithSteps, SumWithStepsResponse} from "lib/api";
import {Steps} from "components/steps";
import {Button} from "components/ui/button";
import { useToast } from "components/ui/use-toast"

export default function Page() {
  const { toast } = useToast()

  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [result, setResult] = useState<SumWithStepsResponse | null>(null)

  const handleSubmit = async (firstNumber: number, secondNumber: number) => {
    setLoading(true)

    const response = await sumWithSteps(firstNumber, secondNumber)
    setResult(response)

    if(Object.keys(response?.steps)?.length !== 0) {
      toast({
        title: "Success",
        description: "The result was generated",
        variant: 'default'
      })
    } else {
      toast({
        title: "Error",
        description: "The result was not generated",
        variant: 'destructive'
      })
    }

    setLoading(false)
  }

  const handleSave = async () => {
    if(!result) return

    setSaving(true)
    const saved = await saveResultsToDb(result.num1, result.num2)

    if(saved) {
      toast({
        title: "Saved to DB",
        description: "The result was saved to the database",
        variant: 'default'
      })
    }else {
      toast({
        title: "Error",
        description: "The result was not saved to the database",
        variant: 'destructive'
      })
    }

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
