'use server'
import score from "@/scripts/random_forest";

export default async function CropSuggestionPage({
    searchParams,
  }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const nitrogen = (await searchParams).nitrogen ?? ""
    const phosphorus = (await searchParams).phosphorus ?? ""
    const potassium = (await searchParams).potassium ?? ""
    const temperature = (await searchParams).temperature ?? ""
    const humidity = (await searchParams).humidity ?? ""
    const ph = (await searchParams).ph ?? ""
    const rainfall = (await searchParams).rainfall ?? ""

    
const minVals = [ 0, 5, 5, 8.82567475, 14.27327988, 3.50475231, 20.36001144]
const maxVals = [140, 145, 205, 43.67549305, 99.98187601, 9.93509073, 298.5601175]

const features = [100,90,100,50,90,100,202]

function minMaxScale(features : number[], minVals: number[], maxVals: number[]) {
    return features.map((val, i) => (val - minVals[i]) / (maxVals[i] - minVals[i]));
}

const prediction = score(minMaxScale(features, minVals, maxVals));
console.log(prediction)
const predictedClassIndex = prediction.indexOf(Math.max(...prediction))+1;


    
    return (
      <div className="text-black">
        <h1>Search Results</h1>
        <p>Query: {predictedClassIndex}</p>
      </div>
    )
  }
  