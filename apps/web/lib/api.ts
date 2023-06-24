import axios from "axios";

export interface SumWithStepsResponse {
  sum: number;
  steps: {
    [key: string]: {
      carryString: string;
      sumString: string;
    };
  }
}

export async function sumWithSteps(a: number, b: number) {
    try {
      const response = await axios.post<SumWithStepsResponse>(process.env.NEXT_PUBLIC_API_URL + '/sum', {
        a,
        b,
      })

      if(response.status !== 200) {
        throw new Error(response.statusText)
      }

      return response.data
    } catch (error) {
      return {
        sum: a + b,
        steps: {}
      } as SumWithStepsResponse
    }
}
