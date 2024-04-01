import { getSuggestionsDto } from "@/shared/types/getSuggestionsDto";

export class DadataService {
  static async getSuggestions(query: string): Promise<getSuggestionsDto> {
    const url = process.env.API_URL + "/suggest/address";
    const token = process.env.API_KEY;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Token " + token,
      },
      body: JSON.stringify({ query: query }),
    };

    const response = await fetch(url, options);
    return await response.json();
  }
}
