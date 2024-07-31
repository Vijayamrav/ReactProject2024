import { DNA } from 'react-loader-spinner';
import "./spinners.css"
export const DNASpinner=()=>{
    return(
        <>
        <div class="spinner-container">
        <DNA
  visible={true}
  height="90"
  width="90"
  ariaLabel="dna-loading"
  wrapperStyle={{}}
  wrapperClass="dna-wrapper"
  
  />
  </div>

        </>
    )
}