import React, {useState} from "react";
import {useHistory} from "react-router-dom";


const Service = ({ match = {}, ...props}) => {
  const [labservices,setLabServices]=useState([]);
  
  const history = useHistory();

  const loadData = (labphone) => {
    fetch(`http://localhost:4000/api/labs/${labphone ? labphone : ""}`, {
        method: "GET"
    }).then((res) => res.json()).then((data) => {
        console.log(data)
        setLabServices(data.labservices);
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
  <p> OUR SERVICES :  </p>

  {labservices.map((labservice) => {
     
   return <p>{labservice.service} </p>  })}
   </div>

    )
  }
  export default Service;