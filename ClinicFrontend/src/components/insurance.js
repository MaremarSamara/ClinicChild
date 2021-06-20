import React, {createRef, useState} from "react";
import {Link} from "react-router-dom"
const serverHost = "http://localhost:4000"

const Insurance = ({insurance}) => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const textArea = createRef();
    // handle on the form submittion
    const onFormSubmit = (e) => {
        e.preventDefault();
        const textAreaValue = textArea.current.value;
        if(textAreaValue.trim().length > 0 && insurance) {
            let body = {message: textAreaValue, insurance_name: insurance.insurance_name, insurance_phone:insurance.insurance_phone}
            fetch(`${serverHost}/company/message`, {
                method: "POST",
                body: JSON.stringify(body)
            }).then(res => res.json()).then(() => {
                setSuccessMessage("email sent successfully")
            }).catch(err => {
                setErrorMessage("failed to send the mail")
            })
        } else {
            setErrorMessage("you have to write message to send")
        }
    }
    return (
        <React.Fragment>
        <section className="default-section">
            {successMessage ? 
            <p className="alert alert-success">{successMessage}</p>
            : null
            }
            {errorMessage ? 
            <p className="alert alert-error">{errorMessage}</p>
            : null
            }
        </section>
        <section className="default-section">
          {insurance ? 
          <React.Fragment>
            <div className="info-section">
                <div className="info-item">
                    <img src={serverHost + "/public/images/name.png"} alt= "Avatar"/> 
                    <span>{ insurance.insurance_name} </span>
                </div>
                <div className="info-item">
                    <img src={serverHost + "/public/images/address.png"} alt= "Avatar"/>
                    <span>{ insurance.address }</span>
                </div>
                <span className="horizintal-line"></span>
                <div className="info-item">
                    <img src={serverHost + "/public/images/phone.png"} alt= "Avatar"/>  
                    <span>{ insurance.insurance_phone }</span>
                </div>
                <div className="info-item">
                    <img src={serverHost + "/public/images/email.png"} alt= "Avatar"/>
                    <span>{ insurance.email }</span>
                </div>
                <span className="horizintal-line"></span>
               </div>
              <form method="POST" onSubmit={onFormSubmit}>
                <p style={ {width: "20%",
                padding: "12px",
                border: "1px solid rgb(24, 23, 23)",
                borderRadius: "20px",
                boxSizing: "border-box",
                color: "black",
                backgroundColor: "#5a5959",
                marginTop: "6px",
                marginBottom: "16px"}}>  Send Message </p><br/> 
                <input hidden required name="insurance_phone" value={insurance.insurance_phone }/>
                <input hidden required name="insurance_name" value={insurance.insurance_name }/>
                <label>write the message</label>
                  <textarea ref={textArea}  style={{height:"150px" ,width:"700px"}} required name="massege" id="massege"/> 
                  <input type ="submit" value="send" style={{borderRadius: "20px", color: "blue", width: "70px", height: "40px"}}/>
              </form>
              </React.Fragment>
              :<p>No Selected Insurance Company to show</p>
    }
      </section>
      </React.Fragment>
      
    )
}

export default Insurance;