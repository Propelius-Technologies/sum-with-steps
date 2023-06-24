"use client";
import {AdditionForm} from "components/AdditionForm";
import {useState} from "react";
import {saveResultsToDb, sumWithSteps, SumWithStepsResponse} from "lib/api";
import {Steps} from "components/Steps";


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
    <div>
      <h1>Step Addition</h1>
      <AdditionForm
        onSubmit={handleSubmit}
        loading={loading}
      />

      {
        result && (
          <Steps steps={result.steps}/>
        )
      }

      {
        result && (
          <div>
            <button onClick={handleSave}>Save result to DB</button>
          </div>
        )
      }
    </div>
  );
}
