import axios from "axios";

interface CV19Summary {
  // Cases less deaths and recoveries
  active_count: number;
  //The number of active cases reported per 100,000 of population
  active_density: number;
  case_count: number;
  case_density: number;
  death_count: number;
  death_density: number;
  // If true, the country has been flagged for irregular reporting
  irregular: Boolean;
  recovered_count: number;
  recovered_density: number;
  reported_on: Date;
  // A scale from 0 to 100 determining the covid risk within the country
  sitata_risk: number;
}

class CountrySummary {
  async getCountryCV19Summary(countryCode: string): Promise<CV19Summary> {
    const {
      data,
    } = await axios.get(
      `https://www.sitata.com/api/v2/countries/SK/covid19_summary`,
      { headers: { Authorization: `TKN ${process.env.SITATA_API_KEY}` } }
    );

    const { summary } = data;

    return summary;
  }
}

export default new CountrySummary();
