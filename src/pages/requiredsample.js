import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";

const Requiredsample = ({ match = {}, ...props}) => {
  const [labrequiredsamples, setLabRequiredSamples] = useState([]);
  const history = useHistory();

  const loadData = (labphone) => {
    fetch(`http://localhost:4000/api/labs/${labphone ? labphone : ""}`, {
        method: "GET"
    }).then((res) => res.json()).then((data) => {
        console.log(data)
        setLabRequiredSamples(data.setLabRequiredSamples);
        if(data.labphone) {
            setLab(data.labphone)
        } else {
            setLab(null);
        }      
    }).catch(err => {console.log(err)})
}
useEffect(() => {
    loadData(match.params.labphone);
}, [])

loadData(labphone);
    return (
  <div class="body-container">
  <p> The Required Sample: </p>

  {labrequiredsamples.map((requiredsampleforlab) => {
     
   return (<React.Fragment>
     <p> requiredsampleforlab.lab_phone</p> 
    <p>requiredsampleforlab.require_sam  </p>
   </React.Fragment>)
   
  })}
   </div>

    )
  }
  export default Requiredsample;