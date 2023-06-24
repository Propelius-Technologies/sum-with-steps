import axios from "axios";

export interface SumWithStepsResponse {
  sum: number;
  steps: {
    [key: string]: {
      carryString: string;
      sumString: string;
    };
  }
  num1: number;
  num2: number;
}

export async function sumWithSteps(num1: number, num2: number) {
    try {
      const response = await axios.post<SumWithStepsResponse>(process.env.NEXT_PUBLIC_API_URL + '/sum', {
        num1,
        num2,
      })

      if(response.status !== 200) {
        throw new Error(response.statusText)
      }

      return {
        sum: response.data.sum,
        steps: response.data.steps,
        num1,
        num2,
      }
    } catch (error) {
      return {
        sum: num1 + num2,
        steps: {},
        num1,
        num2,
      } as SumWithStepsResponse
    }
}

export async function saveResultsToDb(num1: number, num2: number) {
  try {
    const response = await axios.post<SumWithStepsResponse>(process.env.NEXT_PUBLIC_API_URL + '/sum-logs', {
      num1,
      num2,
    })

    if(response.status !== 200) {
      throw new Error(response.statusText)
    }

    return true
  } catch (error) {
    return false
  }
}
